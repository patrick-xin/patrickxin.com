import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";
import { useMediaQuery } from "react-responsive";

import useScrollToTop from "@common/hooks/useScrollToTop";
import { ArrowUpIcon } from "@heroicons/react/solid";

type ScrollTopProps = {
  top: number;
  isFixed: boolean;
};

const ScrollTop = ({ top, isFixed }: ScrollTopProps) => {
  const { visible, scrollToTop } = useScrollToTop({ top });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  if (isTabletOrMobile) return null;
  return (
    <>
      {visible ? (
        <AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "shadow-lg bg-plum dark:bg-mint/50 p-2 z-100 md:p-4 rounded-full bottom-8 right-4 md:bottom-12 md:right-12",
              {
                static: !isFixed,
                fixed: isFixed,
              }
            )}
            onClick={scrollToTop}
          >
            <ArrowUpIcon className="h-4 w-4 md:h-6 md:w-6 fill-current text-snow" />
          </motion.button>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default ScrollTop;
