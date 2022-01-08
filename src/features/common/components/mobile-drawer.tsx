import Link from "next/link";
import { useRouter } from "next/router";

import { AnimatePresence, motion } from "framer-motion";
import { usePreventScroll } from "@react-aria/overlays";
import cn from "classnames";

import ThemeToggle from "./header/theme-toggle";
import { ROUTES } from "@common/constants";
import { Blob, Footer } from ".";

import { ease } from "@common/animation";

interface MobileDrawerProps {
  isDrawerOpen: boolean;
}

const MobileDrawer = ({ isDrawerOpen }: MobileDrawerProps) => {
  const router = useRouter();

  usePreventScroll({ isDisabled: !isDrawerOpen });

  return (
    <AnimatePresence exitBeforeEnter>
      {isDrawerOpen && (
        <motion.div
          key={"drawer"}
          initial={{ y: 1000 }}
          animate={{ y: 0, transition: { duration: 0.6 } }}
          exit={{
            opacity: 0,
            transition: { delayChildren: 1, ease, delay: -0.2 },
          }}
          transition={{ duration: 1, ease }}
          className="fixed z-100 top-0 h-screen w-screen px-4
      flex flex-col justify-between inset-0 bg-snow dark:bg-lead"
        >
          <div className="relative h-screen mt-16 flex flex-col justify-around px-6 overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="relative h-full w-full mt-4">
                <Blob color="mint" className="absolute inset-0 top-4" />
                <div className="absolute z-50 w-48 h-48 rounded-full filter blur-xl bg-gradient-to-tl from-mint/50 to-orange/50 via-pink-900/50" />
                <Blob
                  color="orange"
                  className="absolute -inset-4 top-6 left-6"
                  isReverse
                />
              </div>

              <ul className="flex justify-around flex-col items-end h-[30vh] text-xl">
                {ROUTES.map((route) => (
                  <li key={route.path}>
                    <Link href={`${route.path}`}>
                      <a
                        className={cn({
                          "underline underline-offset-2 decoration-orange dark:decoration-mint decoration-4":
                            route.exact === true
                              ? route.path === router.asPath
                              : router.asPath.startsWith(route.path),
                        })}
                      >
                        {route.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl">Subscribe now!</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Email..."
                  className="bg-transparent appearance-none focus:outline-none w-5/6 border rounded-r-none dark:border-mint p-2 placeholder-main-gray/20"
                />
                <button
                  type="submit"
                  className="bg-transparent border rounded-r border-l-0 cursor-pointer dark:border-mint p-2 placeholder-main-gray/20"
                >
                  Subscribe
                </button>
              </form>
              <motion.div
                className="mt-5 md:mt-9 w-full flex justify-center"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDrawerOpen ? 1 : 0,
                  transition: { delay: 0.4 },
                }}
                exit={{ opacity: 0 }}
              >
                <ThemeToggle />
              </motion.div>
            </div>

            <Footer />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;