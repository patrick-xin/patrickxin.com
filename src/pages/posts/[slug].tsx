import { ReactElement, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { motion } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { useMutation, useQueryClient } from 'react-query'

import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '@/post/components/mdx/mdxComponents'

import {
  FrontMatter,
  GoBackButton,
  PostComments,
  PostNavs,
  PostLayout,
  PostThumbnail,
} from '@/post/components'
import { Breadcrumbs } from '@/common/components'
const TableOfContent = dynamic(() => import('@/post/components/toc'), {
  ssr: false,
})
const MobileNav = dynamic(() => import('@/post/components/MobileNav'), {
  ssr: false,
})
const ScrollToTop = dynamic(() => import('@/post/components/ScrollTop'), {
  ssr: false,
})
const MessageModal = dynamic(() => import('@/common/components/MessageModal'), {
  ssr: false,
})

import { getAdjacentPosts, getAllPostsPaths, getPost } from '@/post/lib'
import siteConfig from '@/config/site'
import { ease } from '@/common/animation'

import type { IAdjacentPosts, IPost } from '@/post/types'
import { PostLikeStats } from '@/post/components/stats'
import PostShare from '@/post/components/front-matter/PostShare'

type PostPageProps = {
  adjacentPosts: IAdjacentPosts
  post: IPost
}

const PostPage = ({ post, adjacentPosts }: PostPageProps) => {
  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    (slug: string) => {
      return fetch(`/api/post/${slug}/views`, {
        method: 'POST',
      })
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(['post', post.slug])
      },
    }
  )

  const Component = useMDXComponent(post.body.code)
  const [isTocOpen, setTocOpen] = useState(false)
  const frontmatter = {
    publishedAt: post.publishedAt,
    title: post.title,
    slug: post.slug,
    description: post.description,
    readingTime: post.readingTime,
    toc: post.toc,
    thumbnail: post.thumbnail,
  }
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })
  const ref = useRef(null)

  function handleScrollToComments() {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return
    const createPost = async () => {
      await fetch(`/api/post/${post.slug}`, {
        method: 'POST',
      })
    }

    createPost()
  }, [post.slug])
  useEffect(() => {
    mutate(post.slug)
    // eslint-disable-next-line
  }, [post.slug])

  return (
    <motion.div
      initial={{ marginLeft: 0 }}
      animate={{
        marginLeft: isTocOpen && !isTabletOrMobile ? '24rem' : 0,
      }}
      transition={{ type: 'tween' }}
    >
      <NextSeo
        title={`${post.title} | ${siteConfig.details.author}`}
        description={post.description}
        openGraph={{
          url: `${siteConfig.details.url}`,
          title: `${post.title}`,
          description: post.description,
          images: [
            {
              url: `https://www.patrickxin.com/assets/images/${post.slug}/cover.jpg`,
              width: 1200,
              height: 675,
              alt: post.title,
            },
          ],
          site_name: siteConfig.details.title,
          type: 'article',
          locale: 'en_IE',
        }}
      />
      <div className="mx-auto lg:max-w-prose">
        <MessageModal />
        <TableOfContent
          hasToc={frontmatter.toc}
          isTocOpen={isTocOpen}
          setTocOpen={setTocOpen}
        />
        <ScrollToTop isFixed top={1000} />
        <Breadcrumbs title={post.title} />
        <FrontMatter
          frontmatter={frontmatter}
          handleScrollToComments={handleScrollToComments}
        />

        <PostThumbnail
          title={post.title}
          imageUrl={post.thumbnail.url}
          author={post.thumbnail.author}
          fromUrl={post.thumbnail.from}
        />
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease, delay: 0.3 }}
        >
          <Component components={components} />
        </motion.article>
        <div className="hidden gap-4 items-center my-12 lg:flex">
          <h4 className="font-heading text-xl tracking-wider text-mint dark:text-orange md:text-2xl">
            Is this post helpful?
          </h4>
          <PostLikeStats postSlug={frontmatter.slug} />
          <PostShare
            postSlug={frontmatter.slug}
            description={frontmatter.description}
          />
        </div>
        <PostComments slug={frontmatter.slug} ref={ref} />
        <GoBackButton path="/posts" title="Go back to posts" />
        <PostNavs adjacentPosts={adjacentPosts} />
        <MobileNav
          handleScrollToComments={handleScrollToComments}
          hasToc={frontmatter.toc}
          setOpenDrawer={(openDrawer) => setTocOpen(openDrawer)}
        />
      </div>
    </motion.div>
  )
}

export default PostPage

export async function getStaticPaths() {
  const paths = getAllPostsPaths()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string
  const post = getPost(slug)

  if (!post) {
    return {
      notFound: true,
    }
  }
  const adjacentPosts = getAdjacentPosts(slug)

  return { props: { post, adjacentPosts } }
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <PostLayout>{page}</PostLayout>
}
