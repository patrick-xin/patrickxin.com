import { HeartIcon, RssIcon } from '@heroicons/react/solid'
import {
  GithubIcon,
  CopyRightIcon,
  InstagramIcon,
  TwitterIcon,
} from '@/common/components/icon'

import { getYear } from '@/utils/getYear'

type FooterProps = {
  hasMarginBottom: boolean
}

const Footer = ({ hasMarginBottom }: FooterProps) => {
  return (
    <footer
      className={`flex flex-col lg:mb-0 justify-center text-xs lg:text-sm items-center border-t dark:border-mint/20 ${
        hasMarginBottom ? 'mb-16' : 'mb-0'
      } py-4`}
    >
      <div className="flex flex-col-reverse gap-1 items-center mt-2 lg:flex-row lg:gap-4">
        <p>
          <CopyRightIcon />
          <span className="mx-2">Patrick Xin {getYear()}</span>
        </p>
        <ul className="flex gap-2 items-center">
          <li>
            <a
              rel="noreferrer noopener"
              target="_blank"
              className="group inline-flex p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors ease-linear lg:p-2"
              href="https://github.com/patrick-xin"
            >
              <GithubIcon />
            </a>
          </li>
          <li>
            <a
              className="group inline-flex p-1 mt-[2px] hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors ease-linear lg:p-2"
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.instagram.com/alpesdream/"
            >
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a
              className="group inline-flex p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors ease-linear lg:p-2"
              rel="noreferrer noopener"
              target="_blank"
              href="https://twitter.com/alpesdream"
            >
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a
              className="group inline-flex p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors ease-linear lg:p-1.5"
              rel="noreferrer noopener"
              target="_blank"
              href="https://alpesdream.vercel.app/rss.xml"
            >
              <RssIcon className="icon-link" />
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-2 lg:flex lg:items-center">
        <div className="gap-2 items-center text-center lg:flex lg:mr-2">
          <span className="inline-block mb-1 lg:mb-0">Made with</span>
          <HeartIcon className="inline-block mx-1 -mt-0.5 w-4 h-4 text-red-600" />
        </div>
        <div>
          using{' '}
          <span>
            <a
              rel="noreferrer noopener"
              className="hover:text-orange dark:hover:text-mint underline transition-colors ease-linear"
              href="https://nextjs.org/"
            >
              nextjs
            </a>
            {', '}
          </span>
          <span>
            <a
              rel="noreferrer noopener"
              className="hover:text-orange dark:hover:text-mint underline transition-colors ease-linear"
              href="https://tailwindcss.com/"
            >
              tailwind
            </a>
          </span>
          {', '}
          deployed by{' '}
          <span>
            <a
              rel="noreferrer noopener"
              className="hover:text-orange dark:hover:text-mint underline transition-colors ease-linear"
              href="https://vercel.com/"
            >
              vercel
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
