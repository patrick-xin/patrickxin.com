import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies["auth"];

  if (!token) {
    return NextResponse.redirect("/login");
  } else {
    return NextResponse.next();
  }
}
