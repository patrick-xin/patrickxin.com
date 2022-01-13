import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  HomeIcon,
  BookOpenIcon,
  BookmarkAltIcon,
  SearchIcon,
  DocumentIcon,
  LogoutIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import {
  LightBulbIcon,
  LightningBoltIcon,
  XIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import avatar from "../../../../public/assets/images/avatar.jpeg";

import { ChevronUpIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const navigation = [
  { title: "Home", icon: <HomeIcon className="dashboard-icon" />, path: "/" },
  {
    title: "Search",
    icon: <SearchIcon className="dashboard-icon" />,
    path: "/",
  },
  {
    title: "Recipes",
    icon: <DocumentIcon className="dashboard-icon" />,
    path: "/dashboard/recipes",
  },
  {
    title: "Logout",
    icon: <LogoutIcon className="dashboard-icon" />,
    path: null,
  },
  {
    title: "Feedback",
    icon: <ChatIcon className="dashboard-icon" />,
    path: null,
  },
];

interface IProps {
  setOpenNav: Dispatch<SetStateAction<boolean>>;
  openNav: boolean;
}
const parentVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};
const childVariant = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};
const SidebarNav = () => {
  const router = useRouter();

  return (
    <aside className="h-screen flex flex-col items-center px-8 col-span-2">
      <div className="flex items-center flex-col gap-6">
        <div>Dashboard</div>
        <Image
          src={avatar}
          layout="fixed"
          height={50}
          width={50}
          className="rounded-full"
        />
      </div>
      <nav className="mt-20">
        <ul className="space-y-4">
          <li className="mx-6">
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex justify-between items-center text-lg w-full
                    focus:outline-none focus-visible:ring
                    focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${
                      open
                        ? "border-l-4 border-accent transition-all ease-linear"
                        : ""
                    }`}
                  >
                    <LightningBoltIcon className="w-6 h-6 text-orange dark:text-mint" />
                    <span>Performance</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-orange dark:text-mint`}
                    />
                  </Disclosure.Button>
                  <AnimatePresence>
                    {open && (
                      <Disclosure.Panel
                        as={motion.div}
                        variants={parentVariant}
                        initial="initial"
                        animate="animate"
                        className="px-8 py-6 space-y-2 flex flex-col w-full gap-2 justify-start"
                      >
                        <motion.button
                          variants={childVariant}
                          className={cn("text-orange", {
                            "text-dark-fg-primary":
                              !!router.asPath.includes("views") ||
                              !!router.asPath.includes("comments"),
                          })}
                        >
                          <Link href="/admin/dashboard">
                            <a>Oveall</a>
                          </Link>
                        </motion.button>
                        <motion.button
                          variants={childVariant}
                          className={cn({
                            "text-orange": router.asPath.includes("views"),
                          })}
                        >
                          <Link href="/admin/dashboard/views">
                            <a>Views</a>
                          </Link>
                        </motion.button>
                        <motion.button
                          variants={childVariant}
                          className={cn({
                            "text-orange": router.asPath.includes("comments"),
                          })}
                        >
                          <Link href="/admin/dashboard/comments">
                            <a>Comments</a>
                          </Link>
                        </motion.button>
                        <motion.button
                          variants={childVariant}
                          className={cn({
                            "text-orange": router.asPath.includes("comments"),
                          })}
                        >
                          <Link href="/admin/dashboard/comments">
                            <a>Likes</a>
                          </Link>
                        </motion.button>
                        <motion.button
                          variants={childVariant}
                          className={cn({
                            "text-orange": router.asPath.includes("comments"),
                          })}
                        >
                          <Link href="/admin/dashboard/comments">
                            <a>Subscribers</a>
                          </Link>
                        </motion.button>
                      </Disclosure.Panel>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Disclosure>
          </li>
          <li className="mx-6">
            <Disclosure as="div">
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`flex w-full justify-between items-center text-lg space-x-3
                    focus:outline-none focus-visible:ring
                    focus-visible:ring-purple-500 focus-visible:ring-opacity-75 ${
                      open
                        ? "border-l-4 border-accent transition-all ease-linear"
                        : ""
                    }`}
                  >
                    <LightningBoltIcon className="w-6 h-6 text-accent dark:text-dark-accent" />
                    <span>Management</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-accent dark:text-dark-accent`}
                    />
                  </Disclosure.Button>
                  <AnimatePresence exitBeforeEnter>
                    {open && (
                      <Disclosure.Panel
                        as={motion.div}
                        variants={parentVariant}
                        initial="initial"
                        animate="animate"
                        className="px-8 py-6 space-y-4 flex flex-col w-full gap-2 justify-start"
                      >
                        <motion.button
                          variants={childVariant}
                          className={cn("text-accent", {
                            "text-dark-fg-primary":
                              !!router.asPath.includes("views") ||
                              !!router.asPath.includes("comments"),
                          })}
                        >
                          <Link href="/admin/dashboard/users">
                            <a>users</a>
                          </Link>
                        </motion.button>
                        <motion.button
                          variants={childVariant}
                          className={cn({
                            "text-accent": router.asPath.includes("views"),
                          })}
                        >
                          <Link href="/admin/dashboard/views">
                            <a>comments</a>
                          </Link>
                        </motion.button>
                      </Disclosure.Panel>
                    )}
                  </AnimatePresence>
                </>
              )}
            </Disclosure>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;

interface IIconProps {
  icon: JSX.Element;
  text?: string;
  active?: boolean;
}

const IconPopover = ({ icon, text, active }: IIconProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className={cn(
          "p-2 my-10 hover:bg-gray-100 dark:hover:bg-accent transition-colors ease-in-out rounded-lg",
          {
            "bg-gray-100 dark:bg-gray-600": active,
          }
        )}
      >
        {icon}
      </div>

      <div className="absolute -bottom-4 flex-center font-semibold rounded text-xs">
        {text}
      </div>
    </div>
  );
};
