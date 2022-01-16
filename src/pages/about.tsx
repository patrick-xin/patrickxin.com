import { PostLayout } from "@post/components";
import { ReactElement } from "react";

const AboutPage = () => {
  return (
    <div className="space-y-6 leading-relaxed max-w-4xl mx-auto">
      <section className="space-y-6 ">
        <p>
          I have passion for creating beautiful, user-friendly websites. I
          started my coding journey shortly before the pandemic began. I
          immediately fall in love with React and NextJS. Since then, I&lsquo;ve
          learnt technology like Typescript, Prisma, GraplQL, StyledComponent,
          TailwindCSS, etc.. My goal is to become a full-stack software
          engineer.
        </p>
        <p>
          I decide to regularly write posts, sharing my daily life as well as
          web technology, you are very welcome to leave a comment or email me.
        </p>
        <p>
          This website is a continuous working project and completely
          open-source on Github, source code can be found here. Cheers!
        </p>
      </section>
    </div>
  );
};

export default AboutPage;

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};
