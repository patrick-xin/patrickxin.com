import React from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/common/animation'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease, delay: 0.2 }}
      className={`${className ? className : ''} relative mx-auto max-w-prose `}
    >
      {children}
    </motion.div>
  )
}

export default Container
