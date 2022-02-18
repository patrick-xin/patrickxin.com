import { ReactElement } from "react";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";

import { BasicLayout, Blob } from "@/common/components";
import { PostItem } from "@/post/components";
import { ease } from "@/common/animation";

import { getMostRecentPost } from "@/post/lib";

import { Post } from ".contentlayer/types";

const HomePage = ({ post }: { post: Post }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease, delay: 0.2 }}
      className="max-w-4xl mx-auto relative lg:h-[50vh]"
    >
      <section className="grid h-full grid-cols-1 lg:grid-cols-2 place-content-center">
        <div className="relative h-full w-full hidden lg:block">
          <Blob color="mint" className="absolute inset-0 -top-12" />
          <div className="absolute inset-0 -top-16 z-50 -left-12 w-96 h-96 rounded-full filter blur-xl bg-gradient-to-tl from-mint/50 to-orange/50 via-pink-900/50" />
          <Blob
            color="orange"
            className="absolute -inset-4 top-6 left-6"
            isReverse
          />
        </div>
        <div className="relative">
          <div className="text-xl font-heading tracking-wider lg:text-3xl leading-loose lg:leading-[3rem]">
            Hi there! I&lsquo;m
          </div>
          <h1 className="text-3xl lg:text-6xl lg:my-4 font-bold text-gradient">
            Patrick Xin
          </h1>
          <p className="text-xl font-heading tracking-wider lg:text-3xl leading-loose lg:leading-[3rem]">
            a frontend developer, who loves creating beautiful websites and
            interesting web apps.
          </p>
        </div>
        <div className="my-24 lg:hidden">
          <h2 className="text-xl text-gradient">Latest Post</h2>
          <ul>
            <PostItem post={post} />
          </ul>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const post = getMostRecentPost();

  return { props: { post } };
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
