import { HeartIcon } from "@heroicons/react/solid";
import {
  GithubIcon,
  CopyRightIcon,
  InstagramIcon,
  TwitterIcon,
} from "@common/components/svg";

type FooterProps = {
  hasMarginBottom: boolean;
};

const Footer = ({ hasMarginBottom }: FooterProps) => {
  return (
    <footer
      className={`flex flex-col lg:mb-0 justify-center text-xs lg:text-sm items-center border-t dark:border-mint/20 ${
        hasMarginBottom ? "mb-16" : "mb-0"
      } py-4`}
    >
      <div className="lg:flex lg:items-center">
        <div className="text-center lg:flex items-center gap-2 lg:mr-2">
          <span className="inline-block mb-1 lg:mb-0">Made with</span>

          <HeartIcon className="text-red-600 inline-block h-4 w-4 mx-1 -mt-0.5" />
        </div>
        <div>
          using{" "}
          <span>
            <a
              rel="noreferrer noopener"
              className="underline hover:text-orange dark:hover:text-mint transition-colors ease-linear"
              href="https://nextjs.org/"
            >
              nextjs
            </a>
            {", "}
          </span>
          <span>
            <a
              rel="noreferrer noopener"
              className="underline hover:text-orange dark:hover:text-mint transition-colors ease-linear"
              href="https://tailwindcss.com/"
            >
              tailwind
            </a>
          </span>
          {", "}
          deployed by{" "}
          <span>
            <a
              rel="noreferrer noopener"
              className="underline hover:text-orange dark:hover:text-mint transition-colors ease-linear"
              href="https://vercel.com/"
            >
              vercel
            </a>
          </span>
        </div>
      </div>

      <div className="mt-2 lg:mt-4 flex items-center gap-4">
        <p>
          <CopyRightIcon />
          <span className="mx-2">Patrick Xin 2022</span>
        </p>
        <ul className="flex gap-2 lg:gap-4">
          <li>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://github.com/patrick-xin"
            >
              <GithubIcon />
            </a>
          </li>
          <li>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://www.instagram.com/alpesdream/"
            >
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href="https://twitter.com/alpesdream"
            >
              <TwitterIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
