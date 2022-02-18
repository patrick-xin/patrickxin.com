import { useMutation, useQuery, useQueryClient } from "react-query";
import cuid from "cuid";

import { useToastStore } from "@/common/hooks";
import { fetcher } from "@/utils/fetcher";

import type { IPost, IComment } from "@/post/types";

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
  const { toast } = useToastStore();
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
        toast.success("Comment added!", {
          position: "topRight",
          direction: "fadeLeft",
        });
        cb();
      },
      onError: () => {
        toast.error("Error occured, please try again later.", {
          position: "topRight",
          direction: "fadeLeft",
        });
        cb();
      },
    }
  );
};

export const useUpdateViews = (slug: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      return fetch(`/api/post/${slug}/views`, {
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
  const { toast } = useToastStore();
  const { mutate, isLoading } = useMutation(
    () => {
      return fetch(`/api/post/${slug}/likes`, {
        method: "POST",
      });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(postKeys.single(slug));
        const previousPost = queryClient.getQueryData(postKeys.single(slug));
        queryClient.setQueryData<{ likes: number }>(
          postKeys.single(slug),
          (old) => ({
            ...old,
            likes: old!.likes + 1,
          })
        );

        return previousPost;
      },

      onError: (err, _, context: any) => {
        queryClient.setQueryData<{ likes: number }>(
          postKeys.single(slug),
          context.previousLikes
        );
      },

      onSettled: () => {
        queryClient.invalidateQueries(postKeys.single(slug));
        toast.success("You're awesome! Thank you!", {
          position: "topRight",
          direction: "fadeLeft",
        });
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
    () => fetcher(`/api/post/${slug}`),
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
  posts: IPost[];
};

export const usePosts = () => {
  const { data } = useQuery<Posts>([postKeys.all], () =>
    fetcher<Posts>(`/api/post`)
  );
  return { data };
};

export const useDeletePost = (cb: () => void) => {
  const queryClient = useQueryClient();
  const { toast } = useToastStore();
  const { mutate, isLoading } = useMutation(
    (slug: string) => {
      return fetch(`/api/post/${slug}`, {
        method: "DELETE",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([postKeys.all]);
        toast.success("Post Deleted!", {
          position: "topRight",
          direction: "fadeLeft",
        });
        cb();
      },
    }
  );
  return { deletePost: mutate, isDeleting: isLoading };
};

export const useReply = () => {
  const queryClient = useQueryClient();
  const { toast } = useToastStore();
  const { mutate, isLoading } = useMutation(
    ({
      id,
      slug,
      content,
      username,
    }: {
      id: string;
      slug: string;
      content: string;
      username: string;
    }) => {
      return fetch(`/api/post/${slug}/comments/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, username }),
      });
    },
    {
      onSuccess: (_, { slug }) => {
        toast.success("Successfully replied!", {
          position: "topRight",
          direction: "fadeLeft",
        });
        queryClient.invalidateQueries(postKeys.single(slug));
      },
    }
  );
  return { reply: mutate, isSubmitting: isLoading };
};
