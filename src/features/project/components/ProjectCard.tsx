import Image from 'next/image'

import { motion } from 'framer-motion'

import { cardAnimation } from '@/common/animation'

import { Project } from '../types'
import { GithubIcon } from '@/common/components/icon'
import { LinkIcon } from '@heroicons/react/solid'

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div variants={cardAnimation} className="rounded-t-md shadow">
      <Image
        src={project.image}
        layout="responsive"
        className="rounded-md rounded-b-none"
        width={400}
        height={270}
        alt={`${project.title}-image`}
        objectFit="cover"
        priority
      />
      <div className="flex flex-col py-6 px-4 space-y-2 rounded-md rounded-t-none dark:border dark:border-t-0 border-mint/20 lg:p-4 lg:space-y-6 xl:min-h-[10rem] ">
        <h3 className="md:min-h-[2rem] lg:text-2xl text-gradient">
          {project.title}
        </h3>
        <p className="mt-2 text-sm md:min-h-[20px]">{project.description}</p>
        <div className="flex gap-4 justify-end items-center">
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            <GithubIcon className="hover:text-mint" />
          </a>
          <a href={project.website} target="_blank" rel="noreferrer">
            <LinkIcon className="hover:text-mint icon-link" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
