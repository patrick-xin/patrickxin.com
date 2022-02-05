import { useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import {
  XIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { CheckSquareIcon } from "./svg";

import { useToastStore } from "@common/hooks";

const toastTypes = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
};

const positions = {
  topCenter: "top-4 mx-auto",
  topRight: "top-4 right-4",
  bottomCenter: "bottom-0 mx-auto",
  bottomRight: "bottom-0 right-0",
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
      y: 12,
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
    <AnimatePresence exitBeforeEnter>
      {isToastOpen && (
        <Dialog
          initialFocus={completeButtonRef}
          open={isToastOpen}
          as={motion.div}
          key={toastType}
          variants={variants[direction]}
          initial="initial"
          animate="animate"
          className={`fixed w-72 z-100 ${positions[position]}`}
          onClose={closeToast}
        >
          <div
            className={`flex h-12 w-full items-center rounded ${toastTypes[toastType]}`}
          >
            <div className="mx-2">
              {toastType === "warning" && (
                <ExclamationCircleIcon className="text-snow h-6 w-6" />
              )}
              {toastType === "success" && <CheckSquareIcon />}
              {toastType === "error" && (
                <InformationCircleIcon className="text-snow h-6 w-6" />
              )}
            </div>

            {message && (
              <Dialog.Title
                as="h4"
                className="text-sm font-medium mx-2 leading-6 text-snow"
              >
                {message}
              </Dialog.Title>
            )}

            <button
              ref={completeButtonRef}
              type="button"
              className="absolute top-3 right-2"
              onClick={closeToast}
            >
              <XIcon className="h-4 w-4 text-snow" />
            </button>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default MessageModal;
