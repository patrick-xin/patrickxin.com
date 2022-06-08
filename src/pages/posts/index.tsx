import { ReactElement, useState } from 'react'
import { GetStaticProps } from 'next'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

import { PostCardList, PostItemList } from '@/post/components'
import { BasicLayout, Breadcrumbs } from '@/common/components'
const PostViewOption = dynamic(
  () => import('@/post/components/PostViewOption'),
  {
    ssr: false,
  }
)

import { getSortedPostsByDate } from '@/post/lib'
import { generateRSSFeed } from '@/utils/generateRSSFeed'

import type { Post } from 'contentlayer/generated'
import { NextSeo } from 'next-seo'

const PostsPage = ({ posts }: { posts: Post[] }) => {
  const [isGridView, setGridView] = useState(true)

  return (
    <>
      <NextSeo
        title="Blog | Patrick Xin"
        description="Blog posts from Patrick Xin"
      />
      <div className="mx-auto md:max-w-4xl xl:max-w-6xl">
        <PostViewOption isGridView={isGridView} setGridView={setGridView} />
        <AnimatePresence>
          {isGridView ? (
            <PostCardList posts={posts} />
          ) : (
            <div className="mx-auto md:max-w-3xl">
              <Breadcrumbs title="posts" />
              <PostItemList posts={posts} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
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
