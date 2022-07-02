import { BasicLayout, Container, PageHeader } from '@/common/components'
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import projectsData from '@/project/data/projects.json'
import { Project } from '@/project/types'
import ProjectCardList from '@/project/components/ProjectCardList'

const ProjectsPage = ({ projects }: { projects: Project[] }) => {
  return (
    <Container className="lg:max-w-5xl">
      <PageHeader
        className="lg:mb-4"
        title="projects"
        titleInfo="I build interesting"
        titleInfoMain="projects"
      />
      <ProjectCardList projects={projects} />
    </Container>
  )
}

export default ProjectsPage

ProjectsPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: { projects: projectsData },
  }
}
