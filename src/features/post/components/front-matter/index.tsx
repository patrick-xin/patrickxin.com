import { motion } from 'framer-motion'

import PostTitle from './PostTitle'
import Author from './Author'
import PublishTime from './PublishTime'
import ReadingTime from './ReadingTime'
import Avatar from './Avatar'
import Description from './Description'
import { PostStats } from '@/post/components/stats'

import { ease } from '@/common/animation'
import type { Frontmatter } from '@/post/types'

type FrontMatterProps = {
  handleScrollToComments: () => void
  frontmatter: Frontmatter
}

const FrontMatter = ({
  frontmatter,
  handleScrollToComments,
}: FrontMatterProps) => {
  const { publishedAt, title, slug, description, readingTime } = frontmatter

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease, delay: 0.2 }}
      className="lg:py-12"
    >
      <PostTitle title={title} isGradient />
      <div className="flex justify-between items-center md:my-4 lg:my-8">
        <div className="grid grid-cols-1 w-full md:grid-cols-6 lg:mb-12">
          <div className="flex col-span-3 gap-4 items-center w-full">
            <Avatar />
            <div className="space-y-1">
              <Author />
              <div className="flex gap-1 items-center text-xs italic tracking-widest lg:text-base">
                <PublishTime publishedAt={publishedAt} />
                <span> - </span>
                <ReadingTime readingTime={readingTime} />
              </div>
            </div>
          </div>

          <PostStats
            slug={slug}
            description={description}
            handleScrollToComments={handleScrollToComments}
          />
        </div>
      </div>
      <Description description={description} />
    </motion.section>
  )
}

export default FrontMatter
