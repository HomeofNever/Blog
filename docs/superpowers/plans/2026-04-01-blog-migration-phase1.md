# Blog Migration Phase 1: Core Blog MVP

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the blog from archived Saber framework to Eleventy 3.x with Tailwind CSS, deployed on Cloudflare Pages, with all 32 posts rendering correctly, RSS feeds working, and URL redirects in place.

**Architecture:** Eleventy 3.x (ESM) generates static HTML from Markdown+frontmatter content. Tailwind CSS v4 compiled via PostCSS in an `eleventy.before` hook. Nunjucks templates for layouts. Cloudflare Pages hosts the output with `_redirects` for URL migration.

**Tech Stack:** Eleventy 3.x, Tailwind CSS v4, PostCSS, Nunjucks, markdown-it (with cjk-breaks, implicit-figures, footnote, attrs plugins), `@11ty/eleventy-plugin-rss`, `@11ty/eleventy-plugin-syntaxhighlight`

**Spec:** `docs/superpowers/specs/2026-04-01-blog-migration-design.md`

---

## File Structure

```
src/
├── _includes/
│   ├── layouts/
│   │   ├── base.njk          # HTML shell: doctype, head (meta, CSS), body wrapper, header, footer
│   │   ├── post.njk          # Extends base: article with post metadata, tags, dates, content
│   │   └── page.njk          # Extends base: simple content wrapper for static pages
│   ├── header.njk            # Site nav: title + navigation links
│   └── footer.njk            # Site footer: copyright, author info
├── _data/
│   ├── site.json             # Site metadata: title, url, author, description, nav links
│   ├── categories.json       # Chinese→English category slug mapping
│   └── friends.js            # Build-time fetch of friends JSON from GitHub
├── posts/                    # 32 markdown files (migrated from pages/_posts/)
│   └── posts.json            # Directory data: layout=post.njk, tags=posts
├── drafts/                   # 2 draft markdown files
│   └── drafts.json           # Directory data: exclude from collections, no permalink
├── pages/
│   ├── about.md              # About page (layout: page.njk)
│   ├── friends.njk           # Friends page with build-time data rendering
│   └── archives.njk          # Archives page listing all posts
├── assets/                   # Passthrough copy from pages/_assets/ (~106MB)
├── static/                   # Passthrough copy: favicon, icons, manifest, robots.txt, keybase.txt
├── css/
│   └── main.css              # Tailwind CSS entry: @import "tailwindcss"
├── feed.njk                  # Atom feed template
├── feed-json.njk             # JSON feed template
├── sitemap.njk               # Sitemap XML template
├── redirects.njk             # Generates _redirects (legacy + new URL redirects)
└── index.njk                 # Homepage with paginated post list
eleventy.config.js            # 11ty config: plugins, markdown-it, passthrough, collections
package.json                  # Dependencies and scripts
.github/workflows/deploy.yml  # Cloudflare Pages deployment
```

---

## Chunk 1: Project Scaffolding

### Task 1: Initialize project and install dependencies

**Files:**
- Create: `package.json`
- Create: `eleventy.config.js`

Note: Tailwind CSS v4 does NOT use `tailwind.config.js` or `postcss.config.js`. Content detection is automatic. PostCSS is invoked directly in the `eleventy.before` hook.

- [ ] **Step 1: Create a new branch for the migration**

```bash
git checkout -b migration/eleventy
```

- [ ] **Step 2: Initialize package.json with dependencies**

Run:
```bash
npm init -y
npm install --save-dev @11ty/eleventy@3 @tailwindcss/postcss tailwindcss postcss cssnano
npm install --save-dev @11ty/eleventy-plugin-rss @11ty/eleventy-plugin-syntaxhighlight
npm install --save-dev markdown-it-cjk-breaks markdown-it-implicit-figures markdown-it-footnote markdown-it-attrs
```

- [ ] **Step 3: Update package.json scripts**

Replace the scripts section in `package.json`:

```json
{
  "scripts": {
    "dev": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy"
  },
  "type": "module"
}
```

- [ ] **Step 4: Create eleventy.config.js with minimal config**

Create `eleventy.config.js`:

