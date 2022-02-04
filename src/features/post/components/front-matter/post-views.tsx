import { AnimatePresence, motion } from "framer-motion";

import { Tooltip } from "@common/components";
import { EyeIcon } from "@heroicons/react/outline";
import { usePostViews, useUpdateViews } from "@post/hooks";
import { useEffect } from "react";

const PostViews = ({ postSlug }: { postSlug: string }) => {
  const { views } = usePostViews(postSlug);
  const updateViews = useUpdateViews(postSlug);
  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    updateViews.mutate();
  }, [postSlug, updateViews]);
  return (
    <Tooltip tooltipText={"views"} position="bottom" color="orange">
      <AnimatePresence>
        {views !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 items-center"
          >
            <EyeIcon className="h-6 w-6 text-mint dark:text-orange" />
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
