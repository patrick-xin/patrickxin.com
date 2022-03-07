import { AnimatePresence, motion } from 'framer-motion'
import { ViewGridIcon, ViewListIcon } from '@heroicons/react/solid'

type PostViewOptionProps = {
  isGridView: boolean
  setGridView: (isGridView: boolean) => void
}

const PostViewOption = ({ isGridView, setGridView }: PostViewOptionProps) => {
  return (
    <div className="flex gap-4 justify-end mb-4">
      {isGridView ? (
        <AnimatePresence exitBeforeEnter>
          <motion.button
            key="list-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() => setGridView(false)}
          >
            <ViewListIcon className="w-7 h-7 text-orange dark:text-mint" />
          </motion.button>
        </AnimatePresence>
      ) : (
        <AnimatePresence exitBeforeEnter>
          <motion.button
            key="grid-icon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type="button"
            onClick={() => setGridView(true)}
          >
            <ViewGridIcon className="w-6 h-6 text-orange dark:text-mint" />
          </motion.button>
        </AnimatePresence>
      )}
    </div>
  )
}

export default PostViewOption
