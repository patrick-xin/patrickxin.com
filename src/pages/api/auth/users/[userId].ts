import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@/common/types";
import middleware from "@/lib/prisma/middleware";
import auth from "@/lib/prisma/middleware/auth";
const handler = nc<Request, NextApiResponse>();

handler.use(middleware);
handler.use(auth);

handler.delete(async ({ db, query }, res) => {
  const userId = query.userId.toString();

  await db.user.delete({ where: { id: userId }, include: { comment: true } });
  res.status(200).json({ message: `user with ${userId} is deleted.` });
});

export default handler;
