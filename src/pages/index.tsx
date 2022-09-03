import { ReactElement } from 'react'

import { BasicLayout } from '@/common/components'
import { PostItem } from '@/post/components'

import { getMostRecentPost } from '@/post/lib'

import type { GetStaticProps } from 'next'
import type { Post } from 'contentlayer/generated'
import {
  BlobSection,
  HomepageContainer,
} from 'src/features/homepage/components'

const HomePage = ({ post }: { post: Post }) => {
  return (
    <HomepageContainer>
      <BlobSection />
      <div className="relative">
        <div className="font-heading text-xl tracking-wider leading-loose lg:text-3xl lg:leading-[3rem]">
          Hey, I&#39;m
        </div>
        <h1 className="text-3xl font-bold lg:my-4 lg:text-6xl text-gradient">
          Patrick Xin
        </h1>
        <p className="font-heading text-xl tracking-wider leading-loose lg:text-3xl lg:leading-[3rem]">
          I am a passionate Software Engineer, specialised in front-end
          development using React and TypeScript. I love creating beautiful
          websites and interesting web apps.
        </p>
      </div>
      <div className="my-24 lg:hidden">
        <h2 className="text-xl text-gradient">Latest Post</h2>
        <ul>
          <PostItem post={post} />
        </ul>
      </div>
    </HomepageContainer>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  const post = getMostRecentPost()

  return { props: { post } }
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}
