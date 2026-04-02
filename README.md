# Never迷の小窝

Personal blog built with [Eleventy 3.x](https://www.11ty.dev/) and [Tailwind CSS v4](https://tailwindcss.com/), deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## History

This blog has gone through three generations. Previous versions are preserved as archive branches.

### Current: Eleventy (2026–present)

Branch: [`master`](https://github.com/HomeofNever/Blog)

Built with [Eleventy 3.x](https://www.11ty.dev/) (ESM, Nunjucks templates), styled with [Tailwind CSS v4](https://tailwindcss.com/). Comments powered by [giscus](https://giscus.app/) (GitHub Discussions). Deployed to Cloudflare Pages with native git integration.

### Saber (2018–2026)

Branch: [`archive-saber`](https://github.com/HomeofNever/Blog/tree/archive-saber)

Built with [Saber](https://github.com/saberland/saber), a Vue.js-based static site generator (now archived/unmaintained). Custom Vue theme with components for layouts, embeds, and comments. Disqus for comments, GA Lite for analytics, jsDelivr as CDN. Deployed to Netlify.

### Hexo (2017–2018)

Branch: [`archive-2017`](https://github.com/HomeofNever/Blog/tree/archive-2017)

Built with [Hexo 3.x](https://hexo.io/), a Node.js static site generator. Used the NexT theme with built-in search, categories, and tags. The original version of the blog.

## Project Structure

```
src/
├── _data/              # Global data files
│   ├── site.json       # Site metadata (title, url, nav)
│   ├── categories.json # Category slug mapping
│   ├── friends.js      # Build-time fetch of friends list
│   └── legacyRedirects.js  # Old URL redirect rules
├── _includes/
│   ├── layouts/
│   │   ├── base.njk    # Base HTML (head, OG tags, Twitter Cards)
│   │   ├── post.njk    # Blog post layout (tags, giscus comments)
│   │   └── page.njk    # Static page layout
│   ├── header.njk
│   └── footer.njk
├── posts/              # Blog posts (markdown)
├── pages/              # Static pages (about, friends, archives)
├── drafts/             # Draft posts (excluded from build)
├── assets/             # Images and files (passthrough copy)
├── static/             # Favicon, icons, robots.txt (passthrough copy)
├── css/main.css        # Tailwind CSS entry point
├── index.njk           # Homepage with pagination
├── feed.njk            # Atom feed
├── feed-json.njk       # JSON feed
├── sitemap.njk         # Sitemap
├── tags.njk            # Tag listing page
├── tag-page.njk        # Individual tag page template
└── redirects.njk       # _redirects generator
eleventy.config.js      # Eleventy configuration
```

## Development

```bash
# First-time setup (creates the dev container from distrobox.ini)
distrobox assemble create

# Enter the dev container
distrobox enter blog-dev

# Install dependencies
yarn install

# Dev server with hot reload
yarn dev

# Production build
yarn build
```

## Deployment

Deploys automatically to Cloudflare Pages via native git integration. Push to `master` triggers a production deploy; PRs get preview deployments.

Build settings in Cloudflare Pages dashboard:
- **Build command:** `yarn build`
- **Build output directory:** `_site`
- **Environment variable:** `NODE_VERSION` = `22`
