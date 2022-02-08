import { useEffect } from "react";
import { useRouter } from "next/router";

const useCloseDrawer = (cb: () => void) => {
  const router = useRouter();

  useEffect(() => {
    const onRouteChangeStart = () => {
      cb();
    };

    router.events.on("routeChangeStart", onRouteChangeStart);
    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
    };
  }, [router.events]);
};

export default useCloseDrawer;
