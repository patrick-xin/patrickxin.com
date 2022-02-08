import { ReactElement } from "react";
import { motion } from "framer-motion";

import { BasicLayout, Breadcrumbs } from "@/common/components";
import { ease } from "@/common/animation";
import { usePosts } from "@/post/hooks";

const AboutPage = () => {
  const { data } = usePosts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease, delay: 0.2 }}
      className="space-y-6 leading-relaxed max-w-4xl mx-auto"
    >
      <Breadcrumbs title="about" />
      <section className="space-y-6">
        <h3 className="lg:text-3xl">About Me</h3>
        <p>
          I&lsquo;m passionate about creating beautiful, user-friendly websites.
          I started my coding journey shortly before the pandemic began. I
          immediately fell in love with React and NextJS. Since then, I&lsquo;ve
          learnt technologies like Typescript, Prisma, GraphQL, StyledComponent,
          TailwindCSS, etc.. My goal is to become a full-stack software engineer
          and have my own start-up!.
        </p>
        <p>
          I&lsquo;ve decide to regularly write posts, sharing my daily life as
          well as web technology, you are very welcome to leave a comment or
          email me.
        </p>
        <p>
          This website is a continuous working project and completely
          open-source on Github, source code can be found here. Cheers!
        </p>
      </section>

      {data && (
        <section className="space-y-4">
          <h3 className="lg:text-2xl">Site Stats</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div>
              <h5>Total Views</h5>
              <div>{data.data.viewsCount}</div>
            </div>
            <div>
              <h5>Total Likes</h5>
              <div>{data.data.likesCount}</div>
            </div>
            <div>
              <h5>Total Comments</h5>
              <div>{data.data.commentsCount}</div>
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default AboutPage;

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
