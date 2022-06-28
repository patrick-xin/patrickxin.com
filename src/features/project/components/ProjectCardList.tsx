import { motion } from 'framer-motion'

import { gridAnimation } from '@/common/animation'
import ProjectCard from './ProjectCard'

import { Project } from '../types'

type ProjectCardListProps = {
  projects: Project[]
}

const ProjectCardList = ({ projects }: ProjectCardListProps) => {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={gridAnimation}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
    >
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </motion.section>
  )
}

export default ProjectCardList
