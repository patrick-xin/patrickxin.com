import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@/common/types";
import middleware from "@/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.post(async ({ query, body, db }, res) => {
  const { username, content, commentId, email } = body;
  const slug = query.slug as string;
  const user = await db.user.findUnique({
    where: {
      username_email: { username, email },
    },
  });
  if (username && content && email) {
    try {
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
        },
      });

      res.status(200).json({
        message: `Successfully posted comments on: ${query.slug} blog!`,
      });
    } catch (error) {
      res.status(400).json({
        message: `Unable to comment right now, please try again later...`,
      });
    }
  }
});

export default handler;