```js
import markdownIt from "markdown-it";
import markdownItCjkBreaks from "markdown-it-cjk-breaks";
import markdownItImplicitFigures from "markdown-it-implicit-figures";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from "markdown-it-attrs";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginRss from "@11ty/eleventy-plugin-rss";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import cssnano from "cssnano";

export default function (eleventyConfig) {
  // --- Plugins ---
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // --- Markdown ---
  const md = markdownIt({ html: true, linkify: true })
    .use(markdownItCjkBreaks)
    .use(markdownItImplicitFigures, { figcaption: true })
    .use(markdownItFootnote)
    .use(markdownItAttrs);

  eleventyConfig.setLibrary("md", md);

  // --- Passthrough copy ---
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/static");

  // --- Tailwind CSS ---
  eleventyConfig.on("eleventy.before", async () => {
    const inputFile = path.resolve("src/css/main.css");
    const outputFile = path.resolve("_site/css/main.css");

    const cssInput = fs.readFileSync(inputFile, "utf8");
    const result = await postcss([tailwindcss, cssnano]).process(cssInput, {
      from: inputFile,
      to: outputFile,
    });

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, result.css);
  });

  // --- Date filters (use UTC to match frontmatter dates) ---
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  eleventyConfig.addFilter("dateToPath", (dateObj) => {
    const d = new Date(dateObj);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  });

  // --- Category slug filter ---
  eleventyConfig.addFilter("categorySlug", (category) => {
    const map = JSON.parse(
      fs.readFileSync(path.resolve("src/_data/categories.json"), "utf8")
    );
    return map[category] || category.toLowerCase().replace(/\s+/g, "-");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
  };
}
```

- [ ] **Step 5: Create Tailwind CSS entry file**

Create `src/css/main.css`:

```css
@import "tailwindcss";
```

- [ ] **Step 6: Create site data file**

Create `src/_data/site.json`:

```json
{
  "title": "Never迷の小窝",
  "url": "https://blog.never.pet",
  "author": "NeverBehave",
  "email": "i@never.pet",
  "description": "迷の生物的迷の小窝",
  "twitter": "_NeverBehave_",
  "icon": "/static/icons/android-chrome-512x512.png",
  "nav": [
    { "text": "Home", "link": "/" },
    { "text": "About", "link": "/about/" },
    { "text": "Social", "link": "https://never.pet" },
    { "text": "Friends", "link": "/friends/" }
  ]
}
```

- [ ] **Step 7: Create categories mapping data file**

Create `src/_data/categories.json`:

```json
{
  "数码": "digital",
  "技术": "technology",
  "随笔": "uncategorized",
  "事项": "announcement",
  "记录": "record"
}
```

- [ ] **Step 8: Verify the build runs (empty site)**

Run: `npm run build`
Expected: Build succeeds, `_site/` directory created with `css/main.css`.

- [ ] **Step 9: Commit scaffolding**

```bash
git add package.json package-lock.json eleventy.config.js src/css/main.css src/_data/site.json src/_data/categories.json
git commit -m "feat: initialize 11ty v3 project with Tailwind CSS and markdown plugins"
```

---

### Task 2: Create base layout and partials

**Files:**
- Create: `src/_includes/layouts/base.njk`
- Create: `src/_includes/header.njk`
- Create: `src/_includes/footer.njk`

- [ ] **Step 1: Create header partial**

Create `src/_includes/header.njk`:

```njk
<header class="border-t-4 border-gray-700 border-b border-gray-200">
  <div class="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
    <a href="/" class="text-2xl font-light tracking-tight text-gray-700 hover:no-underline">
      {{ site.title }}
    </a>
    <nav class="flex gap-4">
      {% for item in site.nav %}
        <a href="{{ item.link }}" class="text-gray-800 hover:text-gray-600 hover:underline"
          {% if item.link.startsWith("http") %}target="_blank" rel="noopener"{% endif %}>
          {{ item.text }}
        </a>
      {% endfor %}
    </nav>
  </div>
</header>
```

- [ ] **Step 2: Create footer partial**

Create `src/_includes/footer.njk`:

```njk
<footer class="border-t border-gray-200 py-8 mt-auto">
  <div class="max-w-3xl mx-auto px-4 text-sm text-gray-500">
    <p>&copy; 2017–{{ "" | currentYear }} {{ site.author }} &middot; {{ site.description }}</p>
    <p class="mt-1">
      <a href="/feed.xml" class="hover:underline">RSS</a>
    </p>
  </div>
</footer>
```

- [ ] **Step 3: Create base layout**

Create `src/_includes/layouts/base.njk`:

