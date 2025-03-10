import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const cities = await prisma.city.findMany();
  return NextResponse.json(cities);
}

export async function POST(req: Request) {
  const { name, distance } = await req.json();
  const newCity = await prisma.city.create({ data: { name, distance } });
  return NextResponse.json(newCity);
}
