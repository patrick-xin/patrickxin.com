import { motion } from 'framer-motion'

import { gridAnimation } from '@/common/animation'
import PostCard from './PostCard'

import type { Frontmatter } from '@/post/types'
import { Breadcrumbs } from '@/common/components'

type PostCardListProps = {
  posts: Frontmatter[]
}

const PostCardList = ({ posts }: PostCardListProps) => {
  return (
    <div>
      <Breadcrumbs title="posts" />
      <motion.section
        initial="initial"
        animate="animate"
        variants={gridAnimation}
        className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </motion.section>
    </div>
  )
}

export default PostCardList
