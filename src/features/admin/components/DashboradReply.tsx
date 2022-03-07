import { useState } from 'react'
import { useMutation } from 'react-query'

import type { IComment } from '@/post/types'

type DashboradReplyProps = {
  comment: IComment
  setActiveReply(): void
}

const DashboradReply = ({ comment, setActiveReply }: DashboradReplyProps) => {
  const [reply, setReply] = useState('')
  const commentMutation = useMutation(
    ({
      slug,
      commentId,
      content,
      username,
    }: {
      slug: string
      commentId: string
      content: string
      username: string
    }) => {
      return fetch(`/api/post/${slug}/comments/${commentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          content,
        }),
      })
    }
  )
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        commentMutation.mutate({
          content: reply,
          commentId: comment.id,
          username: `@${comment.user.username}`,
          slug: comment.post.slug,
        })
      }}
      className="flex flex-col"
    >
      <textarea
        value={reply}
        onChange={(e) => {
          setReply(e.target.value)
        }}
        rows={5}
        placeholder={`reply to @${comment.user.username}`}
        className="form-input"
      />
      <div className="self-end space-x-2">
        <button
          onClick={setActiveReply}
          type="button"
          className="p-1 my-2 text-xs dark:text-white/70 bg-red-500/70 rounded"
        >
          cancle
        </button>
        <button
          disabled={reply.length === 0}
          type="submit"
          className="p-1 my-2 text-xs text-black/70 bg-mint rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          reply
        </button>
      </div>
    </form>
  )
}

export default DashboradReply
