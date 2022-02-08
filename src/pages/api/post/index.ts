import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@/common/types";
import middleware from "@/lib/prisma/middleware";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.get(async ({ db }, res) => {
  // const postSortedByViews = await db.post.findMany({
  //   orderBy: { view_count: "asc" },
  // });
  // const postSortedByLikes = await db.post.findMany({
  //   orderBy: { like_count: "asc" },
  // });
  const postSortedByComments = await db.post.findMany({
    orderBy: { comments: { _count: "asc" } },
    include: { comments: true },
  });
  const data = await db.post.findMany({
    select: {
      _count: {
        select: {
          comments: true,
        },
      },
      like_count: true,
      view_count: true,
      slug: true,
      comments: {
        select: {
          createdAt: true,
        },
      },
    },
  });

  const posts = data.map((post) => ({
    slug: post.slug,
    views: post.view_count,
    likes: post.like_count,
    comments_count: post._count!.comments,
  }));

  const result = posts.reduce(
    (a, b) => ({
      viewsCount: a.viewsCount + b.views,
      likesCount: a.likesCount + b.likes,
      commentsCount: a.commentsCount + b.comments_count,
    }),
    { viewsCount: 0, likesCount: 0, commentsCount: 0 }
  );
  const comments = data
    .map((post) => ({ comments: post.comments, slug: post.slug }))
    .flat();

  res.status(200).json({
    data: result,
    comments,
    posts: postSortedByComments,
  });
});
export default handler;
