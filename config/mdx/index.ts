import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import remarkExternalLinks from "remark-external-links";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Pluggable } from "unified";

const mdxOptions = {
  remarkPlugins: [remarkExternalLinks, remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    rehypeCodeTitles,
    rehypePrism,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
      },
    ],
  ] as Pluggable[],
};

export default mdxOptions;
