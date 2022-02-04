import { gridAnimation } from "@common/animation";
import { Frontmatter } from "@post/types";
import { motion } from "framer-motion";

import PostItem from "./post-item";

type PostListProps = {
  posts: Frontmatter[];
};

const PostList = ({ posts }: PostListProps) => {
  return (
    <section>
      <motion.ul
        className="w-full divide-y divide-orange/20 dark:divide-mint/20"
        initial="initial"
        animate="animate"
        variants={gridAnimation}
      >
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
      </motion.ul>
    </section>
  );
};

export default PostList;
