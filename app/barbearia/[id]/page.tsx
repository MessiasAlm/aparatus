import Image from "next/image";
import { notFound } from "next/navigation";
import { Smartphone } from "lucide-react";
import { getBarbershopById } from "@/data/barbershops";
import { PageSectionTitle } from "@/components/ui/page";
import ServiceItem from "@/components/service-item";
import { formatPhoneForWhatsapp } from "@/lib/utils";
import BackButton from "./_components/back-button";
import CopyButton from "./_components/copy-button";
import { Button } from "@/components/ui/button";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { ButtonWhatsapp } from "@/components/button-chat";
import Footer from "@/components/footer";

const BarbershopPage = async ({ params }: PageProps<"/barbearia/[id]">) => {
  const { id } = await params;
  const barbershop = await getBarbershopById(id);

  if (!barbershop) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="relative h-52 w-full sm:h-64 md:h-72">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <BackButton />
      </div>

      <div className="bg-background relative z-10 -mt-8 rounded-t-3xl sm:-mt-10">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <div className="flex flex-col gap-2 pt-6">
            <div className="flex items-center gap-2">
              <div className="relative size-8 shrink-0 sm:size-10">
                <Image
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <h1 className="text-lg font-bold sm:text-xl md:text-2xl">
                {barbershop.name}
              </h1>
            </div>

            <p className="text-muted-foreground text-sm">
              {barbershop.address}
            </p>
          </div>

          <div className="bg-border my-6 h-px w-full" />

          <section className="flex flex-col gap-3">
            <PageSectionTitle>Sobre Nós</PageSectionTitle>
            <p className="text-sm leading-relaxed sm:text-base">
              {barbershop.description}
            </p>
          </section>

          <div className="bg-border my-6 h-px w-full" />

          <section className="flex flex-col gap-4">
            <PageSectionTitle>Serviços</PageSectionTitle>

            <div className="flex flex-col gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  barbershop={barbershop}
                />
              ))}
            </div>
          </section>

          <div className="bg-border my-6 h-px w-full" />

          <section className="flex flex-col gap-4 pb-24">
            <PageSectionTitle>Contato</PageSectionTitle>

            {barbershop.phones.map((phone, index) => (
              <div
                key={index}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg px-3 py-2 transition"
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="size-5" />
                  <p className="text-sm">{phone}</p>
                </div>

                <CopyButton text={phone} />
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="h-12 w-12 rounded-full">
                <FaInstagram className="size-5" />
              </Button>

              <Button variant="outline" className="h-12 w-12 rounded-full">
                <FaWhatsapp className="size-5" />
              </Button>
            </div>
          </section>
        </div>

        <ButtonWhatsapp
          phoneNumber={formatPhoneForWhatsapp(barbershop.phones[0])}
        />
      </div>

      <Footer />
    </div>
  );
};

export default BarbershopPage;
