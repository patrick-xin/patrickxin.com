import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies["auth"];
  if (!token) {
    return NextResponse.redirect("/");
  } else {
    return jwt.verify(token, process.env.JWT_SECRET, async (err) => {
      if (err) {
        return NextResponse.redirect("/");
      }
      return NextResponse.next();
    });
  }
}
