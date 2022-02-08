import { IComment } from "@/post/types";

export interface IUser {
  username: string;
  email: string;
  role: Role;
  comment: IComment[];
  id: string;
  _count: { comment: number };
  title?: string;
}

enum Role {
  VISTOR = "VISTOR",
  ADMIN = "ADMIN",
}
export type NormalizedPost = {
  views: number;
  likes: number;
  comments: number;
  title: string;
  id: string;
};
