# Blog Migration Design: Saber → Eleventy + Cloudflare Pages

**Date:** 2026-04-01
**Status:** Draft

## Context

The blog is currently built with Saber, a Vue.js static site generator that was [archived on March 7, 2025](https://github.com/saberland/saber). It depends on webpack 4, Vue 2, and the CI runs on Node 12. The framework receives no security patches or updates.

The blog has 32 published posts (2018–2022), 2 actual drafts (plus 2 Saber template files in `_drafts/` that are not real posts), ~106MB of content assets plus static files (favicons, manifest, robots.txt, keybase.txt), and uses Disqus for comments. Content is Markdown with YAML frontmatter. 6 posts contain Vue component embeds (YouTube, Tweet, Telegram). One post (`2020-red-pack-writeup.md`) also uses a custom `.cool` file import via webpack's raw-loader. The `friends.md` page uses Vue runtime data fetching (axios) to load friend data from an external JSON endpoint.

## Goals

- Migrate to an actively maintained static site generator
- Host on Cloudflare Pages (free tier) with Workers available for future API/lambda needs
- Replace Disqus with giscus (GitHub Discussions)
- Preserve RSS feeds
- Maintain URL continuity via redirects for all existing posts
- Keep the blog free to host and operate

## Non-Goals

- Full visual redesign (adopt a modern theme, not design from scratch)
- Server-side rendering or dynamic pages
- CMS integration

## Architecture

```
Content (Markdown + frontmatter)
    |
    v
Eleventy 3.x (static build, ESM)
    |
    v
Static HTML/CSS/RSS/redirects
    |
    v
Cloudflare Pages (hosting, CDN, auto-deploy from git)
    |
    +-- Cloudflare Workers (URL redirects, future APIs)
    +-- giscus (comments via GitHub Discussions)
    +-- Cloudflare Web Analytics (replaces GA Lite)
```

## Technology Choices

### Static Site Generator: Eleventy (11ty) v3

- Minimal, unopinionated, JavaScript-based
- Native Markdown + frontmatter support (existing content format)
- Nunjucks templating (most documented 11ty template language)
- ESM support in v3, requires Node 18+
- Shortcodes for embed components
- Built-in plugin ecosystem (RSS, syntax highlighting, image optimization)

**Alternatives considered and ruled out:**

| Framework | Reason ruled out |
|-----------|-----------------|
| Astro | Strong contender (Cloudflare acquired it), but user preferred 11ty's minimal/unopinionated approach |
| Hugo | Fast builds (Go), but Go templating has a learning curve; shortcodes less flexible than 11ty |
| Hexo | Still maintained (v8.0), strong Chinese community, but less modern than 11ty |
| Gatsby | Effectively dying — Netlify acquired it, Gatsby Cloud shut down, stale plugins |
| Jekyll | Ruby-based, slow builds, showing its age |
| VitePress | Designed for documentation sites, not blogs |
| MkDocs | Python-based, documentation-only |
| Zola | Rust, fast, but small ecosystem, no component model |
| Pelican | Python, niche community |
| Gridsome | Vue-based, effectively dead/unmaintained |
| Next.js / Nuxt.js | Full application frameworks, overkill for a static blog |
| Docusaurus | React docs framework, not for personal blogs |

### CSS: Tailwind CSS

- Community mainstream for 11ty projects
- Utility-class based, maximum design flexibility
- PostCSS build step integrates with 11ty build pipeline
- Large ecosystem of components and patterns

### Hosting: Cloudflare Pages

- Free tier with generous limits
- Git-push auto-deploys
- Edge CDN built in
- `_redirects` file support for URL migration
- Cloudflare Workers available for future API/lambda needs (free tier: 100k requests/day)
- Cloudflare Web Analytics: free, privacy-respecting, no JS tag required

### Comments: giscus

- Free, open-source, powered by GitHub Discussions
- No tracking, no ads
- Readers authenticate via GitHub (fits developer blog audience)
- Conditional rendering via frontmatter `comments` field
- Existing Disqus comments will be migrated to GitHub Discussions

## Project Structure

```
blog/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk          # HTML shell: head, body, header, footer
│   │   │   ├── post.njk          # Extends base: post metadata, tags, giscus
│   │   │   └── page.njk          # Extends base: simple content wrapper
│   │   ├── header.njk            # Site navigation
│   │   ├── footer.njk            # Site footer
│   │   └── giscus.njk            # Comment widget partial
│   ├── _data/
│   │   ├── site.json             # Site metadata (title, description, url, author)
│   │   └── friends.js            # Build-time fetch of friends JSON data
│   ├── posts/                    # 32 migrated markdown files
│   ├── pages/
│   │   ├── about.md
│   │   ├── friends.njk           # Renders friend list from _data/friends.js
│   │   └── archives.njk          # Auto-generated from collections
│   ├── assets/                   # Images, PDFs, archives (~106MB)
│   ├── static/                   # favicon.ico, icons/, manifest.json, robots.txt, keybase.txt
│   ├── css/
│   │   └── main.css              # Tailwind entry point (@tailwind directives)
│   ├── feed.njk                  # Atom feed template
│   └── redirects.njk             # Generates _redirects file (merges legacy + new)
├── eleventy.config.js            # 11ty configuration (ESM)
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS config for Tailwind
├── package.json
└── _redirects                    # (generated at build time)
```

## URL Scheme & Redirects

**New URL pattern:** `/posts/:slug/` (11ty file-system driven)

**Old URL pattern:** `/:year/:month/:day/:slug`

A `redirects.njk` template auto-generates the `_redirects` file from post collection data at build time, **merged with the existing legacy redirects**. The legacy `static/_redirects` file contains ~47 rules including:
- Old Netlify subdomain redirects (`never-blog.netlify.app`)
- URL-encoded Chinese slug → English slug redirects (from pre-migration filenames)
- Deleted post redirects (pointing to the migration announcement post)
- Old Chinese category name redirects

Example generated output:

```
# Legacy redirects (preserved from existing _redirects)
https://never-blog.netlify.app/* /:splat 301!
/2019/05/31/Nano%20Pi%20NEO2%20...* /posts/nano-pi-neo2-first-experience/ 301!
...

# New URL scheme redirects (auto-generated from post data)
/2018/01/31/my-really-silly-article  /posts/my-really-silly-article/  301
/2020/05/17/moving-my-blog-2  /posts/moving-my-blog-2/  301
...

# Feed redirect
/feed/atom.xml  /feed.xml  301
```

Note: Legacy redirects that point to old-format URLs (e.g., `/2020/05/16/moving-my-blog-2`) need their targets updated to the new `/posts/:slug/` format. This is handled in `redirects.njk` at build time: the template reads the legacy redirects as data, rewrites any target matching `/:year/:month/:day/:slug` to `/posts/:slug/`, and outputs them alongside the auto-generated new redirects.

Cloudflare Pages processes `_redirects` at the edge — no JavaScript or meta-refresh needed. The `_redirects` file has a limit of 2000 static rules and 100 dynamic rules; our ~80 total rules are well within limits.

## Content Migration

### Frontmatter

Existing frontmatter fields map directly:

| Current | 11ty | Notes |
|---------|------|-------|
| `title` | `title` | No change |
| `date` | `date` | No change, 11ty parses it natively |
| `tags` | `tags` | No change, becomes 11ty collection tags |
| `categories` | `categories` | Kept as custom data; optionally mapped to tags |
| `description` | `description` | No change |
| `layout: post` | `layout: post.njk` | Extension added |
| `layout: showcase` | `layout: page.njk` | Merged into page layout; `about.md` and `friends.njk` use this |
| `layout: index` | N/A | Replaced by new index/archives templates |
| `comments` | `comments` | No change; giscus template checks this |
| `updated` | `updated` | Some posts have this; template can show "last updated" date |

Note: Saber's `default.vue` layout is the equivalent of `base.njk` — the root layout wrapper.

### Embed Components (7 files affected: 6 posts + `about.md` page)

Vue components become 11ty shortcodes:

| Current Saber/Vue | New 11ty shortcode |
|---|---|
| `<Youtube id="VIDEO_ID"/>` | `{% youtube "VIDEO_ID" %}` |
| `<Tweet id="TWEET_ID"/>` | `{% tweet "TWEET_ID" %}` |
| `<Tweet id="ID" :options="{conversation: 'none'}"/>` | `{% tweet "ID", "none" %}` |
| `<TelegramEmbed link="channel/msgid" />` | `{% telegram "channel", "msgid" %}` |

Shortcode implementations:
- **YouTube:** Renders privacy-respecting iframe (`youtube-nocookie.com`)
- **Tweet:** Client-side Twitter widget embed or static blockquote with link
- **Telegram:** Telegram embed script with channel/message parameters

### Posts with Vue `<script>` blocks and webpack `require()` imports

Several posts rely on Saber's webpack pipeline for asset imports and Vue reactivity. Each needs a specific migration strategy:

| Post | What it uses | Migration strategy |
|------|-------------|-------------------|
| `2020-red-pack-writeup.md` | `require()` for a `.cool` file via `raw-loader` | Read file content at build time (11ty data file or inline into post) |
| `bye-dbd.md` | `require()` for a PDF file, rendered as download link via Vue computed property | Replace with static markdown link to the PDF in passthrough assets |
| `p440ar-ctrl-benchmark.md` | `require()` for `.tar.gz` files, rendered as download links via Vue data | Replace with static markdown download links |
| `my-lovely-hard-drives.md` | 8x `require()` for images via Vue computed properties + Tweet component imports | Replace with standard markdown image syntax (`![](path)`) |
| `keep-your-google-voice-with-sao.md` | Vue reactive data + `@click` handler + `reCal()` method for an interactive phone number reveal widget | Requires a small inline vanilla JS `<script>` block — cannot be static |
| `about.md` | Tweet component import | Replace with `{% tweet %}` shortcode (same as posts) |

The `saber-node.js` configures webpack loaders for `.pdf`, `.tar.gz`, and `.cool` files. In 11ty, all these files become passthrough copies with static relative links.

### Friends page (`friends.md`)

The current `friends.md` is not static — it uses Vue `<script>` with axios to fetch friend data from `https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/friends.json` at runtime.

**Migration strategy:** Convert to build-time data fetching via `src/_data/friends.js`:
```js
export default async function() {
  const res = await fetch('https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/friends.json');
  return res.json();
}
```
Then render the friend list in a `friends.njk` template using Nunjucks `{% for %}` loops. This makes the page fully static — friends update on the next build/deploy.

### Assets

`pages/_assets/` → `src/assets/`, configured as passthrough copy in eleventy.config.js. No processing in Phase 1.

### Static files

`static/` → `src/static/`, passthrough copy. Contains: `favicon.ico`, `icons/` (PWA icons), `manifest.json`, `browserconfig.xml`, `robots.txt`, `keybase.txt`. The existing `_redirects` file in `static/` is superseded by the auto-generated one.

### Drafts

`pages/_drafts/` contains 2 actual draft posts (`my-hack-synology-summary.md`, `my-t40-car-crash.md`) and 2 Saber template files (`category.md`, `tag.md`) that are not real content. Only the 2 real drafts migrate to `src/drafts/`, excluded from build via a `drafts.json` directory data file with `eleventyExcludeFromCollections: true` and `permalink: false`.

### Markdown plugins

The current blog uses 4 markdown-it plugins that must be configured in 11ty's markdown-it instance:

| Plugin | Purpose | Priority |
|--------|---------|----------|
| `markdown-it-cjk-breaks` | CJK line break handling — **critical** for Chinese content rendering | High |
| `markdown-it-implicit-figures` | Auto-wraps images in `<figure>` elements | Medium |
| `markdown-it-footnote` | Footnote support (`[^1]` syntax) | Medium |
| `markdown-it-attrs` | Add HTML attributes to elements via `{.class #id}` syntax | Medium |

11ty uses markdown-it under the hood, so these plugins can be installed via npm and configured in `eleventy.config.js`.

### Category slug mapping

The current blog maps Chinese category names to English URL slugs:

| Chinese | English slug |
|---------|-------------|
| 数码 | digital |
| 技术 | technology |
| 随笔 | uncategorized |
| 事项 | announcement |
| 记录 | record |

This mapping needs to be preserved in 11ty, either via a data file or a custom filter/collection, so that category page URLs remain English.

## Comments Migration (Disqus → giscus)

### One-time migration process:

1. Export comments from Disqus admin panel (XML format)
2. Enable GitHub Discussions on the blog repository
3. Create a "Blog Comments" discussion category
4. Run migration script (existing tools: [Elio Struyf's script](https://www.eliostruyf.com/migrate-disqus-github-discussions-giscus/) or [Andrew Lock's .NET tool](https://andrewlock.net/migrating-comments-from-dsqus-to-giscus/))
   - Maps Disqus threads to GitHub Discussions by URL/slug
   - Converts comment threads to discussion replies
   - Handles rate limiting (GitHub API limits)
5. Configure giscus widget in `post.njk` with repo, category, and mapping settings
6. Verify comments appear on migrated posts

### URL mapping consideration:

Since post URLs change from `/:year/:month/:day/:slug` to `/posts/:slug/`, the migration script must use the **new** URL path as the discussion identifier so giscus matches correctly after migration.

**giscus configuration:**
- `data-mapping`: `pathname` (matches discussion by page URL path)
- `data-repo`: the blog's GitHub repository
- `data-repo-id`: obtained from giscus setup at https://giscus.app
- `data-category`: "Blog Comments" discussion category
- `data-category-id`: obtained from giscus setup

The migration script must create discussions with titles matching the new `/posts/:slug/` pathname format.

## Phased Implementation

### Phase 1: Core Blog (MVP)

- Initialize 11ty v3 project with Tailwind CSS
- Create Nunjucks layouts (base, post, page)
- Migrate 32 markdown posts (frontmatter adjustments, file moves)
- Migrate static pages (about, friends with build-time data fetch, archives)
- Copy assets and static files as passthrough
- Configure markdown-it plugins (cjk-breaks, implicit-figures, footnote, attrs)
- Category slug mapping (Chinese → English)
- RSS feed via `@11ty/eleventy-plugin-rss` (Atom feed + JSON feed at `/feed/index.json` for backward compatibility)
- Sitemap generation
- Syntax highlighting via `@11ty/eleventy-plugin-syntaxhighlight`
- Pagination on index page
- Tag pages
- `_redirects` file generation (merge legacy redirects + new URL scheme redirects)
- Deploy to Cloudflare Pages

**Done when:** All posts render correctly, RSS works, redirects work, deployed and accessible.

### Phase 2: Embeds & Comments

- Implement YouTube, Tweet, Telegram shortcodes
- Migrate all Vue `<script>` / `require()` posts (see table in Content Migration section)
- Handle `keep-your-google-voice-with-sao.md` interactive widget (vanilla JS replacement)
- Update 7 files with embed shortcode syntax (6 posts + `about.md`)
- Export Disqus comments
- Migrate comments to GitHub Discussions
- Integrate giscus in post template
- Verify comment display on posts

**Done when:** All embeds render, giscus shows migrated comments.

### Phase 3: Polish & Extras (future)

- Image optimization (`@11ty/eleventy-img`)
- SEO metadata (Open Graph, Twitter Cards via base layout)
- Cloudflare Web Analytics (replaces GA Lite)
- Cloudflare Workers for any API features
- Remove old Saber codebase
- Remove jsDelivr CDN integration (Cloudflare Pages serves as CDN)

**Done when:** Feature parity with original blog plus modern improvements.

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Disqus comment export may be incomplete | Export early, verify before removing Disqus |
| Tweet embeds may break (Twitter/X API changes) | Use static blockquote fallback with link |
| Old URLs still indexed by search engines | 301 redirects handle this; verify with Google Search Console |
| Asset size (~106MB) slows builds | Passthrough copy avoids processing; consider git LFS later |
| Legacy redirects break if not merged | Auto-generate `_redirects` from both legacy file and post data |
| Chinese content renders incorrectly | Configure `markdown-it-cjk-breaks` plugin — critical for line break handling |
| Friends page data becomes stale | Build-time fetch means friends update on next deploy; acceptable for this use case |
