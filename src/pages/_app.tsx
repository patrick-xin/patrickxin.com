import { ReactElement, ReactNode, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import { ReactQueryDevtools } from 'react-query/devtools'

import '@fontsource/dm-serif-display'
import '@fontsource/space-mono'
import '@fontsource/fira-code'

import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { Progress } from '@/common/components'
const MessageModal = dynamic(
  () => import('@/common/components/message-modal'),
  {
    ssr: false,
  }
)

import '@/styles/globals.css'
import siteConfig from '@/config/site'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <NextSeo
        title={`${siteConfig.details.title} - ${siteConfig.details.tagLine}`}
        description={siteConfig.details.description}
        twitter={{
          handle: siteConfig.socialLinks.twitter,
          site: siteConfig.socialLinks.twitter,
          cardType: 'summary_large_image',
        }}
        openGraph={{
          url: siteConfig.details.url,
          title: siteConfig.details.title,
          description: siteConfig.details.description,
          images: [
            {
              url: `${siteConfig.details.url}${siteConfig.assets.image}`,
              width: 800,
              height: 600,
              alt: siteConfig.details.title,
              type: 'image/jpg',
            },
          ],
          site_name: siteConfig.details.title,
          type: 'website',
          locale: 'en_IE',
        }}
      />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
            {getLayout(<Component {...pageProps} />)}
            <Progress />
            <MessageModal />
          </ThemeProvider>
          <ReactQueryDevtools />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
