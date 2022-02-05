import NavLink from "./nav-link";

import type { IAdjacentPosts } from "@post/types";

type PostNavsProps = {
  adjacentPosts: IAdjacentPosts;
};

const PostNavs = ({ adjacentPosts }: PostNavsProps) => {
  if (!adjacentPosts.next && !adjacentPosts.previous) return null;
  return (
    <section className="my-12 lg:my-24 px-4 flex flex-col gap-4 max-w-5xl w-full h-24 mx-auto justify-between">
      {adjacentPosts.previous ? (
        <NavLink
          isRight={false}
          title={adjacentPosts.previous.title}
          slug={adjacentPosts.previous.slug}
        />
      ) : (
        <div className="flex-1 w-full h-full" />
      )}
      {adjacentPosts.next ? (
        <NavLink
          isRight
          title={adjacentPosts.next.title}
          slug={adjacentPosts.next.slug}
        />
      ) : (
        <div className="flex-1 w-full h-full" />
      )}
    </section>
  );
};

export default PostNavs;
