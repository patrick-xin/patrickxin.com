import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";
import cookie from "cookie";
const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.post(async (_req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("auth", "", {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status(200).json({ message: "Log out successfully!" });
});

export default handler;
