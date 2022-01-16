import { useRouter } from "next/router";
import { useEffect } from "react";

export const useCloseDrawer = (cb: () => void) => {
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
