import { Blob } from '@/common/components'
import React from 'react'

const BlobSection = () => {
  return (
    <div className="hidden relative w-full h-full lg:block">
      <Blob color="mint" className="absolute inset-0 -top-12" />
      <div className="absolute inset-0 -top-16 -left-12 z-50 w-96 h-96 bg-gradient-to-tl from-mint/50 via-pink-900/50 to-orange/50 rounded-full blur-xl" />
      <Blob
        color="orange"
        className="absolute -inset-4 top-6 left-6"
        isReverse
      />
    </div>
  )
}

export default BlobSection
