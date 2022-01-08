import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.get(async ({ query, db }, res) => {
  const slug = query.slug as string;

  const data = await db.post.findUnique({
    where: { slug },
    select: {
      view_count: true,
      comments: {
        select: {
          reply: true,
          id: true,
          createdAt: true,
          content: true,
          user: true,
        },
      },
      like_count: true,
    },
  });

  if (data) {
    return res.status(200).json({
      view_count: data.view_count,
      comments: data.comments || [],
      like_count: data.like_count,
    });
  }
});

handler.post(async ({ query, db }, res) => {
  const slug = query.slug as string;

  await db.post.upsert({
    where: { slug },
    update: {
      slug,
    },
    create: { slug },
  });

  return res.status(200).json({
    message: `Successfully created post in db!`,
  });
});

export default handler;