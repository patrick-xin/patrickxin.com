import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import PostTitle from "./front-matter/post-title";
import PublishTime from "./front-matter/publish-time";

import { cardAnimation } from "@common/animation";
import type { Frontmatter } from "@post/types";

const PostCard = ({ post }: { post: Frontmatter }) => {
  return (
    <motion.div variants={cardAnimation} className="rounded-t-md group shadow">
      <Link href={`/posts/${post.slug}`}>
        <a>
          <Image
            src={post.thumbnail.url}
            layout="responsive"
            className="rounded-md"
            width={400}
            height={270}
            alt={`${post.title}-image`}
            objectFit="cover"
          />
          <div className="space-y-4 px-4 py-6 lg:p-4 xl:min-h-[16rem] flex flex-col justify-between rounded-md dark:border dark:border-t-0 border-mint/20 ">
            <PublishTime
              className="italic text-sm"
              publishedAt={post.publishedAt}
            />
            <PostTitle
              className="group-hover:text-orange md:min-h-[4rem] dark:group-hover:text-mint group-hover:underline group-hover:underline-offset-2 decoration-orange dark:decoration-mint/60 transition-all ease-linear"
              title={post.title}
              size="sm"
              isGradient={false}
            />
            <p className="text-sm md:min-h-[40px]">{post.description}</p>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};

export default PostCard;
