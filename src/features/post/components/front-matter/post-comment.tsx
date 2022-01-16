import { AnimatePresence, motion } from "framer-motion";

import { ChatIcon } from "@heroicons/react/outline";
import { Tooltip } from "@common/components";
import { usePostComments } from "@post/hooks";

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
    <Tooltip position="bottom" color="purple" tooltipText="comments">
      <AnimatePresence>
        {comments && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 items-center"
          >
            <ChatIcon
              onClick={handleScrollToComments}
              className="h-6 w-6 text-orange dark:text-grape cursor-pointer"
            />

            <motion.div
              className="font-black font-modernist"
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
