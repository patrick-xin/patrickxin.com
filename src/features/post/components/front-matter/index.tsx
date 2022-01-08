import PostTitle from "./post-title";
import Author from "./author";
import PublishTime from "./publish-time";
import ReadingTime from "./reading-time";
import Avatar from "./avatar";
import PostViews from "./post-views";
import PostLikes from "./post-likes";
import Description from "./description";

import PostComment from "./post-comment";
import type { Frontmatter } from "../../types";

const FrontMatter = ({
  publishedAt,
  title,
  slug,
  description,
  readingTime,
}: Frontmatter) => {
  return (
    <section className="lg:py-12">
      <PostTitle title={title} />
      <div className="flex items-center justify-between md:my-4 lg:my-8">
        <div className="grid grid-cols-1 md:grid-cols-6 w-full lg:mb-12">
          <div className="flex gap-4 col-span-3 items-center w-full">
            <Avatar />
            <div className="space-y-1">
              <Author />
              <div className="flex items-center text-xs gap-1 tracking-widest italic lg:text-base">
                <PublishTime publishedAt={publishedAt} />
                <span> - </span>
                <ReadingTime readingTime={readingTime} />
              </div>
            </div>
          </div>

          <div className="col-span-3 mt-6 md:mt-0 justify-end text-sm items-center gap-4 flex">
            <PostViews postSlug={slug} />

            <div className="hidden lg:block">
              <PostLikes postSlug={slug} />
            </div>
            <div className="hidden lg:block">
              <PostComment postSlug={slug} />
            </div>
          </div>
        </div>
      </div>
      <Description description={description} />
    </section>
  );
};

export default FrontMatter;
