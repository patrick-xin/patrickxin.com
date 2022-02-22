import { Tooltip } from "@/common/components";
import siteConfig from "@/config/site";
import { motion } from "framer-motion";
import { ShareIcon } from "@heroicons/react/outline";
import {
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { Popover } from "@headlessui/react";

type PostShareProps = {
  postSlug: string;
  description: string;
};

const PostShare = ({ postSlug, description }: PostShareProps) => {
  return (
    <Popover className="relative flex flex-col items-center">
      <Popover.Button>
        <Tooltip color="purple" position="bottom" tooltipText="share">
          <button
            type="button"
            aria-label="share-article"
            className="p-1 group lg:p-1.5 dark:bg-white/10 bg-black/5 inline-flex rounded-md transition-colors ease-linear"
          >
            <ShareIcon className="h-6 w-6 text-mint dark:text-purple-400" />
          </button>
        </Tooltip>
      </Popover.Button>
      <div>
        <Popover.Panel className="absolute z-10 w-fit h-full px-4 transform translate-x-[3rem] left-1/2 -top-6 sm:px-0">
          <div className="relative flex flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-4 absolute inset-0"
            >
              <Tooltip tooltipText="Reddit" position="right" color="indigo">
                <RedditShareButton
                  url={`${siteConfig.details.url}/${postSlug}`}
                  title={description}
                >
                  <RedditIcon size={32} round />
                </RedditShareButton>
              </Tooltip>
              <Tooltip tooltipText="Twitter" position="right" color="blue">
                <TwitterShareButton
                  url={`${siteConfig.details.url}posts/${postSlug}`}
                  title={description}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </Tooltip>
            </motion.div>
          </div>
        </Popover.Panel>
      </div>
    </Popover>
  );
};

export default PostShare;
