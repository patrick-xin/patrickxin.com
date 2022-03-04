import { AnimatePresence, motion } from 'framer-motion'
import classNames from 'classnames'

import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import { Tooltip } from '@/common/components'

import { useLocalStorage } from '@/common/hooks'
import { usePostLikes, useUpdateLikes } from '@/post/hooks'

const PostLikes = ({ postSlug }: { postSlug: string }) => {
  const [isLiked, setLike] = useLocalStorage(postSlug, false)

  const { likes } = usePostLikes(postSlug)
  const { updateLikes, isUpdatingLikes } = useUpdateLikes(postSlug)
  return (
    <Tooltip
      tooltipText={isLiked ? 'liked' : 'likes'}
      position="bottom"
      color="red"
    >
      <AnimatePresence>
        {likes !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 items-center"
          >
            {isLiked ? (
              <div className="group inline-flex p-1 bg-black/5 dark:bg-white/10 rounded-md transition-colors ease-linear lg:p-1.5">
                <HeartIcon className="w-6 h-6 text-red-500 cursor-not-allowed" />
              </div>
            ) : (
              <button
                onClick={() => {
                  setLike(true)
                  updateLikes()
                }}
                type="button"
                aria-label="like-post"
                className="group inline-flex p-1 bg-black/5 dark:bg-white/10 rounded-md transition-colors ease-linear lg:p-1.5"
              >
                <HeartIconOutline
                  className={classNames('h-6 w-6 cursor-pointer text-red-500', {
                    'cursor-not-allowed': isUpdatingLikes,
                  })}
                />
              </button>
            )}
            <motion.div
              className="text-xs font-black lg:text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {likes}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Tooltip>
  )
}

export default PostLikes
