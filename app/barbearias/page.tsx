import { getBarbershops } from "@/data/barbershops";
import BarbershopItem from "@/components/barbershop-item";
import BackButton from "@/components/back-button";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import Footer from "@/components/footer";

const BarbershopsPage = async () => {
  const barbershops = await getBarbershops();
  return (
    <>
      <PageContainer>
        <PageSectionContent>
          <BackButton />
          <PageSectionTitle>Barbearias</PageSectionTitle>
          <div className="flex flex-col gap-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </PageSectionContent>
      </PageContainer>
      <Footer />
    </>
  );
};

export default BarbershopsPage;
