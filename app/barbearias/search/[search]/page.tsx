"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatSearchForText } from "@/lib/utils";
import BarbershopItem from "@/components/barbershop-item";
import Loading from "@/app/loading";
import BackButton from "@/components/back-button";
import {
  PageContainer,
  PageSectionContent,
  PageSectionTitle,
} from "@/components/ui/page";
import Footer from "@/components/footer";

export default function SearchPage() {
  const params = useParams();
  const searchParam =
    typeof params.search === "string"
      ? params.search
      : Array.isArray(params.search)
        ? params.search[0]
        : "";
  const [search, setSearch] = useState(searchParam);

  type Barbershop = {
    id: string;
    name: string;
    address: string;
    description: string;
    imageUrl: string;
    phones: string[];
  };

  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearch(searchParam);
  }, [searchParam]);

  if (loading) {
    <Loading />;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/barbershops?search=${encodeURIComponent(search)}`,
      );
      const data = await res.json();
      setBarbershops(data.barbershops);
      setLoading(false);
    };
    fetchData();
  }, [search]);

  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        {loading ? (
          <Loading />
        ) : (
          <PageContainer>
            <PageSectionContent>
              <BackButton />
              <PageSectionTitle>
                Resultados para "{formatSearchForText(search)}"
              </PageSectionTitle>
              <div className="flex flex-col gap-4">
                {barbershops.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
              </div>
            </PageSectionContent>
          </PageContainer>
        )}
      </div>
      <Footer />
    </>
  );
}
