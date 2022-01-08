import { ThemeProvider } from "next-themes";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "@fontsource/dm-serif-display";
import "@fontsource/space-mono";
import "@fontsource/fira-code";
import { NextSeo } from "next-seo";

import type { NextPage } from "next";
import { ReactElement, ReactNode, useState } from "react";
import type { AppProps } from "next/app";

import { Progress, MessageModal } from "@common/components";

import "@styles/globals.css";
import siteConfig from "../../config/site";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <NextSeo
        title={`${siteConfig.details.title} - ${siteConfig.details.tagLine}`}
        description={siteConfig.details.description}
        twitter={{
          handle: siteConfig.socialLinks.twitter,
          site: siteConfig.socialLinks.twitter,
          cardType: "summary_large_image",
        }}
        openGraph={{
          url: siteConfig.details.url,
          title: siteConfig.details.title,
          description: siteConfig.details.description,
          images: [
            {
              url: `${siteConfig.details.url}${siteConfig.assets.avatar}`,
              width: 800,
              height: 600,
              alt: siteConfig.details.title,
            },
          ],
          site_name: siteConfig.details.title,
          type: "website",
          locale: "en_IE",
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider attribute="class">
            <MessageModal />
            {getLayout(<Component {...pageProps} />)}
            <Progress />
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
