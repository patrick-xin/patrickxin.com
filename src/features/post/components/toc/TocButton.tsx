import { AnnotationIcon } from '@heroicons/react/outline'
import { AnimatePresence, motion } from 'framer-motion'

type TocButtonProps = {
  onClick: () => void
}

const TocButton = ({ onClick }: TocButtonProps) => {
  return (
    <AnimatePresence>
      <motion.button
        type="button"
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClick}
        className="shadow-lg fixed bg-plum dark:bg-mint/50 z-100 p-4 rounded-full bottom-12 right-32"
      >
        <AnnotationIcon className="h-4 w-4 md:h-6 md:w-6 fill-current text-snow" />
      </motion.button>
    </AnimatePresence>
  )
}

export default TocButton
