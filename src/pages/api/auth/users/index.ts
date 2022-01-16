import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";
import auth from "@common/lib/prisma/middleware/auth";
const handler = nc<Request, NextApiResponse>();

handler.use(middleware);
handler.use(auth);

handler.get(async ({ db }, res) => {
  const allUsers = await db.user.findMany({
    select: {
      comment: {
        orderBy: { createdAt: "desc" },
        select: {
          post: { select: { slug: true } },
          content: true,
          id: true,
        },
      },
      _count: true,
      email: true,
      id: true,
      username: true,
      role: true,
    },
  });
  const users = allUsers.filter((user) => user.role !== "ADMIN");
  res.status(200).json(users);
});

export default handler;
