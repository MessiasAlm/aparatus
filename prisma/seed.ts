import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
      "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
    ];

    const creativeNames = [
      "Navalha Premium Barber",
      "Corte Fino Studio",
      "Barbearia Dom Corte",
      "The Gentleman Barber Club",
      "Barbearia 045",
      "Old School Barber Shop",
      "Barbearia Alfa Style",
      "Urban Fade Studio",
      "Barbearia Império",
      "Kingsman Barbearia",
    ];

    const addresses = [
      "Rua Silva Paulet, 123 - Aldeota",
      "Av. Dom Luís, 456 - Meireles",
      "Rua Barbosa de Freitas, 789 - Aldeota",
      "Av. Beira Mar, 1010 - Meireles",
      "Rua Monsenhor Bruno, 202 - Centro",
      "Av. Santos Dumont, 303 - Papicu",
      "Rua Tibúrcio Cavalcante, 404 - Varjota",
      "Av. Desembargador Moreira, 505 - Dionísio Torres",
      "Rua Ana Bilhar, 606 - Meireles",
      "Av. Washington Soares, 707 - Edson Queiroz",
    ];

    const services = [
      {
        name: "Corte Masculino",
        description:
          "Corte moderno com acabamento profissional, incluindo lavagem e finalização.",
        price: 70.0,
        imageUrl:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba Completa",
        description:
          "Modelagem completa com toalha quente, navalha e finalização com óleo.",
        price: 50.0,
        imageUrl:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Corte + Barba",
        description:
          "Pacote completo com corte personalizado e barba alinhada.",
        price: 110.0,
        imageUrl:
          "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      },
      {
        name: "Acabamento (Pézinho)",
        description:
          "Limpeza de contornos para manter o corte sempre alinhado.",
        price: 30.0,
        imageUrl:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha Masculina",
        description: "Modelagem discreta para realçar o olhar masculino.",
        price: 25.0,
        imageUrl:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Hidratação Capilar",
        description:
          "Tratamento profundo para recuperação dos fios e brilho natural.",
        price: 40.0,
        imageUrl:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
    ];

    const barbershops = [];

    for (let i = 0; i < 10; i++) {
      const barbershop = await prisma.barbershop.create({
        data: {
          name: creativeNames[i],
          address: addresses[i],
          imageUrl: images[i],
          phones: [
            `(85) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
              1000 + Math.random() * 9000,
            )}`,
            `(85) 3${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(
              1000 + Math.random() * 9000,
            )}`,
          ],
          description:
            "Ambiente moderno e climatizado, profissionais experientes e atendimento de alto padrão. Especializada em cortes masculinos, barba e estética, oferecendo uma experiência completa para o cliente.",
        },
      });

      for (const service of services) {
        await prisma.barbershopService.create({
          data: {
            name: service.name,
            description: service.description,
            priceInCents: service.price * 100,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      barbershops.push(barbershop);
    }

    await prisma.$disconnect();
    console.log("✅ Seed executado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
