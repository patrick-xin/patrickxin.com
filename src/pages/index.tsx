import { PostLayout } from "@post/components";

import { ReactElement } from "react";

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="flex-col gap-4 lg:flex lg:gap-10 items-center my-6">
        <h1 className="text-xl lg:text-3xl mt-4">
          Hello there! I'm Patrick Xin, a frontend developer, 🐱 lover and ☕
          addict.
        </h1>
      </section>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};
