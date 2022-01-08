import { useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "classnames";

import {
  XIcon,
  CheckIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/solid";

import { useModalStore } from "@common/hooks";

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
          initial={{
            scale: 0.5,
            opacity: 0,
            y:
              position === "bottom" || position === "bottomRight"
                ? "100%"
                : "0",
            x: position === "topRight" ? "100%" : "0",
          }}
          animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
          exit={{
            opacity: 0,
            y:
              position === "bottom" || position === "bottomRight"
                ? "100%"
                : "-100%",
          }}
          className={cn("fixed w-72 z-100", {
            "top-0": position === "top",
            "bottom-0": position === "bottom",
            "bottom-10 right-6": position === "bottomRight",
            "top-10 right-6": position === "topRight",
            "mx-auto left-0 right-0":
              position === "bottom" || position === "top",
          })}
          onClose={closeMessageModal}
        >
          <div
            className={cn(
              "shadow-xl rounded-md w-full p-2 relative flex items-center gap-2",
              {
                "bg-mint": messageType === "success",
                "bg-red-500": messageType === "error",
                "bg-yellow-500": messageType === "warning",
                "ml-auto":
                  position === "bottomRight" || position === "topRight",
              }
            )}
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
              onClick={() => closeMessageModal()}
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
