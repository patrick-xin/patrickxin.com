import { Post } from ".contentlayer/types";
import { User } from "@prisma/client";
export type Frontmatter = Pick<
  Post,
  "description" | "publishedAt" | "title" | "readingTime" | "slug"
>;

export interface IPost {
  id: string;
  slug: string;
  view_count: number;
  like_count: number;
  updatedAt: Date;
  comments: IComment[];
}

export interface IComment {
  id: string;
  postSlug: string;
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

export interface IUser {
  username: string;
  email: string;
  role: Role;
}

enum Role {
  "VISTOR",
  "ADMIN",
}

export interface IAdjacentPosts {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}
