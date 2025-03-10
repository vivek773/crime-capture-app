import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
      const { cops } = await req.json();
  
      // Fetch all available cities from the database
      const cities = await prisma.city.findMany();
      const cityIds = cities.map((city) => city.id);
  
      // Assume criminal is hiding in a random available city
      const criminalCityId = cityIds[Math.floor(Math.random() * cityIds.length)];
  
      // Find if any cop is in the same city
      const capturingCop = cops.find((cop: any) => cop.cityId === criminalCityId);
  
      let result;
      if (capturingCop) {
        result = {
          message: "Criminal captured!",
          capturedBy: capturingCop.name,
          city: criminalCityId,
        };
      } else {
        result = {
          message: "Criminal escaped!",
          city: criminalCityId,
        };
      }
  
      // Save result in database
      await prisma.result.create({
        data: result,
      });
  
      return NextResponse.json(result);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

  export async function GET() {
    try {
      // Fetching latest result from database
      const lastResult = await prisma.result.findFirst({
        orderBy: { createdAt: "desc" },
      });
  
      if (!lastResult) {
        return NextResponse.json({ message: "No results found" });
      }
  
      return NextResponse.json(lastResult);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

