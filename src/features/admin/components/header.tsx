import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { ThemeToggle } from '@/common/components'
import { ADMIN_ROUTES } from '@/common/constants'
import { useLogout } from '../hooks'
import { SpinLoader } from '@/common/components/icon'

const DashboardHeader = () => {
  const { logout, isLoading } = useLogout()
  const router = useRouter()

  return (
    <header className="flex items-center mb-12 w-full h-16 md:h-24">
      <nav className="w-full">
        <ul className="flex flex-1 justify-between items-center mx-auto max-w-4xl">
          {ADMIN_ROUTES.map((route) => (
            <li key={route.path}>
              <Link href={`${route.path}`}>
                <a
                  className={cn(
                    'hover:text-orange  dark:hover:text-mint transition-colors ease-linear',
                    {
                      'underline underline-offset-2 decoration-orange dark:decoration-mint decoration-4':
                        route.exact === true
                          ? route.path === router.asPath
                          : router.asPath.endsWith(route.path),
                    }
                  )}
                >
                  {route.label}
                </a>
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <button
              className="py-2 px-1 w-20 bg-orange dark:bg-mint rounded"
              onClick={() => logout()}
            >
              {isLoading ? <SpinLoader /> : 'logout'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default DashboardHeader
