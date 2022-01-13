import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.post(async ({ query, body, db }, res) => {
  const { username, content, commentId, notificationId, email } = body;
  const slug = query.slug as string;
  const user = await db.user.findUnique({
    where: {
      username_email: { username, email },
    },
  });
  if (username && content && email) {
    if (!user) {
      await db.user.create({
        data: { email, username },
      });
    }
    await db.comment.create({
      data: {
        post: { connect: { slug } },
        content,
        user: {
          connectOrCreate: {
            where: { username_email: { email, username } },
            create: { username, email },
          },
        },
        id: commentId,
        notification: {
          create: {
            isRead: false,
            id: notificationId,
          },
        },
        notificationId,
      },
    });

    return res.status(200).json({
      message: `Successfully posted comments on: ${query.slug} blog!`,
    });
  }
});

export default handler;
