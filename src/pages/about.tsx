import { ReactElement } from 'react'

import { BasicLayout, Breadcrumbs, Container } from '@/common/components'

import { usePosts } from '@/post/hooks'
import { ChatIcon, EyeIcon, HeartIcon } from '@heroicons/react/solid'
import { SpinLoader } from '@/common/components/icon'
import { NextSeo } from 'next-seo'

const AboutPage = () => {
  const { data, isLoading, isError } = usePosts()

  return (
    <>
      <NextSeo title="About | Patrick Xin" description="About Patrick Xin" />
      <Container className="space-y-6 lg:space-y-10">
        <Breadcrumbs title="about" />
        <h5 className="text-2xl">About Me</h5>
        <p className="leading-relaxed">
          Hello, I&apos;m Patrick Xin. I&apos;m passionate about creating
          beautiful, user-friendly websites. I love sharing my knowledge about
          web development as well we building intresting web apps. My favourite
          tech stack is NextJS, TailwindCSS, Prisma, GraphQL.
        </p>
        <p className="leading-relaxed">
          This website is a continuous working project and completely
          open-source on Github, source code can be found{' '}
          <a
            className="underline decoration-orange dark:decoration-mint underline-offset-2"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/patrick-xin/patrickxin.com"
          >
            here
          </a>
          .
        </p>
        <section className="relative space-y-3">
          <h5 className="text-2xl">Site Stats</h5>

          {isError ? (
            <div className="flex flex-col gap-6 justify-center items-center my-12 text-red-600">
              Error loading Stats
            </div>
          ) : isLoading ? (
            <div className="flex overflow-hidden absolute bottom-0 justify-center items-center w-full h-full">
              <div className="flex gap-2 items-center lg:gap-4">
                <SpinLoader />
                loading stats...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="space-y-3">
                <h5>Total Views</h5>
                <div className="flex gap-2 items-center">
                  <div>
                    <EyeIcon className="w-6 h-6 text-mint dark:text-orange" />
                  </div>
                  {data.data.viewsCount}
                </div>
              </div>
              <div className="space-y-3">
                <h5>Total Likes</h5>
                <div className="flex gap-2 items-center">
                  <div>
                    <HeartIcon className="w-6 h-6 text-red-500" />
                  </div>
                  {data.data.likesCount}
                </div>
              </div>
              <div className="space-y-3">
                <h5>Total Comments</h5>
                <div className="flex gap-2 items-center">
                  <div>
                    <ChatIcon className="w-6 h-6 text-orange dark:text-mint" />
                  </div>
                  {data.data.commentsCount}
                </div>
              </div>
            </div>
          )}
        </section>
      </Container>
    </>
  )
}

export default AboutPage

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>
}
