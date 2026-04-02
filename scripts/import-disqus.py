#!/usr/bin/env python3
"""Import Disqus comments into GitHub Discussions for giscus."""

import gzip
import json
import subprocess
import sys
import time
import xml.etree.ElementTree as ET
from collections import defaultdict
from html import unescape

NS = {
    "d": "http://disqus.com",
    "dsq": "http://disqus.com/disqus-internals",
}

REPO_ID = "MDEwOlJlcG9zaXRvcnkxNTI2NjcxNzQ="
CATEGORY_ID = "DIC_kwDOCRmEJs4C51bD"

# Manual mapping: Disqus thread <id> → post slug
# For threads whose Disqus ID doesn't directly contain the slug
MANUAL_MAP = {
    "2018/05/21/学生事故 | 学会无知，保持迷茫/": "my-really-silly-article",
    "2018/07/26/GDGDOCS 项目自建/": "build-your-own-gdgdocs",
    "2018/07/27/Rancher v1.6 负载均衡折腾小记/": "rancher-v1.6-loadbalancer",
    "2018/09/11/用 ss-redir 做国内中继/": "build-a-rediretcor-with-ss-redir",
    "2018/09/11/用Telegram做图床/": "use-telegram-for-image-cdn",
    "2018/10/11/再一次迁移博客/": "moving-my-blog-1",
    "2018/11/25/在树莓派上添加谷歌云打印/": "add-google-cloud-printer-on-respi",
    "2018/12/15/如何科学的给机器人投食/": "how-to-feed-a-robot",
    "2018/12/31/2018-2019/": "2018-2019",
    "2019/02/08/Tasker-Messenger/": "tasker-messenger",
    "2019/03/08/Telegram Web 搭建/": "telegram-web-hosting",
    "2019/03/20/云游戏：生不逢时/": "my-thought-about-cloud-game-before",
    "2019/03/27/RIPE Probe Hosting/": "ripe-probe-hosting",
    "2019/03/27/空格与 空 格/": "space-and-s-p-a-c-e",
}

# Pages to skip (no comments or removed)
SKIP_IDS = {
    "categories/index.html",
    "tags/index.html",
    "/2018/05/23/about-my-articles",  # post no longer exists
}

# Non-post page mappings
PAGE_MAP = {
    "about/index.html": "/about/",
    "friends/index.html": "/friends/",
}


def disqus_id_to_pathname(thread_id):
    """Map a Disqus thread <id> to the current blog pathname."""
    if thread_id in SKIP_IDS:
        return None

    # Check page map first
    if thread_id in PAGE_MAP:
        return PAGE_MAP[thread_id]

    # Check manual map
    if thread_id in MANUAL_MAP:
        return f"/posts/{MANUAL_MAP[thread_id]}/"

    # /posts/slug.html format (old Saber)
    if thread_id.startswith("/posts/"):
        slug = thread_id.replace("/posts/", "").replace(".html", "").rstrip("/")
        return f"/posts/{slug}/"

    # /YYYY/MM/DD/slug format
    stripped = thread_id.strip("/")
    parts = stripped.split("/")
    if len(parts) == 4:
        slug = parts[3].rstrip("/")
        # Remove .html suffix if present
        if slug.endswith(".html"):
            slug = slug[:-5]
        return f"/posts/{slug}/"

    print(f"  WARNING: Could not map thread ID: {thread_id}", file=sys.stderr)
    return None


def html_to_markdown(html):
    """Basic HTML to Markdown conversion for Disqus comments."""
    import re

    text = html
    # Convert links
    text = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r"[\2](\1)", text)
    # Convert bold/strong
    text = re.sub(r"<(?:b|strong)>(.*?)</(?:b|strong)>", r"**\1**", text)
    # Convert italic/em
    text = re.sub(r"<(?:i|em)>(.*?)</(?:i|em)>", r"*\1*", text)
    # Convert <br> to newline
    text = re.sub(r"<br\s*/?>", "\n", text)
    # Convert <p> tags
    text = re.sub(r"<p>(.*?)</p>", r"\1\n\n", text, flags=re.DOTALL)
    # Strip remaining HTML tags
    text = re.sub(r"<[^>]+>", "", text)
    # Unescape HTML entities
    text = unescape(text)
    # Clean up whitespace
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text


