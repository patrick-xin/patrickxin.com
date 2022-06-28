import { ReactElement, useState } from 'react'
import { GetStaticProps } from 'next'

import { PostItemList } from '@/post/components'
import { BasicLayout, Container, PageHeader } from '@/common/components'

import { getSortedPostsByDate } from '@/post/lib'
import { generateRSSFeed } from '@/utils/generateRSSFeed'

import type { Post } from 'contentlayer/generated'
import { NextSeo } from 'next-seo'

const PostsPage = ({ posts }: { posts: Post[] }) => {
  const [search, setSearch] = useState('')
  //const [result, setResult] = useState(posts)
  const result = posts.filter((p) =>
    p.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  )
  return (
    <>
      <NextSeo
        title="Blog | Patrick Xin"
        description="Blog posts from Patrick Xin"
      />
      <Container>
        <PageHeader
          title="posts"
          titleInfo="I write things about"
          titleInfoMain="React"
        >
          <div className="w-72 lg:my-4">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)

                //setResult(result)
              }}
              type="text"
              placeholder="Search title..."
              className="w-72 form-input"
            />
          </div>
        </PageHeader>
        <PostItemList posts={result} />
      </Container>
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
