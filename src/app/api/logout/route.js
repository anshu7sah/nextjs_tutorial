import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { mongoConnect } from "@/lib/mongoConnection";
import { User } from "@/model/user";

export async function GET(req) {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("token");
  return res;
}
