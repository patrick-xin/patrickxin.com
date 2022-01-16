import { ReactElement, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import { useMDXComponent } from "next-contentlayer/hooks";
import components from "@post/components/mdx/mdxComponents";

import {
  FrontMatter,
  GoBackButton,
  PostComments,
  PostNavs,
  ScrollToTop,
  TableOfContent,
  PostLayout,
} from "@post/components";

import { getAdjacentPosts, getAllPostsPaths, getPost } from "@post/lib";

import siteConfig from "../../../config/site";

const MobileNav = dynamic(() => import("@post/components/mobil-nav"));

const PostPage = ({
  post,
  adjacentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const Component = useMDXComponent(post.body.code);
  const [isTocOpen, setTocOpen] = useState(false);
  const frontmatter = {
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    title: post.title,
    slug: post.slug,
    description: post.description,
    readingTime: post.readingTime,
    toc: post.toc,
    thumbnail: post.thumbnail,
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const ref = useRef(null);
  function handleScrollToComments() {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const createPost = async () => {
      await fetch(`/api/post/${post.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: post.slug,
        }),
      });
    };

    createPost();
  }, [post.slug]);
  return (
    <motion.div
      initial={{ marginLeft: 0 }}
      animate={{
        marginLeft: isTocOpen && !isTabletOrMobile ? "20rem" : 0,
      }}
      transition={{ type: "tween" }}
    >
      <NextSeo
        title={`${post.title}`}
        description={post.description}
        openGraph={{
          url: `${siteConfig.details.url}`,
          title: `${post.title}`,
          description: post.description,
          images: [
            {
              url: `https://cover-images.vercel.app/api?postTitle=${post.title}&postDescription=${post.description}&backgroundColor=1a202c&foregroundColor=fff&authorAvatar=${siteConfig.details.url}${siteConfig.assets.favicon}&authorName=${siteConfig.details.title}`,
              width: 1200,
              height: 675,
              alt: post.title,
            },
          ],
          site_name: siteConfig.details.title,
          type: "article",
          locale: "en_IE",
        }}
      />
      <div className="max-w-4xl mx-auto">
        <TableOfContent
          hasToc={frontmatter.toc}
          isTocOpen={isTocOpen}
          setTocOpen={setTocOpen}
        />
        <ScrollToTop isFixed top={1000} />
        <GoBackButton path="/posts" title="posts" />
        <FrontMatter
          frontmatter={frontmatter}
          handleScrollToComments={handleScrollToComments}
        />
        <Component components={components} />
        <PostComments slug={frontmatter.slug} ref={ref} />
        <PostNavs adjacentPosts={adjacentPosts} />
        <MobileNav
          handleScrollToComments={handleScrollToComments}
          hasToc={frontmatter.toc}
          setOpenDrawer={(openDrawer) => setTocOpen(openDrawer)}
        />
      </div>
    </motion.div>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const paths = getAllPostsPaths();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const post = getPost(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }
  const adjacentPosts = getAdjacentPosts(slug);

  return { props: { post, adjacentPosts } };
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};
