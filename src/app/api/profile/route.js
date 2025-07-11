import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { mongoConnect } from "@/lib/mongoConnection";
import { User } from "@/model/user";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  const payload = jwt.verify(token, process.env.NEXT_JWT_SECRET);
  await mongoConnect();
  const user = await User.findById(payload._id);
  if (!user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }
  return NextResponse.json({ data: user });
}
