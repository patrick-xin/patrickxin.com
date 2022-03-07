import PostShare from '../front-matter/PostShare'
import PostCommentStats from './PostCommentStats'
import PostLikeStats from './PostLikeStats'
import PostViewsStats from './PostViewStats'

type PostStatsProps = {
  slug: string
  handleScrollToComments: () => void
  description: string
}

const PostStats = ({
  slug,
  handleScrollToComments,
  description,
}: PostStatsProps) => {
  return (
    <div className="flex col-span-3 gap-4 justify-end items-center text-sm">
      <div className="hidden lg:block">
        <PostViewsStats postSlug={slug} />
      </div>

      <div className="hidden lg:block">
        <PostLikeStats postSlug={slug} />
      </div>
      <div className="hidden lg:block">
        <PostCommentStats
          postSlug={slug}
          handleScrollToComments={handleScrollToComments}
        />
      </div>
      <div className="hidden lg:block">
        <PostShare postSlug={slug} description={description} />
      </div>
    </div>
  )
}

export default PostStats
