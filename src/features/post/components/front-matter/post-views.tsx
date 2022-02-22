import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon } from "@heroicons/react/outline";

import { Tooltip } from "@/common/components";

import { usePostViews } from "@/post/hooks";

const PostViews = ({ postSlug }: { postSlug: string }) => {
  const { views } = usePostViews(postSlug);

  return (
    <Tooltip tooltipText={"views"} position="bottom" color="orange">
      <AnimatePresence>
        {views !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 items-center"
          >
            <div className="p-1 group lg:p-1.5 dark:bg-white/10 bg-black/5 inline-flex rounded-md transition-colors ease-linear">
              <EyeIcon className="h-6 w-6 text-mint dark:text-orange" />
            </div>

            <motion.div
              className="font-black text-xs lg:text-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {views}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Tooltip>
  );
};

export default PostViews;
