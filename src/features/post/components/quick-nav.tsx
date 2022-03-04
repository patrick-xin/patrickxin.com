import { useState, useEffect, useMemo } from 'react'
import cn from 'classnames'

import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive'

type QuickNavProps = {
  setOpenDrawer?: () => void
}
const QuickNav = ({ setOpenDrawer }: QuickNavProps) => {
  const [headings, setHeadings] = useState<HTMLHeadingElement[]>([])
  const router = useRouter()
  const [hash, setHash] = useState(router.asPath.split('#')[1] || '')
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll('[data-heading]')
    )
    setHeadings(headingElements)
    return () => {
      setHeadings([])
    }
  }, [])
  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      setHash(url.split('#')[1])
      if (setOpenDrawer) {
        if (!isTabletOrMobile) return
        setOpenDrawer()
      }
    }
    router.events.on('hashChangeStart', onHashChangeStart)
    return () => {
      router.events.off('hashChangeStart', onHashChangeStart)
    }
  }, [router.events, isTabletOrMobile])

  const getLevel = useMemo(() => {
    return (nodeName: string) => {
      return Number(nodeName.replace('H', ''))
    }
  }, [])
  const mapHeadings = () => {
    return headings.map((heading) => {
      return (
        <Link href={`#${heading.id}`} key={heading.id} passHref>
          <motion.a
            className={cn(
              'relative hover:text-orange dark:hover:text-mint transition-colors ease-linear cursor-pointer',
              {
                'underline underline-offset-2 text-orange decoration-orange dark:text-mint dark:decoration-mint':
                  hash === heading.id,
                'text-base lg:text-lg': getLevel(heading.nodeName) === 2,
                'ml-3 lg:ml-6 text-xs lg:text-sm':
                  getLevel(heading.nodeName) === 3,
              }
            )}
          >
            {heading.innerText}
          </motion.a>
        </Link>
      )
    })
  }

  return (
    <aside className="py-6 md:my-16 lg:my-20">
      <nav className="flex flex-col">
        <h2
          className={cn('mb-6 w-full inline-flex justify-center gap-2', {
            'underline underline-offset-2 text-orange decoration-orange dark:text-mint dark:decoration-mint':
              !hash,
          })}
        >
          Table of Contents
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col mx-auto space-y-2 md:space-y-4"
        >
          {mapHeadings()}
        </motion.div>
      </nav>
    </aside>
  )
}

export default QuickNav
