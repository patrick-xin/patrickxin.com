import { formatDistanceToNow, parseISO } from "date-fns";
import { motion } from "framer-motion";

const CommentBox = ({
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
  console.log(username);

  return (
    <motion.div className="flex justify-between items-center md:justify-start space-x-2 md:space-x-6 text-xs lg:text-sm bg-gray-100 dark:bg-gray-500/10 rounded-md w-full p-2 border-b border-gray-200 dark:border-gray-900/50">
      {isAdmin && (
        <div className="inline-flex space-x-4">
          <span className="font-semibold text-dark-accent dark:text-accent">
            {by}
          </span>
          <span className="hidden md:block dark:text-white/40">replied to</span>
        </div>
      )}
      <div className="font-semibold">{username}</div>
      {!isAdmin && (
        <div className="hidden md:block dark:text-white/40">commented on</div>
      )}
      <div className="dark:text-white/40 mt-0.5 italic text-xs tracking-tighter">
        {formatDistanceToNow(parseISO(createdAt), {
          addSuffix: true,
        })}
      </div>
    </motion.div>
  );
};

export default CommentBox;
