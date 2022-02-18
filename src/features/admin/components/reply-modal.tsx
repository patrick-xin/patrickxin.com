import { SpinLoader } from "@/common/components/icon";
import { useReply } from "@/post/hooks";
import { Dialog } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

type ConfirmModalProps = {
  onClose: () => void;
  user;
  isOpen: boolean;
};

const ReplyModal = ({ onClose, user, isOpen }: ConfirmModalProps) => {
  function closeModal() {
    onClose();
  }

  const [content, setContent] = useState("");
  const { reply, isSubmitting } = useReply();
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
                  reoly to <span className="text-mint">{user.username}</span>
                </Dialog.Title>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    reply(
                      {
                        id: user.comment[0].id,
                        slug: user.comment[0].post.slug,
                        username: user.username,
                        content,
                      },
                      { onSuccess: () => setContent("") }
                    );
                  }}
                >
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    value={content}
                    cols={30}
                    rows={10}
                  ></textarea>
                  <div className="mt-6 flex gap-4 justify-end">
                    <button
                      type="submit"
                      className="inline-flex  justify-center items-center w-30 px-4 py-2 text-sm font-medium bg-orange text-white dark:bg-mint rounded-md "
                    >
                      {isSubmitting ? <SpinLoader /> : "Confirm"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex self-end justify-center items-center w-30 px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-md "
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReplyModal;
