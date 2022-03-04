import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Breadcrumbs = ({ title }: { title: string }) => {
  const { asPath } = useRouter()

  const paths = asPath.split('/').slice(0, -1)
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      aria-label="breadcrumb"
    >
      <ul className="flex space-x-2 text-xs font-medium lg:space-x-3 lg:text-sm xl:text-base">
        {paths.map((path) => (
          <li className="flex items-center space-x-3" key={path}>
            <Link href={`${path === '' ? '/' : `/${path}`}`}>
              <a className="text-gray-800 dark:text-snow hover:underline decoration-orange dark:decoration-mint decoration-2 underline-offset-4 capitalize transition-all ease-linear">
                {path === '' ? 'home' : path}
              </a>
            </Link>
            <div
              aria-hidden="true"
              className="w-px h-2 bg-gray-400 dark:bg-gray-300 rounded-full rotate-12 lg:h-4"
            />
          </li>
        ))}
        <DisabledBreadcrumb title={title} />
      </ul>
    </motion.nav>
  )
}

export default Breadcrumbs

const DisabledBreadcrumb = ({ title }: { title: string }) => {
  return (
    <li className="flex items-center lg:space-x-3" aria-current="page">
      <span className="text-gray-400 dark:text-gray-500 capitalize">
        {title}
      </span>
    </li>
  )
}
