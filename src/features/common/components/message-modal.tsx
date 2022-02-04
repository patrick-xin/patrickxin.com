import { useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import {
  XIcon,
  CheckIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";

import { useModalStore } from "@common/hooks";

const variants = {
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
};

const positions = {
  topCenter: "top-0 mx-auto",
  topRight: "top-0 right-0",
  bottomCenter: "top-0 right-0",
  bottomRight: "bottom-0 right-0",
};
const types = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
};
const MessageModal = () => {
  const {
    closeMessageModal,
    isMessageModalOpen,
    position,
    messageType,
    message,
  } = useModalStore();

  let completeButtonRef = useRef(null);
  useEffect(() => {
    let timer = setTimeout(() => {
      closeMessageModal();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [isMessageModalOpen]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isMessageModalOpen && (
        <Dialog
          initialFocus={completeButtonRef}
          open={isMessageModalOpen}
          as={motion.div}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className={`fixed w-72 z-100 ${positions[position]}`}
          onClose={closeMessageModal}
        >
          <div
            className={`flex h-12 w-48 items-center justify-center rounded ${types[messageType]}`}
          >
            {messageType === "warning" && (
              <ExclamationCircleIcon className="text-snow h-6 w-6" />
            )}
            {messageType === "success" && (
              <CheckIcon className="text-white h-4 w-4" />
            )}
            {messageType === "error" && (
              <InformationCircleIcon className="text-snow h-6 w-6" />
            )}

            {message && (
              <Dialog.Title
                as="h3"
                className="text-sm font-medium leading-6 text-snow"
              >
                {message}
              </Dialog.Title>
            )}

            <button
              ref={completeButtonRef}
              type="button"
              className="absolute top-3 right-2"
              onClick={closeMessageModal}
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
