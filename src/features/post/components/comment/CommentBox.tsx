import { formatDistanceToNow, parseISO } from 'date-fns'
import { motion } from 'framer-motion'

const CommentBox = ({
  username,
  isAdmin,
  createdAt,
  by,
}: {
  username: string
  isAdmin: boolean
  createdAt: string
  by?: string
}) => {
  return (
    <motion.div
      className={`flex justify-between items-center md:justify-start space-x-2 md:space-x-6 text-xs lg:text-sm rounded-md w-full p-2 border-b border-gray-200 dark:border-gray-900/50 ${
        isAdmin
          ? 'bg-mint/60 dark:bg-orange/60 '
          : 'bg-orange/60 dark:bg-mint/30 '
      }`}
    >
      {isAdmin && (
        <div className="inline-flex space-x-3 lg:space-x-4">
          <span className="font-semibold">{by}</span>
          <span className="pl-6 dark:text-white/40">replied to</span>
        </div>
      )}
      <div className="font-semibold">{username}</div>
      {!isAdmin && <div className="dark:text-white/40">commented on</div>}
      {!isAdmin && (
        <div className="mt-0.5 text-xs italic tracking-tighter dark:text-white/40">
          {formatDistanceToNow(parseISO(createdAt), {
            addSuffix: true,
          })}
        </div>
      )}
    </motion.div>
  )
}

export default CommentBox
