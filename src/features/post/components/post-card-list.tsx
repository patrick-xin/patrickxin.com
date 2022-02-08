import { motion } from "framer-motion";

import { gridAnimation } from "@/common/animation";
import PostCard from "./post-card";

import type { Frontmatter } from "@/post/types";

type PostCardListProps = {
  posts: Frontmatter[];
};

const PostCardList = ({ posts }: PostCardListProps) => {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={gridAnimation}
      className="grid grid-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </motion.section>
  );
};

export default PostCardList;
