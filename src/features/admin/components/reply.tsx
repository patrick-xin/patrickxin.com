import { useState } from "react";
import { useMutation } from "react-query";

import type { IComment } from "@/post/types";

type DashboradReplyProps = {
  comment: IComment;
  setActiveReply(): void;
};

const DashboradReply = ({ comment, setActiveReply }: DashboradReplyProps) => {
  const [reply, setReply] = useState("");
  const commentMutation = useMutation(
    ({
      slug,
      commentId,
      content,
      username,
    }: {
      slug: string;
      commentId: string;
      content: string;
      username: string;
    }) => {
      return fetch(`/api/post/${slug}/comments/${commentId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          content,
        }),
      });
    }
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        commentMutation.mutate({
          content: reply,
          commentId: comment.id,
          username: `@${comment.user.username}`,
          slug: comment.post.slug,
        });
      }}
      className="flex flex-col"
    >
      <textarea
        value={reply}
        onChange={(e) => {
          setReply(e.target.value);
        }}
        rows={5}
        placeholder={`reply to @${comment.user.username}`}
        className="form-input"
      />
      <div className="space-x-2 self-end">
        <button
          onClick={setActiveReply}
          type="button"
          className="p-1 my-2 bg-red-500/70 rounded dark:text-white/70 text-xs"
        >
          cancle
        </button>
        <button
          disabled={reply.length === 0}
          type="submit"
          className="p-1 my-2 bg-mint rounded text-black/70 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
        >
          reply
        </button>
      </div>
    </form>
  );
};

export default DashboradReply;
