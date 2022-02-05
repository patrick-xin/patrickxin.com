import { useState } from "react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { ease } from "@common/animation";

type TooltipProps = {
  tooltipText: string;
  position: "left" | "bottom" | "top";
  color: "orange" | "red" | "purple";
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  tooltipText,
  position,
  color,
}) => {
  const [isEnter, setEnter] = useState(false);
  const variants = {
    orange: "bg-mint dark:bg-orange",
    red: "bg-red-600",
    purple: "bg-orange dark:bg-purple-600",
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setEnter(true)}
      onMouseLeave={() => setEnter(false)}
    >
      {!isTabletOrMobile && (
        <AnimatePresence>
          {isEnter && (
            <motion.div
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                x: position === "left" && "-40%",
                y: position === "bottom" && "-30%",
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ ease }}
              className={classNames(
                `absolute hidden lg:flex opacity-0 text-snow whitespace-nowrap px-1 lg:px-3 py-1 text-sm rounded items-center ${variants[color]}`,
                {
                  "-left-20 ml-1": position === "left",
                  "top-10 -left-2": position === "bottom",
                }
              )}
            >
              <div
                className={classNames(
                  `h-3 w-3 absolute transform rotate-45 ${variants[color]}`,
                  {
                    "-right-[3px]": position === "left",
                    "bottom-[20px] left-1/4 mt-[4px]": position === "bottom",
                  }
                )}
              />
              {tooltipText}
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
