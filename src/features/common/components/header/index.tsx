import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import cn from "classnames";

import ThemeToggle from "./theme-toggle";
import MenuButton from "./menu-button";

import { ROUTES } from "@common/constants";

interface HeaderProps {
  openDrawer(isopen: boolean): void;
  isDrawerOpen: boolean;
}

const Header = ({ openDrawer, isDrawerOpen }: HeaderProps) => {
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "linear" }}
      className="h-16 md:h-24 w-full mx-auto shadow-sm bg-snow dark:bg-lead"
    >
      <nav
        className="grid grid-cols-2 max-w-6xl mx-auto lg:grid-cols-6 items-center h-full w-full
       px-8 md:px-12 lg:px-24"
      >
        <div>
          <Link href="/">
            <a>
              <Image
                alt="logo-image"
                src="/assets/images/logo.svg"
                layout="fixed"
                height={40}
                width={40}
              />
            </a>
          </Link>
        </div>

        <MenuButton openDrawer={openDrawer} isDrawerOpen={isDrawerOpen} />

        <div className="col-start-4 col-span-4 hidden lg:flex">
          <ul className="flex justify-around items-center flex-1">
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
          <div className="hidden lg:block ml-12 lg:mt-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
