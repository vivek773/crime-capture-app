import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const cops = await prisma.cop.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(cops);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}



export async function POST(req: Request) {
  try {
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Missing required field: name" },
        { status: 400 }
      );
    }

    // Create new cop
    const newCop = await prisma.cop.create({
      data: { name },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json(newCop);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}


