import { Post } from ".contentlayer/types";
import { IUser } from "@/admin/types";

export type Frontmatter = Pick<
  Post,
  "description" | "publishedAt" | "title" | "readingTime" | "slug" | "thumbnail"
>;

export interface IPost {
  id: string;
  slug: string;
  view_count: number;
  like_count: number;
  comments: IComment[];
  thumbnail: string;
}

export interface IComment {
  id: string;
  post: { slug: string };
  createdAt: string;
  content: string;
  user: IUser;
  notificationId: string | null;
  replyId: string | null;
  reply: IReply;
}

export interface IReply {
  id: string;
  by: string;
  to: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdjacentPosts {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}
