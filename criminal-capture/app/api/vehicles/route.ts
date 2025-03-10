import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const vehicles = await prisma.vehicle.findMany();
  return NextResponse.json(vehicles);
}

export async function POST(req: Request) {
  const { type, range, count } = await req.json();
  const newVehicle = await prisma.vehicle.create({
    data: { type, range, count },
  });
  return NextResponse.json(newVehicle);
}
