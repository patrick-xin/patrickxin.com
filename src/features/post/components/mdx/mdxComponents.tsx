import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import CodeLink from "./code-link";
import FeaturedText from "./featured-text";
import Code from "./code";
import { HashIcon, QuoteEndIcon, QuoteStartIcon } from "@common/components/svg";

const MDXComponents = {
  Image,
  CodeLink,
  Code,
  FeaturedText,
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          {...props}
          className="text-orange dark:text-mint underline underline-offset-4 font-medium relative inline-block link"
          href={href}
          target="_blank"
          rel="noopener"
        />
      );
    }

    if (href.startsWith("#")) {
      return (
        <a
          {...props}
          href={href}
          className="ml-2 mt-1 text-mint dark:text-orange transition-transform duration-75 ease-out origin-left transform : ;
          scale-0 opacity-0 group-hover:scale-100 inline-block
          group-hover:opacity-100"
        >
          <HashIcon />
        </a>
      );
    }

    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  },
  strong: ({ ...props }) => <strong {...props} className="font-bold" />,
  h2: ({ ...props }) => {
    return (
      <h2
        {...props}
        data-heading
        className="text-2xl scroll-mt-6 flex items-center tracking-tight font-code font-bold my-4 
        lg:mt-14 lg:text-4xl"
      />
    );
  },
  h3: ({ ...props }) => {
    return (
      <h3
        {...props}
        data-heading
        className="text-xl py-2 scroll-mt-2 flex lg:py-2 items-center group tracking-tighter lg:tracking-tight font-code font-semibold 
        lg:leading-10 lg:text-3xl"
      />
    );
  },
  p: ({ ...props }) => {
    return (
      <p {...props} className="my-2 md:my-4 lg:my-6 leading-7 lg:leading-8" />
    );
  },
  code: ({
    children,
    showLineNumbers,
    fileName,
    id,
  }: {
    children: React.ReactNode;
    showLineNumbers: string;
    fileName: string;
    id: string;
  }) => {
    return (
      <>
        {fileName && (
          <div className="pl-4 text-xs lg:text-base p-2 md:mb-4 w-full rounded-sm text-orange bg-mint/10 font-bold">
            {fileName}
          </div>
        )}
        <code
          className={cn({
            "line-numbers": showLineNumbers !== undefined,
          })}
          id={id}
        >
          {children}
        </code>
      </>
    );
  },
  em: ({ ...props }) => {
    return <em {...props} className="italic" />;
  },
  hr: ({ ...props }) => {
    return <hr {...props} className="my-10" />;
  },
  blockquote: ({ ...props }) => {
    return (
      <div className="relative flex my-4 p-2 mx-auto italic rounded-lg font-bold">
        <div>
          <QuoteStartIcon />
        </div>
        <blockquote {...props} className="p-2 lg:p-4" />
        <div className="self-end">
          <QuoteEndIcon />
        </div>
      </div>
    );
  },
  ul: ({ ...props }) => (
    <ul
      className="my-6 leading-7 italic font-medium
       md:ml-4 md:pl-8 list-disc list-inside space-y-4"
      {...props}
    />
  ),
  ol: ({ ...props }) => (
    <ol
      className="p-4 text-sm lg:text-lg list-inside leading-6 space-y-1 list-decimal italic font-medium 
       md:pl-10 md:my-4 md:space-y-4 md:leading-7 lg:my-6"
      {...props}
    />
  ),
  pre: ({ children, ...props }: { children: React.ReactNode }) => (
    <pre {...props}>{children}</pre>
  ),
};

export default MDXComponents;
