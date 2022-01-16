import { PostLayout } from "@post/components";

import { ReactElement } from "react";

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto relative">
      <section className="flex-col gap-4 lg:flex lg:gap-10 items-center my-6">
        <h1 className="text-xl lg:text-3xl mt-4">
          Hello there! I&lsquo;m Patrick Xin, a frontend developer, 🐱 lover and
          ☕ addict.
        </h1>
        {/* <div className="flex absolute top-1/2">
          <div className="filter blur-md bg-mint/20 h-72 w-72 rounded-full -mx-12" />
          <div className="filter blur-md bg-pink-400/20 h-72 w-72 rounded-full" />
          <div className="filter blur-md bg-indigo-400/20 h-72 w-72 rounded-full" />
        </div> */}
      </section>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <PostLayout>{page}</PostLayout>;
};
