import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ToastForPost = dynamic(() => import("./toast-for-post"));
import FeaturedText from "./featured-text";
import Pre from "./pre";
import {
  HashIcon,
  QuoteEndIcon,
  QuoteStartIcon,
} from "@/common/components/icon";

const MDXComponents = {
  Image,
  FeaturedText,
  ToastForPost,
  a: ({ ...props }) => {
    if (props.href.startsWith("https")) {
      return (
        <a
          className="text-orange dark:text-mint underline underline-offset-4 font-medium relative inline-block link"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    }

    if (props.href.startsWith("#")) {
      return (
        <a
          {...props}
          href={props.href}
          className="ml-2 mt-1 text-mint dark:text-orange transition-transform duration-75 ease-out origin-left transform : ;
          scale-0 opacity-0 group-hover:scale-100 inline-block
          group-hover:opacity-100"
        >
          <HashIcon />
        </a>
      );
    }

    return (
      <Link href={props.href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  },
  strong: ({ ...props }) => <strong {...props} className="font-bold" />,
  h2: ({ ...props }) => {
    return (
      <h2
        {...props}
        data-heading
        className="text-2xl capitalize scroll-mt-6 flex items-center tracking-tight font-code font-bold my-4 
        lg:mt-14 lg:text-4xl"
      />
    );
  },
  h3: ({ ...props }) => {
    return (
      <h3
        {...props}
        data-heading
        className="text-xl capitalize py-2 scroll-mt-2 flex lg:py-2 items-center group tracking-tighter lg:tracking-tight font-code font-semibold 
        lg:leading-10 lg:text-3xl"
      />
    );
  },
  p: ({ ...props }) => {
    return (
      <p {...props} className="my-2 md:my-4 lg:my-6 leading-7 lg:leading-8" />
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
      <div
        className="relative dark:bg-white/5 bg-gray-50 flex my-4 lg:my-12 p-2 mx-auto italic rounded-lg font-serif font-medium
"
      >
        <div>
          <QuoteStartIcon />
        </div>
        <blockquote {...props} className="p-2 lg:p-4 leading-3" />
        <div className="self-end">
          <QuoteEndIcon />
        </div>
      </div>
    );
  },
  ul: ({ ...props }) => (
    <ul
      className="my-4 md:my-6 leading-9 italic font-medium
       md:ml-4 md:pl-8 list-disc list-inside space-y-2 md:space-y-4"
      {...props}
    />
  ),
  ol: ({ ...props }) => (
    <ol
      className="p-2 md:p-4 text-sm lg:text-lg list-inside leading-6 space-y-1 list-decimal italic font-medium 
       md:pl-10 md:my-4 md:space-y-4 md:leading-7 lg:my-6"
      {...props}
    />
  ),
  pre: Pre,
};

export default MDXComponents;
