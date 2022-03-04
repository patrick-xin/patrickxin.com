import { SpinLoader } from '@/common/components/icon'
import { useReply } from '@/post/hooks'
import { Dialog } from '@headlessui/react'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'

type ConfirmModalProps = {
  onClose: () => void
  user
  isOpen: boolean
}

const ReplyModal = ({ onClose, user, isOpen }: ConfirmModalProps) => {
  function closeModal() {
    onClose()
  }

  const [content, setContent] = useState('')
  const { reply, isSubmitting } = useReply()
  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            as="div"
            className="overflow-y-auto fixed inset-0 z-10"
            onClose={closeModal}
            open={isOpen}
          >
            <div className="px-4 min-h-screen text-center">
              <Dialog.Overlay className="fixed inset-0 bg-black/30 dark:bg-black/90" />

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block overflow-hidden p-10 my-8 w-full max-w-md text-left align-middle bg-white dark:bg-gray-800 rounded-lg shadow-xl transition-all">
                <Dialog.Title className="mb-12 font-body text-xl text-gray-900 dark:text-white ">
                  reoly to <span className="text-mint">{user.username}</span>
                </Dialog.Title>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    reply(
                      {
                        id: user.comment[0].id,
                        slug: user.comment[0].post.slug,
                        username: user.username,
                        content,
                      },
                      { onSuccess: () => setContent('') }
                    )
                  }}
                >
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    name="content"
                    value={content}
                    cols={30}
                    rows={10}
                  ></textarea>
                  <div className="flex gap-4 justify-end mt-6">
                    <button
                      type="submit"
                      className="inline-flex  justify-center items-center py-2 px-4 w-32 text-sm font-medium text-white bg-orange dark:bg-mint rounded-md"
                    >
                      {isSubmitting ? <SpinLoader /> : 'Confirm'}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center items-center self-end py-2 px-4 w-32 text-sm font-medium text-white bg-red-500 rounded-md"
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
  )
}

export default ReplyModal