def gh_graphql(query, variables=None, retries=3):
    """Execute a GitHub GraphQL query via the gh CLI with rate limit handling."""
    cmd = ["gh", "api", "graphql", "-f", f"query={query}"]
    if variables:
        for key, value in variables.items():
            cmd.extend(["-f", f"{key}={value}"])
    for attempt in range(retries):
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            return json.loads(result.stdout)
        if "submitted too quickly" in result.stderr and attempt < retries - 1:
            wait = 5 * (attempt + 1)
            print(f"  Rate limited, waiting {wait}s...", file=sys.stderr)
            time.sleep(wait)
            continue
        print(f"  ERROR: gh api graphql failed: {result.stderr}", file=sys.stderr)
        return None
    return None


def get_existing_discussions():
    """Fetch existing discussions in the Comments category."""
    query = """
    {
      repository(owner: "homeofnever", name: "blog") {
        discussions(categoryId: "DIC_kwDOCRmEJs4C51bD", first: 100) {
          nodes { title id }
        }
      }
    }
    """
    result = gh_graphql(query)
    if result and "data" in result:
        return {
            n["title"]: n["id"]
            for n in result["data"]["repository"]["discussions"]["nodes"]
        }
    return {}


def create_discussion(title, body):
    """Create a GitHub Discussion and return its node ID."""
    query = """
    mutation($repoId: ID!, $catId: ID!, $title: String!, $body: String!) {
      createDiscussion(input: {repositoryId: $repoId, categoryId: $catId, title: $title, body: $body}) {
        discussion { id }
      }
    }
    """
    result = gh_graphql(
        query,
        {"repoId": REPO_ID, "catId": CATEGORY_ID, "title": title, "body": body},
    )
    if result and "data" in result:
        return result["data"]["createDiscussion"]["discussion"]["id"]
    print(f"  ERROR creating discussion: {result}", file=sys.stderr)
    return None


def add_comment(discussion_id, body, reply_to_id=None):
    """Add a comment to a Discussion. Returns comment node ID.

    If replying to a nested comment fails (GitHub only supports 2 levels),
    falls back to posting as a top-level comment.
    """
    if reply_to_id:
        query = """
        mutation($discussionId: ID!, $body: String!, $replyToId: ID!) {
          addDiscussionComment(input: {discussionId: $discussionId, body: $body, replyToId: $replyToId}) {
            comment { id }
          }
        }
        """
        variables = {
            "discussionId": discussion_id,
            "body": body,
            "replyToId": reply_to_id,
        }
        result = gh_graphql(query, variables)
        if result and "data" in result:
            time.sleep(1)
            return result["data"]["addDiscussionComment"]["comment"]["id"]
        # Fall back to top-level comment if nested reply fails
        print("  (nested reply failed, posting as top-level comment)")

    query = """
    mutation($discussionId: ID!, $body: String!) {
      addDiscussionComment(input: {discussionId: $discussionId, body: $body}) {
        comment { id }
      }
    }
    """
    variables = {"discussionId": discussion_id, "body": body}
    result = gh_graphql(query, variables)
    if result and "data" in result:
        time.sleep(1)
        return result["data"]["addDiscussionComment"]["comment"]["id"]
    print(f"  ERROR adding comment: {result}", file=sys.stderr)
    return None


def format_comment(author, date, message, is_reply=False):
    """Format a Disqus comment for GitHub Discussions."""
    content = html_to_markdown(message)
    lines = [
        f"**{author}** · {date}",
        "",
        content,
        "",
        "---",
        "*Imported from Disqus*",
    ]
    return "\n".join(lines)


