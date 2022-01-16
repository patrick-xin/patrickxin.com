import { ClipboardListIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import PostComment from "./front-matter/post-comment";
import PostLikes from "./front-matter/post-likes";

type MobileNavProps = {
  setOpenDrawer: (openDrawer: boolean) => void;
  hasToc: boolean;
  handleScrollToComments: () => void;
};

const MobileNav = ({
  setOpenDrawer,
  hasToc = false,
  handleScrollToComments,
}: MobileNavProps) => {
  const { query } = useRouter();
  return (
    <nav className="fixed lg:hidden -mx-6 md:-mx-12 rounded-t bottom-0 w-full h-12 md:h-16 bg-powder shadow-lg border-t border-gray-300 dark:border-none dark:bg-stone-900 z-75 flex items-center">
      <ul className="flex justify-around items-center w-full">
        {hasToc && (
          <li>
            <ClipboardListIcon
              className="h-6 w-6 text-plum dark:text-grape"
              onClick={() => setOpenDrawer(true)}
            />
          </li>
        )}
        <li>
          <PostComment
            handleScrollToComments={handleScrollToComments}
            postSlug={query.slug as string}
          />
        </li>
        <li>
          <PostLikes postSlug={query.slug as string} />
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
