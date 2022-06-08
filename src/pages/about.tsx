import { ReactElement } from 'react'

import { BasicLayout, Breadcrumbs, Container } from '@/common/components'

import { usePosts } from '@/post/hooks'
import { ChatIcon, EyeIcon, HeartIcon } from '@heroicons/react/solid'
import { SpinLoader } from '@/common/components/icon'
import { NextSeo } from 'next-seo'
import { getSiteAboutInfo } from '@/config/site'
import { GetStaticProps } from 'next'
import { Site } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import components from '@/post/components/mdx/mdxComponents'

type AboutPageProps = {
  siteInfo: Site
}

const AboutPage = ({ siteInfo }: AboutPageProps) => {
  const { data, isLoading, isError } = usePosts()

  const Component = useMDXComponent(siteInfo.body.code)
  return (
    <>
      <NextSeo title="About | Patrick Xin" description="About Patrick Xin" />
      <Container className="space-y-6 lg:space-y-10">
        <Breadcrumbs title="about" />
        <Component components={components} />

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
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div>
                <h5>Total Views</h5>
                <div className="flex gap-2 items-center">
                  <div>
                    <EyeIcon className="w-6 h-6 text-mint dark:text-orange" />
                  </div>
                  {data.data.viewsCount}
                </div>
              </div>
              <div>
                <h5>Total Likes</h5>
                <div className="flex gap-2 items-center">
                  <div>
                    <HeartIcon className="w-6 h-6 text-red-500" />
                  </div>
                  {data.data.likesCount}
                </div>
              </div>
              <div>
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

export const getStaticProps: GetStaticProps = () => {
  const siteInfo = getSiteAboutInfo()
  return {
    props: { siteInfo },
  }
}
