import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    console.log("Received Body:", req.body);
  try {
    const body = await req.json();
    const { cops } = body;

    if (!cops || !Array.isArray(cops)) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    await prisma.selection.createMany({
      data: cops.map((cop) => ({
        name: cop.name,
        city_id: cop.city_id,
        vehicle_id: cop.vehicle_id,
      })),
    });

    return NextResponse.json({ message: "Selection saved successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error saving selection:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
