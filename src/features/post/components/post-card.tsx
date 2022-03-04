import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

import PostTitle from './front-matter/post-title'
import PublishTime from './front-matter/publish-time'

import { cardAnimation } from '@/common/animation'

import type { Frontmatter } from '@/post/types'

const PostCard = ({ post }: { post: Frontmatter }) => {
  return (
    <motion.div variants={cardAnimation} className="group rounded-t-md shadow">
      <Link href={`/posts/${post.slug}`}>
        <a>
          <Image
            src={post.thumbnail.url}
            layout="responsive"
            className="rounded-md rounded-b-none"
            width={400}
            height={270}
            alt={`${post.title}-image`}
            objectFit="cover"
            priority
          />
          <div className="flex flex-col py-6 px-4 space-y-2 rounded-md rounded-t-none dark:border dark:border-t-0 border-mint/20 lg:p-4 lg:space-y-6 xl:min-h-[16rem] ">
            <div className="space-y-1">
              <PublishTime
                className="text-sm italic"
                publishedAt={post.publishedAt}
              />
              <PostTitle
                className="group-hover:underline decoration-orange dark:decoration-mint/60 group-hover:underline-offset-2 transition-all ease-linear md:min-h-[6rem]"
                title={post.title}
                size="sm"
                isGradient={false}
              />
            </div>
            <p className="mt-2 text-sm md:min-h-[40px]">{post.description}</p>
          </div>
        </a>
      </Link>
    </motion.div>
  )
}

export default PostCard
