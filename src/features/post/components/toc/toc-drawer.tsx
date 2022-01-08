import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { XIcon } from "@heroicons/react/outline";
import QuickNav from "../quick-nav";

interface DrawerProps {
  isDrawerOpen: boolean;
  setOpenDrawer: (openDrawer: boolean) => void;
}

const TocDrawer = ({ isDrawerOpen, setOpenDrawer }: DrawerProps) => {
  const ref = useRef(null);

  //useOnClickOutside(ref, () => setOpenDrawer(false));
  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <motion.div
          ref={ref}
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{
            x: "-100%",
            transition: { duration: 0.4 },
          }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed left-0 top-0 bg-snow dark:bg-lead overflow-y-scroll h-screen w-[60vw] md:w-[40vw] lg:w-[20vw] px-6 lg:px-12
      flex flex-col z-100 shadow-md"
        >
          <motion.div
            className="flex justify-end px-6 mt-4 relative"
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
              className="fixed shadow-lg bg-plum dark:bg-mint/50 p-2 z-100 md:p-4 rounded-full top-4 left-4"
              onClick={() => {
                setOpenDrawer(false);
              }}
            >
              <XIcon className="h-4 w-4 md:h-6 md:w-6 fill-current text-snow" />
            </motion.button>
          </motion.div>
          <QuickNav setOpenDrawer={() => setOpenDrawer(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TocDrawer;
