import { useState } from "react";

import SpinLoader from "@common/components/svg/spin-loader";
import { useCommentMutation } from "@post/lib/query";

type CommentFormProps = {
  postSlug: string;
};

const CommentForm = ({ postSlug }: CommentFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const resetState = () => {
    setUsername("");
    setEmail("");
    setContent("");
  };
  const commentMutation = useCommentMutation({
    postSlug,
    username,
    email,
    content,
    cb: resetState,
  });
  return (
    <form
      className="space-y-4 flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();
        commentMutation.mutate();
        console.log(commentMutation.isSuccess);

        if (commentMutation.isSuccess) {
          setUsername("");
          setEmail("");
          setContent("");
        }
      }}
    >
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="name"
        className="form-input"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="form-input"
      />
      <p className="text-xs -my-1 italic ml-1 text-mint dark:text-orange">
        Your email will not display in public.
      </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        placeholder="leave a comment"
        className="form-input min-h-[10rem]"
      />
      <button
        disabled={
          commentMutation.isLoading ||
          username.length < 2 ||
          content.length <= 2 ||
          !email
        }
        type="submit"
        className="p-2 w-16 inline-flex justify-center rounded-md bg-orange text-snow dark:text-snow text-sm self-end disabled:opacity-25 disabled:cursor-not-allowed"
      >
        {commentMutation.isLoading ? <SpinLoader /> : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
