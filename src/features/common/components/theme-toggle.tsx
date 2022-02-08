import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

import { SunIcon, MoonIcon } from "@/common/components/icon";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Switch
      checked={isDark}
      onChange={() => {
        isDark ? setTheme("light") : setTheme("dark");
      }}
      className={cn("relative flex items-center h-6 rounded-full w-12", {
        "bg-white/10": isDark,
        "bg-black/10": !isDark,
      })}
    >
      <span className="sr-only">Change Color Mode</span>
      {isDark ? (
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
