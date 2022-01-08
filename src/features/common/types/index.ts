import { PrismaClient } from ".prisma/client";

import { NextApiRequest } from "next";

export interface Request extends NextApiRequest {
  db: PrismaClient;
}
