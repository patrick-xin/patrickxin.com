import { writeFileSync } from "fs";
import { globby } from "globby";

async function generate() {
  const pages = await globby([
    "src/pages/*.tsx",
    "content/**/*.mdx",
    "!src/pages/_*.tsx",
    "!src/pages/admin",
    "!src/pages/api",
    "!src/pages/login.tsx",
    "!src/pages/404.tsx",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace("src/pages", "")
              .replace("content", "")
              .replace(".tsx", "")
              .replace(".mdx", "");
            const route = path === "/index" ? "" : path;
            return `
              <url>
                  <loc>${`https://www.patrickxin.com${route}`}</loc>
              </url>
            `;
          })
          .join("")}
    </urlset>
    `;

  // eslint-disable-next-line no-sync
  writeFileSync("public/sitemap.xml", sitemap);
}

generate();
