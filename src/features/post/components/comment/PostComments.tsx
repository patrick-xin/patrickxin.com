import { forwardRef } from 'react'
import Avatar from 'boring-avatars'

import CommentBox from './CommentBox'
import CommentForm from './CommentForm'
import { SpinLoader } from '@/common/components/icon'

import { usePostComments } from '@/post/hooks'

type PostCommentsProps = {
  slug: string
  children?: React.ReactNode
}

const PostComments = forwardRef<HTMLHeadingElement, PostCommentsProps>(
  function PostComments({ slug }, ref) {
    const { comments, isLoadingComments, isError } = usePostComments(slug)

    if (isLoadingComments) {
      return (
        <div className="flex flex-col gap-6 justify-center items-center my-12">
          <SpinLoader />
          <div>Loading comments...</div>
        </div>
      )
    }
    if (isError) {
      return (
        <div className="flex flex-col gap-6 justify-center items-center my-12 text-red-600">
          Error loading comments
        </div>
      )
    }
    return (
      <section className="my-12 mx-auto max-w-4xl lg:my-20">
        <div className="space-y-6 md:space-y-8">
          <h3
            className="font-heading text-xl tracking-wider md:text-2xl lg:text-3xl"
            ref={ref}
          >
            Comments ({comments.length})
          </h3>
          {comments &&
            comments.map((comment) => (
              <div
                key={comment.id}
                className="p-2 rounded-md border dark:border-mint/30 shadow lg:p-4 border-opacity/50"
              >
                <div className="flex gap-4">
                  <div className="mt-0.5">
                    <Avatar
                      size={30}
                      name={comment.user.email}
                      variant="beam"
                    />
                  </div>
                  <div className="flex relative flex-col gap-2 w-full rounded-md">
                    <CommentBox
                      username={comment.user.username}
                      createdAt={comment.createdAt}
                      isAdmin={false}
                    />

                    <p className="p-2 text-sm leading-6 lg:text-base lg:leading-8">
                      {comment.content}
                    </p>
                    {comment.reply && (
                      <div className="my-2 -ml-4 lg:my-6 lg:ml-10">
                        <CommentBox
                          username={comment.reply.to}
                          createdAt={comment.reply.createdAt}
                          by={comment.reply.by}
                          isAdmin
                        />
                        <p className="p-2 text-sm leading-6 lg:text-base lg:leading-8">
                          {comment.reply.content}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="my-10 space-y-3 md:space-y-4 lg:my-16">
          <h3 className="font-heading text-xl tracking-wider md:text-2xl lg:text-3xl">
            Questions? Thoughts? Welcome to drop a comment below!
          </h3>
          <CommentForm postSlug={slug} />
        </div>
      </section>
    )
  }
)

export default PostComments
