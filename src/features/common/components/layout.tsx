import { useState } from "react";

import { Header, Footer } from "@/common/components";
import MobileDrawer from "./mobile-drawer";

const BasicLayout: React.FC = ({ children }) => {
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        openDrawer={(isopen) => setDrawerOpen(isopen)}
        isDrawerOpen={isDrawerOpen}
      />
      <MobileDrawer isDrawerOpen={isDrawerOpen} />

      <main className="mx-6 md:mx-12 lg:mx-0 mt-8 mb-12 lg:my-16 flex-grow">
        {children}
      </main>
      <Footer hasMarginBottom={false} />
    </div>
  );
};

export default BasicLayout;
