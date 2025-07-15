import { NextResponse } from "next/server";

export async function GET(req) {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("token");
  return res;
}
