import { useMutation, useQuery, useQueryClient } from "react-query";
import cuid from "cuid";

import { URL } from "@common/constants";
import { fetcher } from "@common/utils/fetcher";

import type { IPost, IComment } from "@post/types";
import { useModalStore } from "@common/hooks";

export const postKeys = {
  all: ["posts"] as const,
  single: (slug: string) => ["post", slug],
  views: (slug: string) => [...postKeys.single(slug), "views"] as const,
  likes: (slug: string) => [...postKeys.single(slug), "likes"] as const,
  comments: (slug: string) => [...postKeys.single(slug), "comments"] as const,
};

export const useCommentMutation = ({
  postSlug,
  username,
  email,
  content,
  cb,
}: {
  postSlug: string;
  username: string;
  email: string;
  content: string;
  cb: () => void;
}) => {
  const queryClient = useQueryClient();
  const { toast } = useModalStore();
  return useMutation(
    () => {
      return fetch(`/api/post/${postSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          content,
          email,
          commentId: cuid(),
          notificationId: cuid(),
        }),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", postSlug]);
        toast.success("Comment added! Thank you!", "topRight");
        cb();
      },
      onError: () => {
        toast.error("Error occured, please try again later.", "topRight");
        cb();
      },
    }
  );
};

export const useUpdateViews = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return fetch(`${URL}/api/post/${slug}/views`, {
        method: "POST",
      });
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries(["post", slug]);
      },
    }
  );
};

export const useUpdateLikes = (slug: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    () => {
      return fetch(`${URL}/api/post/${slug}/likes`, {
        method: "POST",
      });
    },
    {
      onMutate: async () => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries(postKeys.single(slug));

        // Snapshot the previous value
        const previousPost = queryClient.getQueryData(postKeys.single(slug));

        // Optimistically update to the new value
        queryClient.setQueryData<{ likes: number }>(
          postKeys.single(slug),
          (old) => ({
            ...old,
            likes: old!.likes + 1,
          })
        );

        // Return a context object with the snapshotted value
        return previousPost;
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, _, context: any) => {
        queryClient.setQueryData<{ likes: number }>(
          postKeys.single(slug),
          context.previousLikes
        );
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries(postKeys.single(slug));
      },
    }
  );
  return { updateLikes: mutate, isUpdatingLikes: isLoading };
};

export const usePost = (
  slug: string,
  select: ((data: IPost) => number | IComment[]) | undefined
) =>
  useQuery<IPost, Error, number | IComment[]>(
    postKeys.single(slug),
    () => fetcher(`${URL}/api/post/${slug}`),
    {
      select,
      enabled: !!slug,
    }
  );

export const usePostLikes = (slug: string) => {
  const { data } = usePost(slug, (post) => post.like_count);
  return { likes: data as number };
};
export const usePostViews = (slug: string) => {
  const { data } = usePost(slug, (post) => post.view_count);
  return { views: data as number };
};
export const usePostComments = (slug: string) => {
  const { data, isLoading, isError } = usePost(slug, (post) => post.comments);
  return { comments: data as IComment[], isLoading, isError };
};

type Posts = {
  data: {
    commentsCount: number;
    likesCount: number;
    viewsCount: number;
  };
  comments: { createdAt: string }[];
};

export const usePosts = () => {
  const { data } = useQuery<Posts>([postKeys.all], () =>
    fetcher<Posts>(`${URL}/api/post`)
  );
  return { data };
};
