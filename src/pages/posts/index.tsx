import { ReactElement, useState } from 'react'
import { GetStaticProps } from 'next'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

import { PostCardList, PostItemList } from '@/post/components'
import { BasicLayout, Breadcrumbs } from '@/common/components'
const PostViewOption = dynamic(() => import('@/post/components/view-option'), {
  ssr: false,
})
import { getSortedPostsByDate } from '@/post/lib'
import type { Post } from '.contentlayer/types'
import { generateRSSFeed } from '@/utils/generateRSSFeed'

const PostsPage = ({ posts }: { posts: Post[] }) => {
  const [isGridView, setGridView] = useState(false)

  return (
    <div className="mx-auto md:max-w-4xl xl:max-w-6xl">
      <Breadcrumbs title="posts" />
      <PostViewOption isGridView={isGridView} setGridView={setGridView} />
      <AnimatePresence exitBeforeEnter>
        {isGridView ? (
          <PostCardList posts={posts} />
        ) : (
          <PostItemList posts={posts} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default PostsPage

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsByDate()
  generateRSSFeed(posts)
  return { props: { posts } }
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}
