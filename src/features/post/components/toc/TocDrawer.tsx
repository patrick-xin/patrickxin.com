import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { XIcon } from '@heroicons/react/outline'
import QuickNav from '../QuickNav'

interface DrawerProps {
  isDrawerOpen: boolean
  setOpenDrawer: (openDrawer: boolean) => void
}

const TocDrawer = ({ isDrawerOpen, setOpenDrawer }: DrawerProps) => {
  const ref = useRef(null)

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          ref={ref}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{
            x: '-100%',
            transition: { duration: 0.4 },
          }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="flex overflow-y-scroll fixed top-0 left-0 z-100 flex-col px-6 w-[60vw] h-screen bg-snow dark:bg-lead border-r-2 dark:border-mint/20
      shadow-md md:w-[40vw] lg:px-12 lg:w-[24vw]"
        >
          <motion.div
            className="flex relative justify-end px-6 mt-4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isDrawerOpen ? 1 : 0,
            }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed top-2 left-2 z-100 p-2 bg-plum dark:bg-mint/50 rounded-full shadow-lg md:p-4 lg:top-4 lg:left-4"
              onClick={() => {
                setOpenDrawer(false)
              }}
            >
              <XIcon className="w-4 h-4 text-snow fill-current md:w-6 md:h-6" />
            </motion.button>
          </motion.div>
          <QuickNav setOpenDrawer={() => setOpenDrawer(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default TocDrawer
