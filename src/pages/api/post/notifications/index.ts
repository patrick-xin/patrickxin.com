import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler
  .get(async ({ db }, res) => {
    const notifications = await db.commentNotification.findMany({
      where: {
        isRead: false,
      },
      select: {
        id: true,
        comment: {
          select: {
            user: true,
            postSlug: true,
            id: true,
            createdAt: true,
            content: true,
          },
        },
      },
      orderBy: {
        comment: {
          createdAt: "desc",
        },
      },
    });

    res.status(200).json({ notifications });
  })
  .patch(async ({ db }, res) => {
    await db.commentNotification.updateMany({
      where: {
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
    res.status(200).json({ message: "Notifications read!" });
  });

export default handler;
