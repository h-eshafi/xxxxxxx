import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
 
const prisma = new PrismaClient();

export async function POST(req, res) {
  const body = await req.json();
  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({message :"Missing email or password"}, { status: 400 });
  }
  const exist = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (exist) {
    return NextResponse.json({message :"USER ALREADY EXISTS"}, { status: 400 });
  }
//   final step
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });
  console.log(user);

  return NextResponse.json(user);
}
