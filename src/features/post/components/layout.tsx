import { useState } from "react";

import { Header, Footer, MobileDrawer } from "@common/components";

const PostLayout: React.FC = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        openDrawer={(isopen) => setDrawerOpen(isopen)}
        isDrawerOpen={isDrawerOpen}
      />

      <MobileDrawer isDrawerOpen={isDrawerOpen} />

      <main className="mx-6 md:mx-12 lg:mx-0 my-8 lg:my-16 flex-grow">
        {children}
      </main>
      <Footer hasMarginBottom />
    </div>
  );
};

export default PostLayout;
