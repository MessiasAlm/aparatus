import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getBarbershops = async () => {
  const barbershops = await prisma.barbershop.findMany();
  return barbershops;
};

export const getPopularBarbershops = async () => {
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return popularBarbershops;
};

export const getBarbershopById = async (id: string) => {
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });
  return barbershop;
};

export const getBarbershopByTerm = (term: string) => {
  const barbershopByTerm = prisma.barbershop.findMany({
    where: {
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { address: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
      ],
    },
  });
  return barbershopByTerm;
};

export const getServiceByTerm = (term: string) => {
  const serviceByTerm = prisma.barbershopService.findMany({
    where: {
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
      ],
    },
  });
  return serviceByTerm;
};

export type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    user: true;
    barbershop: true;
    service: true;
  };
}>;

export async function getBookings(): Promise<BookingWithRelations[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) {
    return [];
  }
  return prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
      barbershop: true,
      service: true,
    },
    orderBy: {
      dateTime: "desc",
    },
  });
}
