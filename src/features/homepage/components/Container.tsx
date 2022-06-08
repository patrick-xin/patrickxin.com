import React from 'react'

import { Container } from '@/common/components'

type HomepageContainerProps = {
  children: React.ReactNode
}
const HomepageContainer = ({ children }: HomepageContainerProps) => {
  return (
    <Container className="lg:h-[50vh]">
      <section className="grid grid-cols-1 place-content-center h-full lg:grid-cols-2">
        {children}
      </section>
    </Container>
  )
}

export default HomepageContainer
