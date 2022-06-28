import React from 'react'

import { Container } from '@/common/components'

type HomepageContainerProps = {
  children: React.ReactNode
}
const HomepageContainer = ({ children }: HomepageContainerProps) => {
  return (
    <Container className="lg:max-w-4xl lg:h-[50vh]">
      <section className="grid grid-cols-1 place-content-center w-full h-full lg:grid-cols-2">
        {children}
      </section>
    </Container>
  )
}

export default HomepageContainer
