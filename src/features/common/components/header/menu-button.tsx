import { useCloseDrawer } from '@/common/hooks'
import { motion } from 'framer-motion'

type MenuButtonProps = {
  openDrawer(isopen: boolean): void
  className?: string
  isDrawerOpen: boolean
}

const MenuButton = ({ openDrawer, isDrawerOpen }: MenuButtonProps) => {
  useCloseDrawer(() => openDrawer(false))

  return (
    <div className="flex col-span-1 justify-end lg:hidden">
      <motion.button
        aria-label="close-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="group flex right-10 z-200 flex-col gap-2 justify-center items-center
      w-6 h-6 cursor-pointer md:top-32 md:right-8 lg:hidden"
        onClick={() => {
          openDrawer(!isDrawerOpen)
        }}
      >
        <motion.span
          className="w-5 h-[2px] bg-orange"
          animate={{
            rotate: isDrawerOpen ? 43 : 0,
            y: isDrawerOpen ? 5 : 0,
          }}
        />
        <motion.span
          className="w-5 h-[2px] bg-orange"
          animate={{
            rotate: isDrawerOpen ? -46 : 0,
            y: isDrawerOpen ? -5.5 : 0,
          }}
        />
      </motion.button>
    </div>
  )
}

export default MenuButton
