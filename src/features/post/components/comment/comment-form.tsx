import { useState } from 'react'

import { SpinLoader } from '@/common/components/icon'
import { useCommentMutation } from '@/post/hooks'

type CommentFormProps = {
  postSlug: string
}

const CommentForm = ({ postSlug }: CommentFormProps) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const resetState = () => {
    setUsername('')
    setEmail('')
    setContent('')
  }
  const { mutate, isLoading, isSuccess } = useCommentMutation({
    postSlug,
    username,
    email,
    content,
    cb: resetState,
  })

  return (
    <form
      className="flex flex-col py-6 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        mutate()

        if (isSuccess) {
          setUsername('')
          setEmail('')
          setContent('')
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
      <p className="-my-1 ml-1 text-xs italic text-mint dark:text-orange lg:text-sm">
        Don&lsquo;t worry. Your email will not display in public.
      </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        placeholder="leave a comment"
        className="min-h-[10rem] form-input"
      />

      <button
        disabled={
          isLoading || username.length < 2 || content.length <= 2 || !email
        }
        type="submit"
        className="inline-flex justify-center self-end p-2 w-16 text-xs text-snow dark:text-snow bg-orange rounded-md disabled:opacity-25 disabled:cursor-not-allowed md:text-sm"
      >
        {isLoading ? <SpinLoader /> : 'Submit'}
      </button>
    </form>
  )
}

export default CommentForm
