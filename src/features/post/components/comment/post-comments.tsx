//import { useMutation, useQueryClient } from "react-query";

//import Avatar from "boring-avatars";

import { Hr } from "@common/components";
import { usePostComments } from "@post/lib/query";
import Avatar from "boring-avatars";

import CommentBox from "./comment-box";
import CommentForm from "./comment-form";

type PostCommentsProps = {
  slug: string;
};

const PostComments = ({ slug }: PostCommentsProps) => {
  const { comments, isLoading, isError } = usePostComments(slug);

  return (
    <section className="my-12 max-w-4xl mx-auto">
      <div className="space-y-3 md:space-y-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl">Comments</h3>
        {comments &&
          comments.map((comment) => (
            <div
              key={comment.id}
              className="shadow p-2 lg:p-4 rounded-md border dark:border-mint/30 border-opacity-50"
            >
              <div className="flex gap-4">
                <div className="mt-0.5">
                  <Avatar size={30} name={comment.user.email} variant="beam" />
                </div>
                <div className="flex flex-col gap-2 w-full rounded-md relative">
                  <CommentBox
                    username={comment.user.username}
                    createdAt={comment.createdAt}
                    isAdmin={false}
                  />

                  <p className="p-2">{comment.content}</p>
                  {comment.reply && (
                    <div className="ml-10 my-6">
                      <CommentBox
                        username={comment.reply.to}
                        createdAt={comment.reply.createdAt}
                        by={comment.reply.by}
                        isAdmin
                      />

                      <p className="text-lg p-2">{comment.reply.content}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <Hr />
      <div className="my-8">
        <h3 className="text-lg md:text-xl my-4">
          Questions? Thoughts? Welcome to drop a comment below!
        </h3>
        <CommentForm postSlug={slug} />
      </div>
    </section>
  );
};

export default PostComments;
