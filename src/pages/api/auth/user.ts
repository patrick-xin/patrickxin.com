import { NextApiResponse } from "next";
import nc from "next-connect";

import { Request } from "@common/types";
import middleware from "@common/lib/prisma/middleware";
import cookie from "cookie";
const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.get(async (req, res) => {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    if (cookies["auth"]) {
      res.status(200).json({ isAdmin: true });
    } else {
      res.status(403).json({ message: "unauthorized" });
    }
  }
});

export default handler;
