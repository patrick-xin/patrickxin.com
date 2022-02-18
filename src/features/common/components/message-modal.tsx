import { useEffect, useRef } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
  XIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

import { useToastStore } from "@/common/hooks";

const toastTypes = {
  success: "bg-mint dark:bg-orange",
  error: "bg-red-500",
  warning: "bg-yellow-500",
};

const positions = {
  topCenter: "top-4 mx-auto right-0 left-0",
  topRight: "top-4 right-4",
  bottomCenter: "bottom-4 right-0 left-0 mx-auto",
  bottomRight: "bottom-4 right-0",
};

const variants = {
  fadeLeft: {
    initial: {
      opacity: 0,
      x: "100%",
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: "100%",
    },
  },
  fadeUp: {
    initial: {
      opacity: 0,
      y: 16,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: "-100%",
    },
  },
};

const MessageModal = () => {
  const { closeToast, isToastOpen, position, toastType, message, direction } =
    useToastStore();

  let completeButtonRef = useRef(null);
  useEffect(() => {
    let timer = setTimeout(() => {
      closeToast();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [isToastOpen]);

  return (
    <AnimatePresence>
      {isToastOpen && (
        <motion.div
          key={toastType}
          variants={variants[direction]}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`fixed text-white w-80 z-100 h-16 rounded-md flex items-center justify-around ${positions[position]} ${toastTypes[toastType]}`}
        >
          <div className="mx-2">
            {toastType === "warning" && (
              <ExclamationCircleIcon className="text-snow h-6 w-6" />
            )}
            {toastType === "success" && (
              <div className="flex">
                <span>🎉</span>
              </div>
            )}
            {toastType === "error" && (
              <InformationCircleIcon className="text-snow h-6 w-6" />
            )}
          </div>

          {message && (
            <p className="text-sm lg:text-base font-medium mx-2 leading-6">
              {message}
            </p>
          )}

          <button
            ref={completeButtonRef}
            type="button"
            className="absolute top-1 right-2"
            onClick={closeToast}
          >
            <XIcon className="h-4 w-4 text-snow" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
