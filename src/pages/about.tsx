import { ReactElement } from "react";
import { motion } from "framer-motion";

import { BasicLayout, Breadcrumbs } from "@common/components";
import { ease } from "@common/animation";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease, delay: 0.2 }}
      className="space-y-6 leading-relaxed max-w-4xl mx-auto"
    >
      <Breadcrumbs title="about" />
      <section className="space-y-6">
        <p>
          I&lsquo;m passionate about creating beautiful, user-friendly websites.
          I started my coding journey shortly before the pandemic began. I
          immediately fell in love with React and NextJS. Since then, I&lsquo;ve
          learnt technologies like Typescript, Prisma, GraplQL, StyledComponent,
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
    </motion.div>
  );
};

export default AboutPage;

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <BasicLayout>{page}</BasicLayout>;
};
