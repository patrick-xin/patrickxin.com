import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

import { HeartIcon } from "@heroicons/react/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/outline";
import { Tooltip } from "@common/components";

import { useLocalStorage } from "@common/hooks";
import { usePostLikes, useUpdateLikes } from "@post/hooks";

const PostLikes = ({ postSlug }: { postSlug: string }) => {
  const [isLiked, setLike] = useLocalStorage(postSlug, false);

  const { likes } = usePostLikes(postSlug);
  const { updateLikes, isUpdatingLikes } = useUpdateLikes(postSlug);
  return (
    <Tooltip
      tooltipText={isLiked ? "liked" : "likes"}
      position="bottom"
      color="red"
    >
      <AnimatePresence>
        {likes !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 items-center"
          >
            {isLiked ? (
              <HeartIcon className="h-6 w-6 text-red-500 cursor-not-allowed" />
            ) : (
              <HeartIconOutline
                onClick={() => {
                  setLike(true);
                  updateLikes();
                }}
                className={classNames("h-6 w-6 cursor-pointer text-red-500", {
                  "cursor-not-allowed": isUpdatingLikes,
                })}
              />
            )}
            <motion.div
              className="font-black font-modernist"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              {likes}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Tooltip>
  );
};

export default PostLikes;
