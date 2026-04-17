import { Barbershop } from "@/generated/prisma";
import Link from "next/link";
import Image from "next/image";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Link
      href={`/barbearia/${barbershop.id}`}
      className="relative min-h-[180] min-w-[290] rounded-xl"
    >
      <div className="absolute top-0 left-0 z-10 h-full w-full rounded-lg bg-linear-to-t from-black to-transparent">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <div className="absolute right-0 bottom-0 left-0 z-20 p-4">
        <h2 className="text-background text-lg font-bold">{barbershop.name}</h2>
        <p className="text-background text-xs">{barbershop.address}</p>
      </div>
    </Link>
  );
};

export default BarbershopItem;
