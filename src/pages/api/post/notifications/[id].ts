import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.patch(async ({ db, query }, res) => {
  const id = query.id as string;
  await db.commentNotification.update({
    where: { id },
    data: { isRead: true },
  });
  res.status(200).json({ message: `Notification ${id} read!` });
});

export default handler;