```njk
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{% if title %}{{ title }} | {% endif %}{{ site.title }}</title>
  <meta name="description" content="{{ description or site.description }}">
  <link rel="stylesheet" href="/css/main.css">
  <link rel="icon" href="/static/favicon.ico">
  <link rel="alternate" type="application/atom+xml" title="{{ site.title }}" href="/feed.xml">
</head>
<body class="flex flex-col min-h-screen font-sans text-gray-900 bg-white">
  {% include "header.njk" %}
  <main class="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
    {{ content | safe }}
  </main>
  {% include "footer.njk" %}
</body>
</html>
```

- [ ] **Step 4: Create a test index page to verify layout**

Create `src/index.njk`:

```njk
---
layout: layouts/base.njk
title: Home
---
<h1 class="text-3xl font-bold mb-4">{{ site.title }}</h1>
<p>Site is building.</p>
```

- [ ] **Step 5: Verify build and layout**

Run: `npm run dev`
Expected: Site serves at localhost:8080 with header, footer, styled page.

- [ ] **Step 6: Commit layouts**

```bash
git add src/_includes/ src/index.njk eleventy.config.js
git commit -m "feat: add base layout with header, footer, and Tailwind styling"
```

---

### Task 3: Create post and page layouts

**Files:**
- Create: `src/_includes/layouts/post.njk`
- Create: `src/_includes/layouts/page.njk`

- [ ] **Step 1: Create post layout**

Create `src/_includes/layouts/post.njk`:

```njk
---
layout: layouts/base.njk
---
<article class="post">
  <header class="mb-8">
    <h1 class="text-4xl font-bold leading-tight mb-2">{{ title }}</h1>
    <div class="text-sm text-gray-500">
      <time datetime="{{ date | isoDate }}">{{ date | readableDate }}</time>
      {% if updated %}
        &middot; Updated: <time datetime="{{ updated | isoDate }}">{{ updated | readableDate }}</time>
      {% endif %}
    </div>
    {% if tags %}
      <div class="mt-2 flex flex-wrap gap-2">
        {% for tag in tags %}
          {% if tag != "posts" %}
            <a href="/tags/{{ tag | slugify }}/" class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200">{{ tag }}</a>
          {% endif %}
        {% endfor %}
      </div>
    {% endif %}
    {% if categories %}
      <div class="mt-1 text-sm text-gray-500">
        {% for cat in categories %}
          <span>{{ cat }}</span>{% if not loop.last %}, {% endif %}
        {% endfor %}
      </div>
    {% endif %}
    {# Note: Category pages with links can be added in a future phase #}
  </header>

  <div class="prose prose-lg max-w-none">
    {{ content | safe }}
  </div>
</article>
```

- [ ] **Step 2: Create page layout**

Create `src/_includes/layouts/page.njk`:

```njk
---
layout: layouts/base.njk
---
<article>
  <h1 class="text-4xl font-bold mb-8">{{ title }}</h1>
  <div class="prose prose-lg max-w-none">
    {{ content | safe }}
  </div>
</article>
```

- [ ] **Step 3: Install Tailwind typography plugin for prose styling**

Run:
```bash
npm install --save-dev @tailwindcss/typography
```

Update `src/css/main.css`:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

- [ ] **Step 4: Commit post and page layouts**

```bash
git add src/_includes/layouts/post.njk src/_includes/layouts/page.njk src/css/main.css package.json package-lock.json
git commit -m "feat: add post and page layouts with typography plugin"
```

---

## Chunk 2: Content Migration

### Task 4: Migrate blog posts

**Files:**
- Create: `src/posts/` (32 markdown files)
- Create: `src/posts/posts.json`

- [ ] **Step 1: Create posts directory data file**

Create `src/posts/posts.json`:

```json
{
  "layout": "layouts/post.njk",
  "tags": "posts",
  "permalink": "/posts/{{ page.fileSlug }}/"
}
```

This sets default layout and collection tag for all posts. The permalink uses the filename slug directly.

- [ ] **Step 2: Copy all post markdown files**

```bash
mkdir -p src/posts
cp pages/_posts/*.md src/posts/
```

- [ ] **Step 3: Fix image paths in all posts**

All posts reference assets via relative paths like `../_assets/media/...`. These must be rewritten to absolute paths `/assets/media/...` since the directory structure changes.

```bash
cd src/posts
# Rewrite ../_assets/ references to /assets/
sed -i 's|\.\./\_assets/|/assets/|g' *.md
```

Verify a few files to confirm paths look correct (e.g., `![](/assets/media/2018-2019/gugugu.jpg)`).

- [ ] **Step 4: Fix internal post-to-post .md links**

