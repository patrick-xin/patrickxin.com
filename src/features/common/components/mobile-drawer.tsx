import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { usePreventScroll } from '@react-aria/overlays'
import cn from 'classnames'

import ThemeToggle from './theme-toggle'
import { Blob, Footer } from '.'

import { ease } from '@/common/animation'
import { ROUTES } from '@/common/constants'
import GradientLink from './gradient-link'

interface MobileDrawerProps {
  isDrawerOpen: boolean
}

const MobileDrawer = ({ isDrawerOpen }: MobileDrawerProps) => {
  const router = useRouter()
  usePreventScroll({ isDisabled: !isDrawerOpen })

  return (
    <AnimatePresence exitBeforeEnter>
      {isDrawerOpen && (
        <motion.div
          key={'drawer'}
          initial={{ y: 1000 }}
          animate={{ y: 0, transition: { duration: 0.6 } }}
          exit={{
            opacity: 0,
            transition: { delayChildren: 1, ease, delay: -0.2 },
          }}
          transition={{ duration: 1, ease }}
          className="flex fixed inset-0 top-0 z-100 flex-col justify-between
      px-4 w-screen h-screen bg-snow dark:bg-lead lg:hidden"
        >
          <div className="flex overflow-hidden relative flex-col justify-around px-6 mt-16 h-screen">
            <div className="flex justify-between items-center">
              <div className="relative mt-4 w-full h-full">
                <Blob color="mint" className="absolute inset-0 top-4" />
                <div className="absolute z-50 w-48 h-48 bg-gradient-to-tl from-mint/50 via-pink-900/50 to-orange/50 rounded-full blur-xl" />
                <Blob
                  color="orange"
                  className="absolute -inset-4 top-6 left-6"
                  isReverse
                />
              </div>

              <ul className="flex flex-col justify-around items-end h-[30vh] text-xl">
                {ROUTES.map((route) => (
                  <li key={route.path}>
                    <Link href={`${route.path}`}>
                      <a
                        className={cn({
                          'underline underline-offset-2 decoration-orange dark:decoration-mint decoration-4':
                            route.exact === true
                              ? route.path === router.asPath
                              : router.asPath.startsWith(route.path),
                        })}
                      >
                        {route.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col justify-center space-y-4 w-full text-center">
                <a
                  rel="noreferrer noopener"
                  target="_blank"
                  href="mailto:patrick.xin.dev@gmail.com"
                  className="text-orange dark:text-mint underline"
                >
                  <GradientLink text="Say Hello" />
                </a>
              </div>
              <motion.div
                className="flex justify-center mt-5 w-full md:mt-9"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDrawerOpen ? 1 : 0,
                  transition: { delay: 0.4 },
                }}
                exit={{ opacity: 0 }}
              >
                <ThemeToggle />
              </motion.div>
            </div>

            <Footer hasMarginBottom />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileDrawer
