import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.get(async ({ query, db }, res) => {
  const slug = query.slug as string;
  const data = await db.post.findFirst({
    where: { slug },
    select: { like_count: true },
  });

  res.status(200).json({
    likes: data?.like_count,
  });
});

handler.post(async ({ query, db }, res) => {
  const slug = query.slug as string;
  await db.post.upsert({
    where: { slug },
    create: { slug },
    update: {
      like_count: { increment: 1 },
    },
  });
  res.status(200).json({
    message: `Successfully liked page: ${query.slug}`,
  });
});

export default handler;
