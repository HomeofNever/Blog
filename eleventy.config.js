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

  // --- Tag filters ---
  eleventyConfig.addFilter("getTagList", (collections) => {
    const tags = new Set();
    for (const name in collections) {
      if (name === "posts" || name === "all") continue;
      tags.add(name);
    }
    return [...tags].sort();
  });

  eleventyConfig.addFilter("tagSlug", (tag) => {
    // Slugify for ASCII tags; keep raw Unicode for CJK tags
    const ascii = tag.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").trim();
    return ascii || tag;
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
