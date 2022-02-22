import { AnimatePresence, motion } from "framer-motion";

import { ChatIcon } from "@heroicons/react/outline";
import { Tooltip } from "@/common/components";

import { usePostComments } from "@/post/hooks";

type PostCommentProps = {
  postSlug: string;
  handleScrollToComments: () => void;
};

const PostComment = ({
  postSlug,
  handleScrollToComments,
}: PostCommentProps) => {
  const { comments } = usePostComments(postSlug);

  return (
    <Tooltip position="bottom" color="mint" tooltipText="comments">
      <AnimatePresence>
        {comments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 items-center"
          >
            <button
              type="button"
              onClick={handleScrollToComments}
              className="p-1 group lg:p-1.5 dark:bg-white/10 bg-black/5 inline-flex rounded-md transition-colors ease-linear"
            >
              <ChatIcon className="h-6 w-6 text-orange dark:text-mint cursor-pointer" />
            </button>

            <motion.div
              className="font-black text-xs lg:text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {comments.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Tooltip>
  );
};

export default PostComment;
