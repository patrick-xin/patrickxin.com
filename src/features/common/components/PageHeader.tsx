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
      <div className="flex gap-4 items-center">
        <div className="w-2 h-2 bg-orange dark:bg-mint rounded-full animate-pulse" />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="my-6 text-xl text-center capitalize lg:text-3xl"
        >
          <span className="inline-block">{titleInfo}</span>
          <span className="inline-block ml-2 text-gradient-reversed">
            {titleInfoMain}
          </span>
        </motion.h1>
      </div>

      {children}
    </div>
  )
}

export default PageHeader