def main():
    if len(sys.argv) < 2:
        print("Usage: python import-disqus.py <disqus-export.xml.gz> [--dry-run]")
        sys.exit(1)

    xml_path = sys.argv[1]
    dry_run = "--dry-run" in sys.argv

    # Parse XML
    with gzip.open(xml_path, "rb") as f:
        tree = ET.parse(f)
    root = tree.getroot()

    # Build thread map: dsq:id → thread info
    threads = {}
    for t in root.findall("d:thread", NS):
        dsq_id = t.get("{http://disqus.com/disqus-internals}id")
        thread_id = t.find("d:id", NS).text or ""
        title = t.find("d:title", NS).text or ""
        is_deleted = t.find("d:isDeleted", NS).text == "true"
        threads[dsq_id] = {
            "id": thread_id,
            "title": title,
            "deleted": is_deleted,
        }

    # Collect comments grouped by thread dsq:id
    comments_by_thread = defaultdict(list)
    for p in root.findall("d:post", NS):
        is_deleted = p.find("d:isDeleted", NS).text == "true"
        is_spam = p.find("d:isSpam", NS).text == "true"
        if is_deleted or is_spam:
            continue

        dsq_id = p.get("{http://disqus.com/disqus-internals}id")
        thread_dsq_id = p.find("d:thread", NS).get(
            "{http://disqus.com/disqus-internals}id"
        )
        message = p.find("d:message", NS).text or ""
        created_at = p.find("d:createdAt", NS).text or ""
        author_el = p.find("d:author", NS)
        author_name = author_el.find("d:name", NS).text or "Anonymous"
        parent_el = p.find("d:parent", NS)
        parent_id = (
            parent_el.get("{http://disqus.com/disqus-internals}id")
            if parent_el is not None
            else None
        )

        comments_by_thread[thread_dsq_id].append(
            {
                "dsq_id": dsq_id,
                "message": message,
                "created_at": created_at,
                "date": created_at[:10] if created_at else "",
                "author": author_name,
                "parent_id": parent_id,
            }
        )

    # Process each thread
    print(f"Found {len(comments_by_thread)} threads with comments\n")

    # Check existing discussions to skip already-imported ones
    existing = {} if dry_run else get_existing_discussions()
    if existing:
        print(f"Found {len(existing)} existing discussions, will skip those\n")

    imported = 0
    skipped = 0

    for thread_dsq_id, comments in sorted(
        comments_by_thread.items(), key=lambda x: -len(x[1])
    ):
        thread = threads.get(thread_dsq_id, {})
        thread_id = thread.get("id", "???")
        thread_title = thread.get("title", "???")

        pathname = disqus_id_to_pathname(thread_id)
        if pathname is None:
            print(
                f"SKIP: {thread_id} ({thread_title}) - {len(comments)} comments (non-post page)"
            )
            skipped += len(comments)
            continue

        if pathname in existing:
            print(
                f"ALREADY IMPORTED: {pathname} ({thread_title}) - {len(comments)} comments"
            )
            skipped += len(comments)
            continue

        print(
            f"IMPORT: {thread_id} → {pathname} ({thread_title}) - {len(comments)} comments"
        )

        if dry_run:
            # Sort by date for display
            for c in sorted(comments, key=lambda x: x["created_at"]):
                prefix = "  ↳ " if c["parent_id"] else "  "
                print(
                    f"{prefix}[{c['date']}] {c['author']}: {html_to_markdown(c['message'])[:80]}"
                )
            imported += len(comments)
            print()
            continue

        # Create discussion
        disc_body = f"Comments for [{thread_title}]({pathname})\n\n*This discussion was created to import comments from Disqus.*"
        disc_id = create_discussion(pathname, disc_body)
        if not disc_id:
            print(f"  Failed to create discussion, skipping")
            continue
        print(f"  Created discussion: {disc_id}")
        time.sleep(2)  # rate limit between discussions

        # Sort comments by date
        sorted_comments = sorted(comments, key=lambda x: x["created_at"])

        # Map Disqus comment IDs to GitHub comment IDs (for threading)
        id_map = {}

        for c in sorted_comments:
            body = format_comment(c["author"], c["date"], c["message"])
            reply_to = id_map.get(c["parent_id"]) if c["parent_id"] else None
            gh_comment_id = add_comment(disc_id, body, reply_to)
            if gh_comment_id:
                id_map[c["dsq_id"]] = gh_comment_id
                prefix = "  ↳ " if c["parent_id"] else "  "
                print(f"{prefix}Added comment by {c['author']} ({c['date']})")
            imported += 1

        print()

    print(f"\nDone! Imported {imported} comments, skipped {skipped}")


if __name__ == "__main__":
    main()
