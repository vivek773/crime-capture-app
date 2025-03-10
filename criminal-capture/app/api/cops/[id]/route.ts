import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Update Cop by ID
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const copId = parseInt(params.id, 10);
    const { name } = await req.json();

    // Check if cop exists
    const existingCop = await prisma.cop.findUnique({ where: { id: copId } });
    if (!existingCop) {
      return NextResponse.json({ error: "Cop not found" }, { status: 404 });
    }

    // Update the cop
    const updatedCop = await prisma.cop.update({
      where: { id: copId },
      data: { name },
      select: { id: true, name: true },
    });

    return NextResponse.json(updatedCop);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update cop", details: error.message }, { status: 500 });
  }
}

// Delete Cop by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const copId = parseInt(params.id, 10);

    // Check if cop exists
    const existingCop = await prisma.cop.findUnique({ where: { id: copId } });
    if (!existingCop) {
      return NextResponse.json({ error: "Cop not found" }, { status: 404 });
    }

    // Delete the cop
    await prisma.cop.delete({ where: { id: copId } });

    return NextResponse.json({ message: "Cop deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete cop", details: error.message }, { status: 500 });
  }
}
