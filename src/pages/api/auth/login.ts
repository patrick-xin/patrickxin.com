import { NextApiResponse } from "next";
import nc from "next-connect";
import { sign } from "jsonwebtoken";
import bc from "bcrypt";
import cookie from "cookie";

import middleware from "@/lib/prisma/middleware";
import type { Request } from "@/common/types";

const handler = nc<Request, NextApiResponse>();

handler.use(middleware);

handler.post(async ({ db, body }, res) => {
  const { username, password, email } = body;
  // Allow this function run once for registering user role
  // as admin.

  // bc.genSalt(10, function (err, salt) {
  //   bc.hash(password, salt, async function (err, hash) {
  //     await db.user.create({
  //       data: {
  //         password: hash,
  //         username,
  //         email,
  //         role: "ADMIN",
  //       },
  //     });
  //   });
  // });
  // return;

  const user = await db.user.findUnique({
    where: { username_email: { email, username } },
  });

  if (user) {
    bc.compare(password, user.password, (err, result) => {
      if (!err && result) {
        const claims = { sub: user.id };
        const jwt = sign(claims, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", jwt, {
            secure: process.env.NODE_ENV !== "development",
            httpOnly: true,
            sameSite: "strict",
            maxAge: 36000,
            path: "/",
          })
        );
        res.json({ isLoggedIn: true });
      }
    });
  } else {
    res.status(401).json({
      message: `Unauthorized`,
    });
    res.end();
  }
});

export default handler;