Some posts link to other posts via relative `.md` paths. These must become `/posts/<slug>/` links:

```bash
cd src/posts
# Fix ./other-post.md → /posts/other-post/
sed -i 's|\(\./\)\([a-zA-Z0-9_-]*\)\.md|/posts/\2/|g' *.md
```

Files affected:
- `2020-summary.md`: `./my-lovely-hard-drives.md` → `/posts/my-lovely-hard-drives/`
- `keep-your-google-voice-with-sao.md`: `./tasker-messenger.md` → `/posts/tasker-messenger/`
- `tweet-to-telegram.md`: `./customize-telegram-twitter-ifttt-connection.md` → `/posts/customize-telegram-twitter-ifttt-connection/`

- [ ] **Step 5: Clean Vue syntax from posts**

For each of the 32 files in `src/posts/`, the following changes are needed:

1. Remove `layout: post` lines from frontmatter (handled by `posts.json` directory data)
2. Remove Vue `<script>` blocks at the end of files (Saber-specific)
3. Replace Vue component tags (`<Tweet>`, `<Youtube>`, `<TelegramEmbed>`) with placeholder comments: `<!-- TODO: embed migration Phase 2 -->`

**Critical: Nunjucks `{{ }}` conflicts.** Two posts contain `{{ }}` double-brace syntax that Nunjucks will try to interpret. These MUST be wrapped in `{% raw %}` blocks:

- `keep-your-google-voice-with-sao.md` line 78: `` `(`{{ front }}`)`{{ middle }}`-`{{  end }} `` — wrap the entire interactive section (lines 76-82) in `{% raw %}...{% endraw %}`. Also replace `<button @click="reCal">` with `<!-- TODO: interactive widget, Phase 2 -->`.
- `2020-red-pack-writeup.md` line 139: `{{ cool_file }}` — wrap in `{% raw %}...{% endraw %}` or replace with placeholder text.

**Posts with Vue `<script>` blocks (9 posts — the other 23 need only `layout` line removal):**

| Post | Action |
|------|--------|
| `2020-summary.md` | Remove `<Tweet>` and `<Youtube>` tags (→ placeholder comments) + script block |
| `my-lovely-hard-drives.md` | Convert 8x `<a v-bind:href="varname">` to static `<a href="/assets/media/my-lovely-hard-drives/filename.jpg">` links. Remove `<Tweet>` tags (→ placeholder). Remove script block. |
| `2020-red-pack-writeup.md` | Remove `<TelegramEmbed>` (→ placeholder). Wrap `{{ cool_file }}` in `{% raw %}`. Remove script block. |
| `space-and-s-p-a-c-e.md` | Remove `<TelegramEmbed>` (→ placeholder) + script block |
| `tasker-messenger.md` | Remove `<TelegramEmbed>` (→ placeholder) + script block |
| `nano-pi-neo2-first-experience.md` | Remove `<TelegramEmbed>` (→ placeholder) + script block |
| `bye-dbd.md` | Replace `require()` PDF link with static `<a href="/assets/file/bye-dbd/DBD_Overview_20170516-20200522.pdf">`. Remove script block. |
| `p440ar-ctrl-benchmark.md` | Replace `require()` tar.gz links with static `<a href="/assets/file/p440ar-ctrl-benchmark/fio-raid0.tar.gz">` etc. Remove script block. |
| `keep-your-google-voice-with-sao.md` | Wrap interactive section in `{% raw %}`. Replace `<button @click>` with placeholder. Remove script block. |

- [ ] **Step 4: Verify posts build**

Run: `npm run build`
Expected: All 32 posts build to `_site/posts/<slug>/index.html`

- [ ] **Step 5: Spot-check a few posts in browser**

Run: `npm run dev`
Check:
- A post with code blocks (syntax highlighting works)
- A post with Chinese content (CJK breaks work)
- A post with images (figure wrapping works)

- [ ] **Step 6: Commit migrated posts**

```bash
git add src/posts/
git commit -m "feat: migrate 32 blog posts to 11ty (embeds deferred to Phase 2)"
```

---

### Task 5: Migrate static pages

**Files:**
- Create: `src/pages/about.md`
- Create: `src/pages/friends.njk`
- Create: `src/pages/archives.njk`
- Create: `src/_data/friends.js`

- [ ] **Step 1: Migrate about page**

