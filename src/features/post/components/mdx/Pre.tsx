import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import cn from 'classnames'

import { ClipboardCopyIcon } from '@heroicons/react/outline'

import { copyToClipboard } from '@/utils/copyToClipboard'

type PreProps = {
  children: JSX.Element
  className: string
}

const Pre = ({ children, className, ...props }: PreProps) => {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const onClick = () => {
    copyToClipboard(preRef.current.innerText.replace(/^(&nbsp;|\s)*/, ''))
    setCopied(true)
  }
  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000)

    return () => clearTimeout(timer)
  }, [copied])

  return (
    <div className="relative -mx-6 md:mx-0 lg:my-8">
      <pre
        {...props}
        ref={preRef}
        className={cn(className, 'focus:outline-none')}
      >
        <div className="hidden absolute top-0 right-6 items-center my-4 space-x-2 lg:flex">
          <div className="relative">
            <motion.button
              type="button"
              aria-label="Copy to Clipboard"
              onClick={onClick}
              disabled={copied}
              className="inline-flex items-center"
            >
              <ClipboardCopyIcon
                className={cn('h-6 w-6', {
                  'text-orange dark:text-mint': copied,
                  'dark:text-gray-600 transition-colors ease-linear text-gray-400 hover:text-mint dark:hover:text-orange':
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
                  className="absolute top-12 left-0 -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    role="tooltip"
                    className="relative py-2 px-3 max-w-xs text-xs font-medium text-center text-white break-words bg-orange/80 dark:bg-mint/50 rounded outline-none shadow-lg"
                  >
                    <svg
                      className="absolute text-orange/80 dark:text-mint/50 fill-current"
                      style={{ transform: 'translate3D(30px, -13px, 0px)' }}
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
  )
}

export default Pre
