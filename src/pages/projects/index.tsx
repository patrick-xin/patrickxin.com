import { BasicLayout, Container } from '@/common/components'
import React, { ReactElement } from 'react'

const ProjectsPage = () => {
  return <Container>Coming soon...</Container>
}

export default ProjectsPage

ProjectsPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}
