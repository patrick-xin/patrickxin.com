import { SpinLoader } from '@/common/components/icon'
import { Dialog } from '@headlessui/react'
import { AnimatePresence } from 'framer-motion'
import React from 'react'

type ConfirmModalProps = {
  onClose: () => void
  onConfirm: () => void
  isOpen: boolean
  title: string
  description?: string
  isLoading: boolean
  children?: JSX.Element
}

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
    onClose()
  }

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
                  <span>{title.split(' ').slice(0, 5).join(' ')}</span>{' '}
                  <span className="text-red-500">
                    {title.split(' ').slice(5).join(' ')}
                  </span>
                </Dialog.Title>
                {description && (
                  <div className="mt-2">
                    <p className="text-sm">{description}</p>
                  </div>
                )}
                {children}

                <div className="flex gap-4 justify-end mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center self-end py-2 px-4 w-32 text-sm font-medium text-white bg-red-500 rounded-md"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex  justify-center items-center py-2 px-4 w-32 text-sm font-medium text-white bg-orange dark:bg-mint rounded-md"
                    onClick={onConfirm}
                  >
                    {isLoading ? <SpinLoader /> : 'Confirm'}
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ConfirmModal
