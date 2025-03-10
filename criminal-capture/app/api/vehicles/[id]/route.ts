import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Update Vehicle by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const vehicleId = parseInt(params.id, 10);
    const { type, range, count } = await req.json();

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!existingVehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    // Update the vehicle
    const updatedVehicle = await prisma.vehicle.update({
      where: { id: vehicleId },
      data: { type, range, count },
    });

    return NextResponse.json(updatedVehicle);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update vehicle", details: error.message  }, { status: 500 });
  }
}

// Delete Vehicle by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const vehicleId = parseInt(params.id, 10);

    // Check if vehicle exists
    const existingVehicle = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!existingVehicle) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }

    // Delete the vehicle
    await prisma.vehicle.delete({ where: { id: vehicleId } });

    return NextResponse.json({ message: "Vehicle deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete vehicle", details: error.message }, { status: 500 });
  }
}
