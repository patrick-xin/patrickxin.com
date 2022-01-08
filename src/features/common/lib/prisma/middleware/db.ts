import prisma from "@common/lib/prisma";
import { Request } from "@common/types";
import { NextApiResponse } from "next";
import { NextHandler } from "next-connect";

export default async function database(
  req: Request,
  _res: NextApiResponse,
  next: NextHandler
) {
  req.db = prisma;

  next();
}
