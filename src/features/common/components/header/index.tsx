import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import cn from 'classnames'

import { ThemeToggle } from '@/common/components'
import MenuButton from './MenuButton'

import { ROUTES } from '@/common/constants'
import { ease } from '@/common/animation'

interface HeaderProps {
  openDrawer(isopen: boolean): void
  isDrawerOpen: boolean
}

const Header = ({ openDrawer, isDrawerOpen }: HeaderProps) => {
  const router = useRouter()

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease }}
      className="mx-auto w-full h-16 bg-snow dark:bg-lead md:h-24"
    >
      <nav
        className="grid grid-cols-2 items-center px-8 mx-auto w-full max-w-6xl h-full
       md:px-12 lg:grid-cols-6 lg:px-32"
      >
        <div>
          <Link href="/">
            <a>
              <Image
                alt="logo-image"
                src="/assets/images/logo.svg"
                layout="fixed"
                height={32}
                width={32}
                priority
              />
            </a>
          </Link>
        </div>

        <MenuButton openDrawer={openDrawer} isDrawerOpen={isDrawerOpen} />

        <div className="hidden col-span-4 col-start-4 lg:flex">
          <ul className="flex flex-1 justify-around items-center">
            {ROUTES.map((route) => (
              <li key={route.path}>
                <Link href={`${route.path}`}>
                  <a
                    className={cn(
                      'hover:text-orange dark:hover:text-mint transition-colors ease-linear',
                      {
                        'underline underline-offset-2 decoration-orange dark:decoration-mint decoration-4':
                          route.exact === true
                            ? route.path === router.asPath
                            : router.asPath.startsWith(route.path),
                      }
                    )}
                  >
                    {route.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden ml-12 lg:block lg:mt-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
