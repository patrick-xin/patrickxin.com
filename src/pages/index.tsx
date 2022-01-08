import { ReactElement, useState } from "react";
import { GetStaticProps } from "next";
import { AnimatePresence } from "framer-motion";

import {
  PostCardList,
  PostItemList,
  PostLayout,
  PostViewOption,
} from "@post/components";

import { getSortedPostsByDate } from "@post/lib";
import type { Post } from ".contentlayer/types";

const PostsPage = ({ posts }: { posts: Post[] }) => {
  const [isGridView, setGridView] = useState(false);
  return (
    <div className="max-w-6xl mx-auto">
      <PostViewOption isGridView={isGridView} setGridView={setGridView} />
      <AnimatePresence exitBeforeEnter>
        {isGridView ? (
          <PostCardList posts={posts} />
        ) : (
          <PostItemList posts={posts} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsByDate();

  return { props: { posts } };
};

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};
