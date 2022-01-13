import { IComment } from "@post/types";

export interface IUser {
  username: string;
  email: string;
  role: Role;
  comment: IComment[];
  id: string;
  _count: { comment: number };
}

enum Role {
  VISTOR = "VISTOR",
  ADMIN = "ADMIN",
}
