import { Request } from "@common/types";
import { NextApiResponse } from "next";
import nc from "next-connect";
import database from "./db";

const middleware = nc<Request, NextApiResponse>({
  onError: (err, _req, res, next) => {
    console.error(err.stack);
    if (typeof err === "string") {
      // custom application error
      return res.status(400).json({ message: err });
    }

    if (err.name === "UnauthorizedError") {
      // jwt authentication error
      return res.status(401).json({ message: "Invalid Token" });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
  },
});

middleware.use(database);
export default middleware;
