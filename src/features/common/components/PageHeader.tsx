import React from 'react'
import Breadcrumbs from './Breadcrumbs'
import { motion } from 'framer-motion'

type PageHeaderProps = {
  title: string
  children?: React.ReactNode
  titleInfo: string
  titleInfoMain: string
  className?: string
}

const PageHeader = ({
  title,
  children,
  titleInfo,
  titleInfoMain,
  className,
}: PageHeaderProps) => {
  return (
    <div className={`${className ? className : ''}`}>
      <div className="flex justify-between w-full">
        <Breadcrumbs title={title} />
      </div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="inline-flex gap-4 justify-around items-center my-6 text-3xl text-center"
      >
        <span className="inline-block w-2 h-2 bg-orange dark:bg-mint rounded-full animate-pulse" />
        <span>
          {titleInfo}
          <span className="before:block inline-block before:absolute relative before:inset-y-6 before:inset-x-0 ml-2 before:w-full before:h-3 before:bg-pink-500/70 before:-skew-y-2">
            <span className="relative text-gradient">{titleInfoMain}</span>
          </span>
        </span>
      </motion.h1>
      {children}
    </div>
  )
}

export default PageHeader
