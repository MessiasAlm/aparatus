"use client";

import { BarbershopService, Barbershop } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Calendar } from "./ui/calendar";
import { X, Clock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { startOfDay } from "date-fns";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  const handleConfirmBooking = async () => {
    if (!session) {
      alert("Para continuar faça login");
      router.push("/");
      return;
    }

    if (!selectedDate || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(":");

    const date = new Date(selectedDate);
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(0);
    date.setMilliseconds(0);

    await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        barbershopId: barbershop.id,
        serviceId: service.id,
        dateTime: date.toISOString(),
      }),
    });

    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  const price = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="border-border bg-background flex overflow-hidden rounded-2xl border p-4 sm:p-5">
      <div className="flex w-full items-center gap-3 sm:gap-4">
        <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="truncate text-sm font-bold sm:text-base">
            {service.name}
          </h3>

          <div className="mt-1 flex items-center justify-between gap-2">
            <span className="text-sm font-bold whitespace-nowrap">{price}</span>

            <Button
              size="sm"
              className="h-9 px-3 font-semibold whitespace-nowrap sm:h-10 sm:px-4"
              onClick={() => setIsMenuOpen(true)}
            >
              Agendar
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <div
          className={`bg-background border-border fixed top-0 right-0 z-50 flex h-screen w-full transform flex-col border-l transition-transform duration-300 ease-in-out sm:max-w-sm ${isMenuOpen ? "translate-x-0" : "translate-x-full"} `}
        >
          <div className="flex items-center justify-between border-b p-5">
            <h2 className="text-lg font-bold">Fazer Agendamento</h2>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-5 p-5">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-muted-foreground line-clamp-2 text-xs">
                  {service.description}
                </p>
                <p className="text-sm font-bold">{price}</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">
                  Selecione a data
                </label>

                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < startOfDay(new Date())}
                    className="border-border rounded-lg border p-3"
                    classNames={{
                      table: "w-full",
                      head_row: "flex",
                      row: "flex w-full mt-2",
                      cell: "flex-1 text-center",
                      day: "h-10 w-10 sm:h-12 sm:w-12 mx-auto",
                    }}
                  />
                </div>
              </div>

              {selectedDate && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="size-5" />
                    <label className="text-sm font-semibold">
                      Selecione o horário
                    </label>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="h-10 text-sm"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-background flex flex-col gap-3 border-t p-5">
            <Button
              onClick={handleConfirmBooking}
              disabled={!selectedDate || !selectedTime}
              className="h-12 w-full font-semibold"
            >
              Confirmar Agendamento
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsMenuOpen(false)}
              className="w-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
