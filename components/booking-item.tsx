import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingWithRelations } from "@/data/barbershops";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: BookingWithRelations;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const date = new Date(booking.dateTime);

  const month = format(date, "MMMM", { locale: ptBR });
  const day = format(date, "dd");
  const time = format(date, "HH:mm");

  return (
    <Card className="flex min-h-[180] w-full flex-row items-center justify-between overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col gap-3 px-4 py-4">
        <Badge className="w-fit">Confirmado</Badge>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={booking.imageUrl} />
              <AvatarFallback>Img</AvatarFallback>
            </Avatar>

            <p className="truncate text-sm font-medium">{booking.name}</p>
          </div>

          <p className="truncate text-sm font-bold">
            {booking.barbershop.name}
          </p>
        </div>
      </div>

      <div className="flex h-full w-24 shrink-0 flex-col items-center justify-center border-l">
        <p className="text-xs capitalize">{month}</p>
        <p className="text-2xl font-semibold">{day}</p>
        <p className="text-xs">{time}</p>
      </div>
    </Card>
  );
};

export default BookingItem;
