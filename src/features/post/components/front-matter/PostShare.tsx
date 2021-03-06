import { Tooltip } from '@/common/components'
import siteConfig from '@/config/site'
import { motion } from 'framer-motion'
import { ShareIcon } from '@heroicons/react/outline'
import {
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'next-share'
import { Popover } from '@headlessui/react'

type PostShareProps = {
  postSlug: string
  description: string
}

const PostShare = ({ postSlug, description }: PostShareProps) => {
  return (
    <Popover className="flex relative flex-col items-center">
      <Popover.Button>
        <Tooltip color="purple" position="bottom" tooltipText="share">
          <div className="group inline-flex p-1 bg-black/5 dark:bg-white/10 rounded-md transition-colors ease-linear lg:p-1.5">
            <ShareIcon className="w-6 h-6 text-mint dark:text-purple-400" />
          </div>
        </Tooltip>
      </Popover.Button>
      <div>
        <Popover.Panel className="absolute -top-6 -left-5 z-10 px-4 w-fit h-full translate-x-[3rem] sm:px-0 md:left-1/2">
          <div className="flex relative flex-col">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex absolute inset-0 flex-col gap-4"
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
                  url={`${siteConfig.details.url}/posts/${postSlug}`}
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
  )
}

export default PostShare
