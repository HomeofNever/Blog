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
