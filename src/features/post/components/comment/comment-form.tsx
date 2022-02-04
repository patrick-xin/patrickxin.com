import { useState } from "react";

import { SpinLoader } from "@common/components/svg";
import { useCommentMutation } from "@post/hooks";

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
  const { mutate, isLoading, isSuccess } = useCommentMutation({
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
        mutate();

        if (isSuccess) {
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
        placeholder="email"
        className="form-input"
      />
      <p className="text-xs lg:text-sm -my-1 italic ml-1 text-mint dark:text-orange">
        Don&lsquo;t worry. Your email will not display in public.
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
          isLoading || username.length < 2 || content.length <= 2 || !email
        }
        type="submit"
        className="p-2 w-16 inline-flex justify-center rounded-md bg-orange text-snow dark:text-snow text-xs md:text-sm self-end disabled:opacity-25 disabled:cursor-not-allowed"
      >
        {isLoading ? <SpinLoader /> : "Submit"}
      </button>
    </form>
  );
};

export default CommentForm;
