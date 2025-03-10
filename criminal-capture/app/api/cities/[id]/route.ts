import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Update City by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const cityId = parseInt(params.id, 10);
    const { name, distance } = await req.json();

    // Checking if city exists
    const existingCity = await prisma.city.findUnique({ where: { id: cityId } });
    if (!existingCity) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    // Update the city
    const updatedCity = await prisma.city.update({
      where: { id: cityId },
      data: { name, distance },
    });

    return NextResponse.json(updatedCity);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update city", details: error.message }, { status: 500 });
  }
}

// Delete City by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const cityId = parseInt(params.id, 10);

    // Checking if city exists
    const existingCity = await prisma.city.findUnique({ where: { id: cityId } });
    if (!existingCity) {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }

    // Delete the city
    await prisma.city.delete({ where: { id: cityId } });

    return NextResponse.json({ message: "City deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete city", details: error.message }, { status: 500 });
  }
}
