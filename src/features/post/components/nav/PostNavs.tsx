import NavLink from './NavLink'

import type { IAdjacentPosts } from '@/post/types'

type PostNavsProps = {
  adjacentPosts: IAdjacentPosts
}

const PostNavs = ({ adjacentPosts }: PostNavsProps) => {
  if (!adjacentPosts.next && !adjacentPosts.previous) return null
  return (
    <section className="flex flex-col gap-4 justify-between px-4 my-12 mx-auto w-full max-w-5xl h-24 lg:my-24">
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
  )
}

export default PostNavs
