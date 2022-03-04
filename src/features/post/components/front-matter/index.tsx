import { motion } from 'framer-motion'

import PostTitle from './post-title'
import Author from './author'
import PublishTime from './publish-time'
import ReadingTime from './reading-time'
import Avatar from './avatar'
import Description from './description'
import PostViews from './post-views'
import PostLikes from './post-likes'
import PostComment from './post-comment'
import PostShare from './post-share'

import type { Frontmatter } from '../../types'
import { ease } from '@/common/animation'

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

          <div className="flex col-span-3 gap-4 justify-end items-center text-sm">
            <div className="hidden lg:block">
              <PostViews postSlug={slug} />
            </div>

            <div className="hidden lg:block">
              <PostLikes postSlug={slug} />
            </div>
            <div className="hidden lg:block">
              <PostComment
                postSlug={slug}
                handleScrollToComments={handleScrollToComments}
              />
            </div>
            <div className="hidden lg:block">
              <PostShare postSlug={slug} description={description} />
            </div>
          </div>
        </div>
      </div>
      <Description description={description} />
    </motion.section>
  )
}

export default FrontMatter
