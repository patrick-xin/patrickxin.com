import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";

import { ClipboardCopyIcon } from "@heroicons/react/outline";

import { copyToClipboard } from "@/utils/copyToClipboard";

type PreProps = {
  children: JSX.Element;
  className: string;
};

const Pre = ({ children, className, ...props }: PreProps) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const onClick = () => {
    copyToClipboard(preRef.current.innerText);
    setCopied(true);
  };
  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <div className="relative lg:my-8">
      <pre
        {...props}
        ref={preRef}
        className={cn(className, "focus:outline-none")}
      >
        <div className="absolute hidden lg:flex my-4 items-center space-x-2 top-0 right-6">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              aria-label="Copy to Clipboard"
              onClick={onClick}
              disabled={copied}
              className="inline-flex items-center"
            >
              <ClipboardCopyIcon
                className={cn("h-6 w-6", {
                  "text-orange dark:text-mint": copied,
                  "dark:text-gray-600 text-gray-400 hover:text-gray-500 dark:hover:text-gray-500":
                    !copied,
                })}
              />
            </motion.button>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 top-12 -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    role="tooltip"
                    className="relative text-white max-w-xs break-words rounded bg-orange dark:bg-mint px-3 py-2 text-center text-xs font-medium shadow-lg outline-none"
                  >
                    <svg
                      className="absolute text-orange dark:text-mint fill-current"
                      style={{ transform: "translate3D(30px, -13px, 0px)" }}
                      width="10"
                      height="5"
                      viewBox="0 0 30 10"
                      preserveAspectRatio="none"
                    >
                      <polygon points="15,0 30,10 0,10"></polygon>
                    </svg>
                    <span>copied</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {children}
      </pre>
    </div>
  );
};

export default Pre;