Copy `pages/about.md` to `src/pages/about.md`. Modify:
- Change `layout: showcase` to `layout: layouts/page.njk`
- Remove the Vue `<script>` block at the bottom
- Replace `<Tweet id="1162786240371937280"/>` with a placeholder comment: `<!-- TODO: Tweet embed, Phase 2 -->`
- Fix internal link: `./_posts/2020-summary.md` → `/posts/2020-summary/`
- Add `permalink: /about/`

- [ ] **Step 2: Create friends data fetcher**

Create `src/_data/friends.js`:

```js
export default async function () {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/friends.json"
    );
    if (!res.ok) return {};
    return res.json();
  } catch (e) {
    console.warn("Failed to fetch friends data:", e.message);
    return {};
  }
}
```

- [ ] **Step 3: Create friends page template**

Create `src/pages/friends.njk`:

```njk
---
layout: layouts/page.njk
title: 友情链接
description: wow, these ARE my friends
permalink: /friends/
---

<p>这里应该是一些一起玩的小伙伴们，他们都超级棒的!!1</p>
<p>不妨也去溜达溜达 XD</p>

<div class="overflow-x-auto">
  <table class="w-full text-center">
    <thead>
      <tr>
        <th>Avatar</th>
        <th>Site</th>
        <th>Slogan</th>
      </tr>
    </thead>
    <tbody>
      {% for name, value in friends %}
        <tr>
          <td>
            {% if value.img %}
              <img src="{{ value.img }}" width="200" alt="{{ name }}" loading="lazy">
            {% else %}
              头
            {% endif %}
          </td>
          <td><a href="{{ value.link }}">{{ name }}</a></td>
          <td>{{ value.slogan }}</td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
</div>

<h2>交换友链</h2>
<p>交换链接请移步<a href="https://github.com/HomeofNever/Friends">这个仓库</a>, 阅读说明后发起 pr 提交你的信息</p>
<p>等你哦w</p>
```

- [ ] **Step 4: Create archives page**

Create `src/pages/archives.njk`:

```njk
---
layout: layouts/page.njk
title: Archives
permalink: /archives/
---

<ul class="space-y-2">
  {% for post in collections.posts | reverse %}
    <li>
      <time datetime="{{ post.date | isoDate }}" class="text-sm text-gray-500">{{ post.date | readableDate }}</time>
      — <a href="{{ post.url }}" class="hover:underline">{{ post.data.title }}</a>
    </li>
  {% endfor %}
</ul>
```

- [ ] **Step 5: Verify pages build and render**

Run: `npm run dev`
Check: `/about/`, `/friends/`, `/archives/` all render correctly.

- [ ] **Step 6: Commit static pages**

```bash
git add src/pages/ src/_data/friends.js
git commit -m "feat: migrate about, friends (build-time fetch), and archives pages"
```

---

### Task 6: Copy assets and static files

**Files:**
- Copy: `pages/_assets/` → `src/assets/`
- Copy: `static/` → `src/static/` (excluding `_redirects`)

- [ ] **Step 1: Copy content assets**

```bash
mkdir -p src/assets
cp -r pages/_assets/* src/assets/
```

- [ ] **Step 2: Copy static files (excluding _redirects)**

```bash
mkdir -p src/static
cp -r static/favicon.ico static/icons static/manifest.json static/browserconfig.xml static/robots.txt static/keybase.txt src/static/
```

The `_redirects` file from `static/` is NOT copied — it will be auto-generated by `redirects.njk`.

- [ ] **Step 3: Verify assets are accessible**

Run: `npm run dev`
Check: `/static/favicon.ico` and an image from `/assets/` load correctly in browser.

- [ ] **Step 4: Commit assets**

```bash
git add src/assets/ src/static/
git commit -m "feat: copy content assets and static files"
```

---

### Task 7: Migrate drafts

**Files:**
- Create: `src/drafts/drafts.json`
- Copy: 2 draft posts

- [ ] **Step 1: Copy draft posts (only real drafts)**

```bash
mkdir -p src/drafts
cp pages/_drafts/my-hack-synology-summary.md src/drafts/
cp pages/_drafts/my-t40-car-crash.md src/drafts/
```

Do NOT copy `category.md` or `tag.md` — those are Saber template files, not real drafts.

- [ ] **Step 2: Create drafts directory data file**

Create `src/drafts/drafts.json`:

```json
{
  "eleventyExcludeFromCollections": true,
  "permalink": false
}
```

- [ ] **Step 3: Verify drafts are excluded from build output**

Run: `npm run build`
Expected: No files generated for drafts in `_site/`. Drafts should NOT appear in collections or any page listing.

