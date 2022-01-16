import { Switch } from "@headlessui/react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import { SunIcon, MoonIcon } from "@common/components/svg";

import { useTheme } from "../theme-provider";

const ThemeToggle = () => {
  const { theme, toggleDarkMode } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleDarkMode}
      className={cn("relative flex items-center h-6 rounded-full w-12", {
        "bg-white/10": theme === "dark",
        "bg-black/10": theme !== "dark",
      })}
    >
      <span className="sr-only">Change Color Mode</span>
      {theme === "dark" ? (
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0, x: 2 }}
            animate={{
              opacity: 1,
              x: 2,
              transition: { ease: [0.11, 0.7, 0, 1] },
            }}
          >
            <MoonIcon />
          </motion.span>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: 26,
              rotate: 180,
              transition: { ease: [0.11, 0.7, 0, 1] },
            }}
          >
            <SunIcon />
          </motion.span>
        </AnimatePresence>
      )}
    </Switch>
  );
};

export default ThemeToggle;
