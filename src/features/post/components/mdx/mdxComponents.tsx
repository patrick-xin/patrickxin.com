import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const ToastForPost = dynamic(() => import('./ToastForPost'))
import FeaturedText from './FeaturedText'
import Pre from './Pre'
import {
  HashIcon,
  QuoteEndIcon,
  QuoteStartIcon,
} from '@/common/components/icon'

const MDXComponents = {
  Image,
  FeaturedText,
  ToastForPost,
  a: ({ ...props }) => {
    if (props.href.startsWith('https')) {
      return (
        <a
          className="inline-block relative font-medium text-orange hover:text-mint dark:text-mint dark:hover:text-orange underline underline-offset-4 transition-colors ease-linear"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }

    if (props.href.startsWith('#')) {
      return (
        <a
          {...props}
          href={props.href}
          className="inline-block mt-1 ml-2 text-mint dark:text-orange opacity-0 group-hover:opacity-100 transition-transform
          duration-75 ease-out scale-0 group-hover:scale-100
          origin-left"
        >
          <HashIcon />
        </a>
      )
    }

    return (
      <Link href={props.href}>
        <a {...props}>{props.children}</a>
      </Link>
    )
  },
  strong: ({ ...props }) => <strong {...props} className="font-bold" />,
  h2: ({ ...props }) => {
    return (
      <h2
        {...props}
        data-heading
        className="group flex items-center my-4 font-code text-2xl font-bold tracking-tight capitalize scroll-mt-6 
        lg:mt-14 lg:text-4xl"
      />
    )
  },
  h3: ({ ...props }) => {
    return (
      <h3
        {...props}
        data-heading
        className="group flex items-center py-2 font-code text-xl font-semibold tracking-tighter capitalize scroll-mt-2 lg:text-3xl 
        lg:tracking-tight lg:leading-10"
      />
    )
  },
  p: ({ ...props }) => {
    return <p {...props} className="my-6 leading-8 md:my-6 lg:my-8  xl:my-10" />
  },
  em: ({ ...props }) => {
    return <em {...props} className="italic" />
  },
  hr: ({ ...props }) => {
    return <hr {...props} className="my-10" />
  },
  blockquote: ({ ...props }) => {
    return (
      <div
        className="flex relative p-2 my-4 mx-auto font-body font-semibold bg-gray-50 dark:bg-white/5 rounded-lg lg:my-12 lg:text-xl
"
      >
        <div>
          <QuoteStartIcon />
        </div>
        <blockquote {...props} className="p-2 leading-3 lg:p-4" />
        <div className="self-end">
          <QuoteEndIcon />
        </div>
      </div>
    )
  },
  ul: ({ ...props }) => (
    <ul
      className="my-4 space-y-1 italic font-medium leading-6 list-disc
       list-inside md:pl-8 md:my-6 md:ml-4 lg:space-y-3 lg:leading-9"
      {...props}
    />
  ),
  ol: ({ ...props }) => (
    <ol
      className="p-2 space-y-1 text-sm italic font-medium leading-6 list-decimal list-inside md:p-4 md:pl-10 md:my-4 md:leading-7 lg:my-6 lg:space-y-3 lg:text-lg lg:leading-9"
      {...props}
    />
  ),
  pre: Pre,
}

export default MDXComponents