- [ ] **Step 4: Commit drafts**

```bash
git add src/drafts/
git commit -m "feat: migrate draft posts (excluded from build)"
```

---

## Chunk 3: Homepage, Pagination, Tags, and Feeds

### Task 8: Build homepage with pagination

**Files:**
- Modify: `src/index.njk`

- [ ] **Step 1: Update homepage with paginated post list**

Replace `src/index.njk`:

```njk
---
layout: layouts/base.njk
pagination:
  data: collections.posts
  size: 12
  reverse: true
  alias: pagedPosts
permalink: "{% if pagination.pageNumber == 0 %}/{% else %}/page/{{ pagination.pageNumber + 1 }}/{% endif %}"
---

<h1 class="text-3xl font-bold mb-8">{{ site.title }}</h1>

<ul class="space-y-6">
  {% for post in pagedPosts %}
    <li>
      <div class="text-sm text-gray-500">
        <time datetime="{{ post.date | isoDate }}">{{ post.date | readableDate }}</time>
      </div>
      <a href="{{ post.url }}" class="text-xl font-semibold hover:underline">{{ post.data.title }}</a>
      {% if post.data.description %}
        <p class="text-gray-600 mt-1">{{ post.data.description }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>

{% if pagination.pages.length > 1 %}
  <nav class="mt-8 flex gap-4 text-sm">
    {% if pagination.href.previous %}
      <a href="{{ pagination.href.previous }}" class="border border-gray-200 px-3 py-1 hover:bg-gray-50">&laquo; Newer</a>
    {% endif %}
    {% if pagination.href.next %}
      <a href="{{ pagination.href.next }}" class="border border-gray-200 px-3 py-1 hover:bg-gray-50">Older &raquo;</a>
    {% endif %}
  </nav>
{% endif %}
```

- [ ] **Step 2: Verify pagination**

Run: `npm run dev`
Expected: Homepage shows first 12 posts (newest first). If >12 posts, pagination links appear. `/page/2/` shows the next batch.

- [ ] **Step 3: Commit homepage**

```bash
git add src/index.njk
git commit -m "feat: add paginated homepage (12 posts per page)"
```

---

### Task 9: Create tag pages

**Files:**
- Create: `src/tags.njk`
- Create: `src/tag-page.njk`

- [ ] **Step 1: Create tag list page**

Create `src/tags.njk`:

```njk
---
layout: layouts/page.njk
title: Tags
permalink: /tags/
---

<ul class="flex flex-wrap gap-3">
  {% for tag in collections | getTagList %}
    <li>
      <a href="/tags/{{ tag | slugify }}/" class="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200">
        {{ tag }}
      </a>
    </li>
  {% endfor %}
</ul>
```

- [ ] **Step 2: Create individual tag page template**

Create `src/tag-page.njk`:

```njk
---
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - posts
    - all
  addAllPagesToCollections: false
layout: layouts/page.njk
permalink: /tags/{{ tag | slugify }}/
eleventyComputed:
  title: "Tagged: {{ tag }}"
---

<ul class="space-y-4">
  {% set taggedPosts = collections[tag] | reverse %}
  {% for post in taggedPosts %}
    <li>
      <time datetime="{{ post.date | isoDate }}" class="text-sm text-gray-500">{{ post.date | readableDate }}</time>
      — <a href="{{ post.url }}" class="hover:underline">{{ post.data.title }}</a>
    </li>
  {% endfor %}
</ul>
```

- [ ] **Step 3: Add getTagList filter to eleventy.config.js**

Add to `eleventy.config.js`:

```js
eleventyConfig.addFilter("getTagList", (collections) => {
  const tags = new Set();
  for (const name in collections) {
    if (name === "posts" || name === "all") continue;
    tags.add(name);
  }
  return [...tags].sort();
});
```

- [ ] **Step 4: Verify tag pages**

Run: `npm run dev`
Check: `/tags/` lists all tags. Each tag links to `/tags/<tag>/` showing posts with that tag.

- [ ] **Step 5: Commit tag pages**

```bash
git add src/tags.njk src/tag-page.njk eleventy.config.js
git commit -m "feat: add tag listing and individual tag pages"
```

---

### Task 10: RSS and JSON feeds

**Files:**
- Create: `src/feed.njk`
- Create: `src/feed-json.njk`

- [ ] **Step 1: Create Atom feed**

Create `src/feed.njk`:

