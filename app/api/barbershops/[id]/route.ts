import { getBarbershopById } from "@/data/barbershops";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Busca a barbearia no db usando o id
    const barbershop = await getBarbershopById(id);

    if (!barbershop) {
      return NextResponse.json(
        { error: "Barbershop not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(barbershop);
  } catch (error) {
    console.error("Error fetching barbershop:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
