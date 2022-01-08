import Link from "next/link";
import { motion } from "framer-motion";

import PostTitle from "./front-matter/post-title";
import PublishTime from "./front-matter/publish-time";

import type { Frontmatter } from "@post/types";

const PostItem = ({ post }: { post: Frontmatter }) => {
  return (
    <motion.li key={post.slug}>
      <Link href={`/posts/${post.slug}`}>
        <a>
          <PublishTime
            className="italic text-sm tracking-wider"
            publishedAt={post.publishedAt}
          />
          <PostTitle
            className="hover:text-orange tracking-widest dark:hover:text-mint hover:underline hover:underline-offset-2 decoration-orange dark:decoration-mint/60 transition-all ease-linear"
            title={post.title}
            size="sm"
            isGradient={false}
          />
        </a>
      </Link>
    </motion.li>
  );
};

export default PostItem;