```njk
---json
{
  "permalink": "/feed.xml",
  "eleventyExcludeFromCollections": true
}
---
<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>{{ site.title }}</title>
  <subtitle>{{ site.description }}</subtitle>
  <link href="{{ site.url }}/feed.xml" rel="self"/>
  <link href="{{ site.url }}/"/>
  <updated>{{ collections.posts | getNewestCollectionItemDate | dateToRfc3339 }}</updated>
  <id>{{ site.url }}/</id>
  <author>
    <name>{{ site.author }}</name>
    <email>{{ site.email }}</email>
  </author>
  {% for post in collections.posts | reverse %}
  {% if loop.index0 < 20 %}
  <entry>
    <title>{{ post.data.title }}</title>
    <link href="{{ site.url }}{{ post.url }}"/>
    <updated>{{ post.date | dateToRfc3339 }}</updated>
    <id>{{ site.url }}{{ post.url }}</id>
    <content type="html">{{ post.templateContent | htmlToAbsoluteUrls(site.url + post.url) }}</content>
  </entry>
  {% endif %}
  {% endfor %}
</feed>
```

- [ ] **Step 2: Create JSON feed**

Create `src/feed-json.njk`:

```njk
---json
{
  "permalink": "/feed/index.json",
  "eleventyExcludeFromCollections": true
}
---
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "{{ site.title }}",
  "home_page_url": "{{ site.url }}/",
  "feed_url": "{{ site.url }}/feed/index.json",
  "description": "{{ site.description }}",
  "authors": [{ "name": "{{ site.author }}" }],
  "items": [
    {% set feedPosts = collections.posts | reverse %}
    {% for post in feedPosts %}{% if loop.index0 < 20 %}{% if loop.index0 > 0 %},{% endif %}
    {
      "id": "{{ site.url }}{{ post.url }}",
      "url": "{{ site.url }}{{ post.url }}",
      "title": "{{ post.data.title }}",
      "content_html": {{ post.templateContent | dump | safe }},
      "date_published": "{{ post.date | dateToRfc3339 }}"
    }{% endif %}{% endfor %}
  ]
}
```

- [ ] **Step 3: Verify feeds**

Run: `npm run build`
Check: `_site/feed.xml` is valid XML. `_site/feed/index.json` is valid JSON.

- [ ] **Step 4: Commit feeds**

```bash
git add src/feed.njk src/feed-json.njk
git commit -m "feat: add Atom and JSON feed generation"
```

---

### Task 11: Sitemap

**Files:**
- Create: `src/sitemap.njk`

- [ ] **Step 1: Create sitemap template**

Create `src/sitemap.njk`:

```njk
---json
{
  "permalink": "/sitemap.xml",
  "eleventyExcludeFromCollections": true
}
---
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  {% for page in collections.all %}
    {% if page.url and not page.data.eleventyExcludeFromCollections %}
    <url>
      <loc>{{ site.url }}{{ page.url }}</loc>
      <lastmod>{{ page.date | isoDate }}</lastmod>
    </url>
    {% endif %}
  {% endfor %}
</urlset>
```

- [ ] **Step 2: Verify sitemap**

Run: `npm run build`
Check: `_site/sitemap.xml` exists and contains URLs for all posts and pages.

- [ ] **Step 3: Commit sitemap**

```bash
git add src/sitemap.njk
git commit -m "feat: add sitemap.xml generation"
```

---

## Chunk 4: Redirects and Deployment

### Task 12: Generate _redirects file

**Files:**
- Create: `src/redirects.njk`
- Create: `src/_data/legacyRedirects.js`

- [ ] **Step 1: Create legacy redirects data file**

Create `src/_data/legacyRedirects.js`:

This file reads the existing `static/_redirects` file from the old Saber blog and parses the rules, rewriting any target URLs from the old `/:year/:month/:day/:slug` format to `/posts/:slug/`.

```js
import fs from "fs";
import path from "path";

export default function () {
  const redirectsPath = path.resolve("static/_redirects");
  if (!fs.existsSync(redirectsPath)) return [];

  const content = fs.readFileSync(redirectsPath, "utf8");
  const lines = content.split("\n");
  const rules = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip empty lines and comments
    if (!trimmed || trimmed.startsWith("#")) continue;

    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;

    let [source, target, ...rest] = parts;

    // Rewrite old-format targets: /YYYY/MM/DD/slug → /posts/slug/
    const oldUrlMatch = target.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+?)$/);
    if (oldUrlMatch) {
      const slug = oldUrlMatch[4];
      target = `/posts/${slug}/`;
    }

    rules.push([source, target, ...rest].join("  "));
  }

  return rules;
}
```

