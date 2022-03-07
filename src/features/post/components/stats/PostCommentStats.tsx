import { AnimatePresence, motion } from 'framer-motion'

import { ChatIcon } from '@heroicons/react/outline'
import { Tooltip } from '@/common/components'

import { usePostComments } from '@/post/hooks'

type PostCommentProps = {
  postSlug: string
  handleScrollToComments: () => void
}

const PostCommentStats = ({
  postSlug,
  handleScrollToComments,
}: PostCommentProps) => {
  const { comments } = usePostComments(postSlug)

  return (
    <Tooltip position="bottom" color="mint" tooltipText="comments">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex gap-1 items-center"
        >
          <button
            type="button"
            onClick={handleScrollToComments}
            className="group inline-flex p-1 bg-black/5 dark:bg-white/10 rounded-md transition-colors ease-linear lg:p-1.5"
          >
            <ChatIcon className="w-6 h-6 text-orange dark:text-mint cursor-pointer" />
          </button>
          {comments && (
            <motion.div
              className="text-xs font-black lg:text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {comments.length}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Tooltip>
  )
}

export default PostCommentStats
