# Blog

![gh pages deploy](https://github.com/HomeofNever/Blog/workflows/gh%20pages%20deploy/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a3ee7782-56b2-4b25-a7f9-b6c9f15332ce/deploy-status)](https://app.netlify.com/sites/never-blog/deploys)
[![](https://data.jsdelivr.com/v1/package/gh/homeofnever/blog/badge?style=rounded)](https://www.jsdelivr.com/package/gh/homeofnever/blog)

Again the new start.

## Old version

- 2017: https://github.com/HomeofNever/Blog/tree/archive-2017

## Get Startred

### `npm run dev`

Run dev server at `http://localhost:3000`

### `npm run build`

Build your website to `public` folder which you can deploy to GitHub Pages, Netlify or wherever you want.

## Structure

```
                         Github
                      +----------+              Lambda,          Cache,
                      |  Action  |              Redirect,        Security,
                      |          |              etc.             etc.
                  +---+----+-----v----+        +---------+     +------------+         +---------+
+--------+  Push  |        |          | Deploy | Netlify |     |            |   1st   |         |
| Author +--------> master | gh-pages +-------->   or    <-----+ Cloudflare <---------+ Clients |
+--------+        |        |          |        | Vercel  |     |            | Request |         |
                  +--------+-----^----+        +---------+     +------------+         +----+----+
                                 |                                                         |
                   Github Repo   |                                                         |
                                 |           +----------+                                  |
                                 |           |          |       After Vue App loaded       |
                                 +-----------+ jsDelivr <----------------------------------+
                                             |          |      Images, Styles, JS, etc.
                                             +----------+

```

## Credits

- https://saber.land
- https://github.com/h404bi/www.h404bi.com

## License 

1. Blog posts **text** [`pages/_posts`](pages/_posts) and **assets** in [`pages/_assets`](pages/_assets) are licensed under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.  
2. Except for [`pages`](pages), all other **codes** content in this repository are licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
3. All Copyright reserved for the rest of the content.