- [ ] **Step 2: Create redirects template**

Create `src/redirects.njk`:

```njk
---json
{
  "permalink": "/_redirects",
  "eleventyExcludeFromCollections": true
}
---
# Legacy redirects (from previous blog migrations)
{% for rule in legacyRedirects %}
{{ rule }}
{% endfor %}

# Old URL scheme redirects (/:year/:month/:day/:slug → /posts/:slug/)
{% for post in collections.posts %}
/{{ post.date | dateToPath }}/{{ post.fileSlug }}  /posts/{{ post.fileSlug }}/  301
{% endfor %}

# Feed redirects
/feed/atom.xml  /feed.xml  301
```

Note: The `dateToPath` filter is already defined in `eleventy.config.js` (Task 1, Step 4) using UTC methods.

- [ ] **Step 3: Verify redirects file**

Run: `npm run build`
Check: `_site/_redirects` contains both legacy rules (with rewritten targets) and new redirect rules for all 32 posts.

- [ ] **Step 4: Commit redirects**

```bash
git add src/redirects.njk src/_data/legacyRedirects.js eleventy.config.js
git commit -m "feat: auto-generate _redirects merging legacy rules with new URL scheme"
```

---

### Task 13: Cloudflare Pages deployment workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - master

jobs:
  deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    if: "!contains(github.event.head_commit.message, '[ci skip]')"

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"

      - run: npm ci
      - run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy _site --project-name=blog
```

Note: The user will need to:
1. Create a Cloudflare Pages project named `blog`
2. Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets

- [ ] **Step 2: Add .gitignore entries**

Add to `.gitignore`:

```
_site/
node_modules/
```

- [ ] **Step 3: Commit deployment config**

```bash
git add .github/workflows/deploy.yml .gitignore
git commit -m "feat: add Cloudflare Pages deployment workflow"
```

---

### Task 14: Final verification

- [ ] **Step 1: Full build test**

Run: `npm run build`
Expected: Clean build, no errors. Check `_site/` directory structure:
- `_site/posts/<slug>/index.html` for each post
- `_site/about/index.html`
- `_site/friends/index.html`
- `_site/archives/index.html`
- `_site/tags/` with subdirectories
- `_site/feed.xml`
- `_site/feed/index.json`
- `_site/sitemap.xml`
- `_site/_redirects`
- `_site/css/main.css`
- `_site/static/` with favicon, icons, etc.

- [ ] **Step 2: Local dev server smoke test**

Run: `npm run dev`
Walk through:
1. Homepage — paginated post list, pagination links if >12 posts
2. A post — title, date, tags, content, code highlighting
3. A post with Chinese content — CJK breaks render correctly
4. About page — content renders
5. Friends page — friend list populated from JSON
6. Archives page — all posts listed
7. Tags page — lists all tags, individual tag pages work
8. RSS feed — `/feed.xml` loads in browser
9. JSON feed — `/feed/index.json` loads in browser

- [ ] **Step 3: Validate redirects**

Open `_site/_redirects` and verify:
- All 32 posts have old→new URL redirect entries
- Legacy redirects from old `static/_redirects` are present with rewritten targets
- Feed redirect is present

---

## Phase 2 & 3: High-Level Plan

### Phase 2: Embeds & Comments (separate plan)

1. **Shortcodes:** Implement `youtube`, `tweet`, `telegram` shortcodes in `eleventy.config.js`
2. **Post migration:** Update 7 files (6 posts + `about.md`) to use shortcodes instead of Vue components
3. **Vue script cleanup:** Handle `require()` imports (static links), `.cool` file (build-time read), interactive widget (vanilla JS)
4. **Disqus export:** Export XML from Disqus admin
5. **giscus setup:** Enable GitHub Discussions, configure giscus
6. **Comment migration:** Run migration script (Disqus XML → GitHub Discussions)
7. **giscus integration:** Add `giscus.njk` partial, include in `post.njk`

### Phase 3: Polish & Extras (separate plan)

1. **Image optimization:** `@11ty/eleventy-img` plugin
2. **SEO metadata:** Open Graph, Twitter Cards in `base.njk`
3. **Analytics:** Cloudflare Web Analytics (or keep current GA Lite)
4. **Old codebase cleanup:** Remove Saber files, update README
5. **jsDelivr removal:** Cloudflare Pages is the CDN now
