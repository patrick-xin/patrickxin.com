import { gridAnimation } from "@common/animation";
import { Frontmatter } from "@post/types";
import { motion } from "framer-motion";

import PostItem from "./post-item";

type PostListProps = {
  posts: Frontmatter[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <section className="flex justify-center">
      <motion.ul
        initial="initial"
        animate="animate"
        variants={gridAnimation}
        className="space-y-6"
      >
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </motion.ul>
    </section>
  );
};

export default PostList;
