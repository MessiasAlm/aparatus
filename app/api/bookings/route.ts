import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Obter a sessão do usuário autenticado
    const headerList = await headers();
    const session = await auth.api.getSession({
      headers: headerList,
    });

    if (!session) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { barbershopId, serviceId, dateTime } = body;

    // Validar campos obrigatórios
    if (!barbershopId || !serviceId || !dateTime) {
      return NextResponse.json(
        {
          error: "Campos obrigatórios: barbershopId, serviceId, dateTime",
        },
        { status: 400 },
      );
    }

    // Validar se a barbearia existe
    const barbershop = await prisma.barbershop.findUnique({
      where: { id: barbershopId },
    });

    if (!barbershop) {
      return NextResponse.json(
        { error: "Barbearia não encontrada" },
        { status: 404 },
      );
    }

    // Validar se o serviço existe e pertence à barbearia
    const service = await prisma.barbershopService.findUnique({
      where: { id: serviceId },
    });

    if (!service || service.barbershopId !== barbershopId) {
      return NextResponse.json(
        { error: "Serviço não encontrado nesta barbearia" },
        { status: 404 },
      );
    }

    // Validar se a data/hora é no futuro
    const bookingDate = new Date(dateTime);
    if (bookingDate < new Date()) {
      return NextResponse.json(
        { error: "A data do agendamento deve ser no futuro" },
        { status: 400 },
      );
    }

    // Criar o agendamento
    const booking = await prisma.booking.create({
      data: {
        name: service.name,
        description: service.description,
        imageUrl: service.imageUrl ?? "",
        userId: session.user.id,
        barbershopId,
        serviceId,
        dateTime: bookingDate,
      },
      include: {
        user: true,
        barbershop: true,
        service: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return NextResponse.json(
      { error: "Erro ao criar agendamento" },
      { status: 500 },
    );
  }
}
