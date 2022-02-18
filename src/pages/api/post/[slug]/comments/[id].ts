import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@/common/types";
import middleware from "@/lib/prisma/middleware";
import auth from "@/lib/prisma/middleware/auth";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);
handler.use(auth);

handler.post(async ({ query, body, db }, res) => {
  const { username, content } = body;
  const id = query.id as string;

  if (username && content) {
    await db.reply.create({
      data: {
        comment: {
          connect: { id },
        },
        to: username,
        by: "Patrick Xin",
        content,
      },
    });
    return res.status(200).json({
      message: `Successfully replied to ${username}`,
    });
  }
});

export default handler;
