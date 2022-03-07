import Link from 'next/link'
import { motion } from 'framer-motion'

import PostTitle from './front-matter/PostTitle'
import PublishTime from './front-matter/PublishTime'
import ReadingTime from './front-matter/ReadingTime'

import type { Frontmatter } from '@/post/types'

const PostItem = ({ post }: { post: Frontmatter }) => {
  return (
    <motion.li key={post.slug} className="py-4 w-full list-none lg:py-6 ">
      <Link href={`/posts/${post.slug}`}>
        <a className="group space-y-2 lg:space-y-4 ">
          <div className="flex items-center space-x-1 italic">
            <PublishTime
              className="text-xs italic lg:text-sm"
              publishedAt={post.publishedAt}
            />
            <div>-</div>
            <ReadingTime readingTime={post.readingTime} />
          </div>
          <PostTitle
            className="group-hover:underline decoration-orange dark:decoration-mint/60 group-hover:underline-offset-2 transition-all ease-linear"
            title={post.title}
            size="md"
            isGradient={false}
          />
          <p className="text-sm md:text-base">{post.description}</p>
        </a>
      </Link>
    </motion.li>
  )
}

export default PostItem
