// src/app/api/types/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const types = ["bigmart", "small mart"];
  return NextResponse.json({ data: types });
}

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json(data, { status: 201 });
}
