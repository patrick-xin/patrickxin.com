import { useState } from 'react'

import { Header, Footer, MobileDrawer } from '@/common/components'

const PostLayout: React.FC = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        openDrawer={(isopen) => setDrawerOpen(isopen)}
        isDrawerOpen={isDrawerOpen}
      />

      <MobileDrawer isDrawerOpen={isDrawerOpen} />

      <main className="grow my-8 mx-6 md:mx-12 lg:my-16 lg:mx-0">
        {children}
      </main>
      <Footer hasMarginBottom />
    </div>
  )
}

export default PostLayout
