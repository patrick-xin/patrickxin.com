import { useMutation, useQueryClient } from "react-query";

import Avatar from "boring-avatars";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useState } from "react";
import cuid from "cuid";
//import { usePostComments } from "../hooks";

type PostCommentsProps = {
  slug: string;
};

const PostComments = ({ slug }: PostCommentsProps) => {
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const comments = [];
  //usePostComments(slug);
  // const { data } = useQuery<Blog>(["blog", slug], () =>
  //   fetcher<Blog>(`/api/views/${slug}`)
  // );

  const commentMutation = useMutation(
    () => {
      return fetch(`/api/posts/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          content,
          commentId: cuid(),
          notificationId: cuid(),
        }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", slug]);
        setUsername("");
        setContent("");
      },
    }
  );

  return (
    <section className="my-12 max-w-3xl mx-auto">
      <div className="space-y-6">
        <h3 className="text-3xl">Comments</h3>
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <div
              key={comment.id}
              className="shadow p-2 lg:p-4 rounded-md border border-accent border-opacity-50"
            >
              <div className="flex gap-4">
                <div className="mt-0.5">
                  <Avatar size={30} name={comment.username} variant="beam" />
                </div>
                <div className="flex text-sm flex-col gap-2 w-full rounded-md relative">
                  <CommentBanner
                    username={comment.username}
                    createdAt={comment.createdAt}
                    isAdmin={false}
                  />

                  <p className="text-lg p-2">{comment.content}</p>
                  {comment.reply && (
                    <div className="ml-10 my-6">
                      <CommentBanner
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
      <div className="my-8">
        <form
          className="space-y-4 flex flex-col"
          onSubmit={async (e) => {
            e.preventDefault();
            commentMutation.mutate();
          }}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="name"
            className="form-input"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            placeholder="leave a comment"
            className="form-input"
          />
          <button
            disabled={
              commentMutation.isLoading ||
              username.length == 0 ||
              content.length === 0
            }
            type="submit"
            className="p-2 bg-skin-accent rounded-md text-black/70 text-sm self-end disabled:opacity-25 disabled:cursor-not-allowed"
          >
            Comment
          </button>
        </form>
      </div>
    </section>
  );
};

export default PostComments;

const CommentBanner = ({
  username,
  isAdmin,
  createdAt,
  by,
}: {
  username: string;
  isAdmin: boolean;
  createdAt: string;
  by?: string;
}) => {
  return (
    <div className="flex justify-between md:justify-start space-x-2 md:space-x-6 text-xs lg:text-sm bg-gray-100 dark:bg-gray-500/10 rounded-md w-full p-2 border-b border-gray-200 dark:border-gray-900/50">
      {isAdmin && (
        <div className="inline-flex space-x-4">
          <span className="font-semibold text-dark-accent dark:text-accent">
            {by}
          </span>
          <span className="hidden md:block dark:text-white/40">replied to</span>
        </div>
      )}
      <div className="font-semibold text-accent dark:text-dark-accent">
        {username}
      </div>
      {!isAdmin && (
        <div className="hidden md:block dark:text-white/40">commented on</div>
      )}
      <div className="dark:text-white/40">
        {formatDistanceToNow(parseISO(createdAt), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
};
