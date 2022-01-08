import { AnimatePresence, motion } from "framer-motion";
import { ViewGridIcon, ViewListIcon } from "@heroicons/react/solid";

type PostViewOptionProps = {
  isGridView: boolean;
  setGridView: (isGridView: boolean) => void;
};

const PostViewOption = ({ isGridView, setGridView }: PostViewOptionProps) => {
  return (
    <div className="flex justify-end gap-4 mb-4">
      <AnimatePresence exitBeforeEnter>
        {isGridView ? (
          <motion.button
            key="list-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() => setGridView(false)}
          >
            <ViewListIcon className="h-7 w-7 text-orange dark:text-mint" />
          </motion.button>
        ) : (
          <motion.button
            key="grid-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() => setGridView(true)}
          >
            <ViewGridIcon className="h-6 w-6 text-orange dark:text-mint" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostViewOption;
