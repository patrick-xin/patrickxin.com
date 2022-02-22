import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUpIcon, LightningBoltIcon } from "@heroicons/react/solid";

import avatar from "../../../../public/assets/images/avatar.jpeg";

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
        <h1 className="text-2xl">Dashboard</h1>
        <Image
          alt="avatar"
          src={avatar}
          layout="fixed"
          height={50}
          width={50}
          className="rounded-full"
          priority
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
                    focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
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
                          className={cn({
                            "text-mint": !!router.asPath.endsWith("/dashboard"),
                          })}
                        >
                          <Link href="/admin/dashboard">
                            <a>overall</a>
                          </Link>
                        </motion.button>
                      </Disclosure.Panel>
                    )}
                  </AnimatePresence>
                  <AnimatePresence exitBeforeEnter>
                    {open && (
                      <Disclosure.Panel
                        as={motion.div}
                        variants={parentVariant}
                        initial="initial"
                        animate="animate"
                        className="px-8 py-2 space-y-4 flex flex-col w-full gap-2 justify-start"
                      >
                        <motion.button
                          variants={childVariant}
                          className={cn({
                            "text-mint": !!router.asPath.includes("users"),
                          })}
                        >
                          <Link href="/admin/dashboard/users">
                            <a>users</a>
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
