import { useEffect } from "react";

type CodeLinkProps = {
  id: string;
  index: number;
  href: string;
};

const CodeLink = ({ href, id, index }: CodeLinkProps) => {
  const isExternal = href.startsWith("http");
  useEffect(() => {
    const codeblock = document.getElementById(id);
    if (!codeblock) return;

    const allHighlightWords = codeblock.querySelectorAll(".highlight-word");
    const target = allHighlightWords[index - 1];
    if (!target) return;

    target.replaceWith(
      Object.assign(document.createElement("a"), {
        href,
        innerHTML: target.innerHTML,
        className: target.className,
        ...(isExternal ? { target: "_blank", rel: "noopener" } : {}),
      })
    );
  }, []);

  return null;
};

export default CodeLink;
