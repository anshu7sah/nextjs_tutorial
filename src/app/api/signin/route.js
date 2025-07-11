import { mongoConnect } from "@/lib/mongoConnection";
import { User } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  const { email, password } = await request.json();
  await mongoConnect();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 401 });
  }

  const comparision = await bcrypt.compare(password, user.password);
  if (!comparision) {
    return NextResponse.json({ error: "user not found" }, { status: 401 });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.NEXT_JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );

  const res = NextResponse.json({ token });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
