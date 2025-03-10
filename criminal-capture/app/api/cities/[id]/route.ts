import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Update City by ID
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "City ID is required" },
        { status: 400 }
      );
    }

    const cityId = parseInt(id, 10);
    if (isNaN(cityId)) {
      return NextResponse.json({ error: "Invalid City ID" }, { status: 400 });
    }

    const { name, distance } = await req.json();

    // Checking if city exists
    const existingCity = await prisma.city.findUnique({
      where: { id: cityId },
    });
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
    return NextResponse.json(
      { error: "Failed to update city", details: error.message },
      { status: 500 }
    );
  }
}

// Delete City by ID
export async function DELETE(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const id = url.pathname.split("/").pop();
  
      if (!id || isNaN(Number(id))) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
      }
  
      const cityId = parseInt(id, 10);
  
      // Check if city exists
      const existingCity = await prisma.city.findUnique({
        where: { id: cityId },
      });
  
      if (!existingCity) {
        return NextResponse.json({ error: "City not found" }, { status: 404 });
      }
  
      // Delete city
      await prisma.city.delete({ where: { id: cityId } });
  
      return NextResponse.json({ message: "City deleted successfully" });
    } catch (error: any) {
      return NextResponse.json(
        { error: "Failed to delete city", details: error.message },
        { status: 500 }
      );
    }
  }
