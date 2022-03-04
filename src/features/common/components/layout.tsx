import { useState } from 'react'
import dynamic from 'next/dynamic'
const MobileDrawer = dynamic(() => import('./mobile-drawer'), {
  ssr: false,
})
import { Header, Footer } from '@/common/components'

const BasicLayout: React.FC = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        openDrawer={(isopen) => setDrawerOpen(isopen)}
        isDrawerOpen={isDrawerOpen}
      />
      <MobileDrawer isDrawerOpen={isDrawerOpen} />

      <main className="grow mx-6 mt-8 mb-12 md:mx-12 lg:my-16 lg:mx-0">
        {children}
      </main>
      <Footer hasMarginBottom={false} />
    </div>
  )
}

export default BasicLayout
