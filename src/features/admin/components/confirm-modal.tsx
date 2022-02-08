import { SpinLoader } from "@/common/components/icon";
import { Dialog } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";

type ConfirmModalProps = {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
  title: string;
  description?: string;
  isLoading: boolean;
  children?: JSX.Element;
};

const ConfirmModal = ({
  onClose,
  onConfirm,
  isOpen,
  title,
  description,
  isLoading,
  children,
}: ConfirmModalProps) => {
  function closeModal() {
    onClose();
  }

  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
            open={isOpen}
          >
            <div className="min-h-screen px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black/30 dark:bg-black/90" />

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block w-full max-w-md p-10 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
                <Dialog.Title className="text-xl mb-12 font-body text-gray-900 dark:text-white ">
                  <span>{title.split(" ").slice(0, 5).join(" ")}</span>{" "}
                  <span className="text-red-500">
                    {title.split(" ").slice(5).join(" ")}
                  </span>
                </Dialog.Title>
                {description && (
                  <div className="mt-2">
                    <p className="text-sm">{description}</p>
                  </div>
                )}
                {children}

                <div className="mt-6 flex gap-4 justify-end">
                  <button
                    type="button"
                    className="inline-flex self-end justify-center items-center w-30 px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md "
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex  justify-center items-center w-30 px-4 py-2 text-sm font-medium bg-orange text-white dark:bg-mint rounded-md "
                    onClick={onConfirm}
                  >
                    {isLoading ? <SpinLoader /> : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmModal;
