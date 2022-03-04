import { useEffect, useRef } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import {
  XIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline'

import { useToastStore } from '@/common/hooks'

const toastTypes = {
  success: 'bg-mint dark:bg-orange',
  error: 'bg-red-500',
  warning: 'bg-yellow-600',
}

const positions = {
  topCenter: 'top-4 mx-auto right-0 left-0',
  topRight: 'top-4 right-4',
  bottomCenter: 'bottom-4 right-0 left-0 mx-auto',
  bottomRight: 'bottom-4 right-0',
}

const variants = {
  fadeLeft: {
    initial: {
      opacity: 0,
      x: '100%',
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: '100%',
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
      y: '-100%',
    },
  },
}

const MessageModal = () => {
  const { closeToast, isToastOpen, position, toastType, message, direction } =
    useToastStore()

  const completeButtonRef = useRef(null)
  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast()
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [isToastOpen])

  return (
    <AnimatePresence>
      {isToastOpen && (
        <motion.div
          key={toastType}
          variants={variants[direction]}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`fixed text-white w-80 z-100 h-16 rounded-md flex items-center ${positions[position]} ${toastTypes[toastType]}`}
        >
          <div className="mx-2 ml-8">
            {toastType === 'warning' && (
              <ExclamationCircleIcon className="w-6 h-6 text-snow" />
            )}
            {toastType === 'success' && (
              <div className="flex">
                <span>🎉</span>
              </div>
            )}
            {toastType === 'error' && (
              <InformationCircleIcon className="w-6 h-6 text-snow" />
            )}
          </div>

          {message && (
            <p className="mx-2 text-sm font-medium leading-6 lg:text-base">
              {message}
            </p>
          )}

          <button
            ref={completeButtonRef}
            type="button"
            className="absolute top-2 right-3"
            onClick={closeToast}
          >
            <XIcon className="w-4 h-4 text-snow" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MessageModal
