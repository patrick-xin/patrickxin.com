import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.post(async ({ query, body, db }, res) => {
  const { username, content } = body;
  const id = query.id as string;
  if (username && content) {
    await db.reply.create({
      data: {
        comment: {
          connect: {},
        },
        to: username,
        by: "author",
        content,
      },
    });
    return res.status(200).json({
      message: `Successfully posted comments on: ${query.slug} blog!`,
    });
  }
});

export default handler;
