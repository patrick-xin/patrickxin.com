import { Request } from "@common/types";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export default async function auth(
  req: Request,
  res: NextApiResponse,
  next: NextHandler
) {
  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    if (cookies) {
      return jwt.verify(
        cookies["auth"],
        process.env.JWT_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.redirect(307, "/");
          }
          return next();
        }
      );
    }
  } else {
    return res.redirect(307, "/");
  }
}
