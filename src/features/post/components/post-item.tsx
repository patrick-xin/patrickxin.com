import Link from "next/link";
import { motion } from "framer-motion";

import PostTitle from "./front-matter/post-title";
import PublishTime from "./front-matter/publish-time";
import ReadingTime from "./front-matter/reading-time";
import type { Frontmatter } from "@/post/types";

const PostItem = ({ post }: { post: Frontmatter }) => {
  return (
    <motion.li key={post.slug} className="py-4 list-none lg:py-6 w-full ">
      <Link href={`/posts/${post.slug}`}>
        <a className="space-y-2 lg:space-y-4 group ">
          <div className="flex space-x-1 italic items-center">
            <PublishTime
              className="italic text-xs lg:text-sm"
              publishedAt={post.publishedAt}
            />
            <div>-</div>
            <ReadingTime readingTime={post.readingTime} />
          </div>
          <PostTitle
            className="group-hover:text-orange  dark:group-hover:text-mint hover:underline hover:underline-offset-2 decoration-orange dark:decoration-mint/60 transition-all ease-linear"
            title={post.title}
            size="md"
            isGradient={false}
          />
          <p className="text-sm md:text-base">{post.description}</p>
        </a>
      </Link>
    </motion.li>
  );
};

export default PostItem;
