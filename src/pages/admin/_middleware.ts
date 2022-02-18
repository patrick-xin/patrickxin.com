import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "@tsndr/cloudflare-worker-jwt";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies["auth"];

  if (!token) {
    return NextResponse.redirect("http://alpesdream.vercel.app/");
  } else {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) {
      return NextResponse.redirect("http://alpesdream.vercel.app/");
    }
    return NextResponse.next();
  }
}
