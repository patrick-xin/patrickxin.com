import { useCloseDrawer } from "@common/hooks/useCloseDrawer";
import { AnimatePresence, motion } from "framer-motion";

type MenuButtonProps = {
  openDrawer(isopen: boolean): void;
  className?: string;
  isDrawerOpen: boolean;
};

const MenuButton = ({ openDrawer, isDrawerOpen }: MenuButtonProps) => {
  useCloseDrawer(() => openDrawer(false));

  return (
    <AnimatePresence>
      <div className="lg:hidden col-span-1 flex justify-end">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="cursor-pointer group z-200 h-6 w-6 flex flex-col md:top-32
      justify-center items-center gap-2 right-10 md:right-8 lg:hidden"
          onClick={() => {
            openDrawer(!isDrawerOpen);
          }}
        >
          <motion.span
            className="w-5 bg-orange h-[2px]"
            animate={{
              rotate: isDrawerOpen ? 43 : 0,
              y: isDrawerOpen ? 5 : 0,
            }}
          />
          <motion.span
            className="w-5 bg-orange h-[2px]"
            animate={{
              rotate: isDrawerOpen ? -46 : 0,
              y: isDrawerOpen ? -5.5 : 0,
            }}
          />
        </motion.button>
      </div>
    </AnimatePresence>
  );
};

export default MenuButton;
