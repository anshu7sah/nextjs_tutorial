import { mongoConnect } from "@/lib/mongoConnection";
import { User } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { username, email, password } = await request.json();
  await mongoConnect();
  const user = await User.findOne({ email });
  console.log("user", user);
  if (user) {
    return NextResponse.json(
      { error: "user already present" },
      { status: 401 }
    );
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashpassword,
  });

  return NextResponse.json(
    {
      success: "true",
      data: newUser,
    },
    {
      status: 201,
    }
  );
}
