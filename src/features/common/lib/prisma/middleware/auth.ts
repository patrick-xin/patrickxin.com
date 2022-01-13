import { Request } from "@common/types";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import cookie from "cookie";

export default async function auth(
  req: Request,
  res: NextApiResponse,
  next: NextHandler
) {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    if (!cookies["auth"]) {
      res.redirect(307, "/");
    } else {
      next();
    }
  }
}
