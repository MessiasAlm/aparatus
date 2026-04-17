import { getBookings } from "@/data/barbershops";
import BookingItem from "@/components/booking-item";
import BackButton from "@/components/back-button";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import Footer from "@/components/footer";

export default async function Page() {
  const bookings = await getBookings();

  return (
    <>
      <PageContainer>
        <PageSectionContent>
          <BackButton />
          <PageSectionTitle>Agendamentos</PageSectionTitle>
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </PageSectionContent>
      </PageContainer>
      <Footer />
    </>
  );
}
