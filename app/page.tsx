"use client";

import Header from "@/components/header";
import Image from "next/image";
import banner from "@/public/banner.png";
import BarbershopItem from "@/components/barbershop-item";
import {
  PageContainer,
  PageSectionScroller,
  PageSectionTitle,
  PageSectionContent,
} from "@/components/ui/page";
import QuickSearch from "@/components/quick-search";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";
import Link from "next/link";

export default function Home() {
  type Barbershop = {
    id: string;
    name: string;
    address: string;
    description: string;
    imageUrl: string;
    phones: string[];
  };

  const router = useRouter();

  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [popularBarbershops, setPopularBarbershops] = useState<Barbershop[]>(
    [],
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("/api/barbershops");
      const data = await res.json();
      setBarbershops(data.barbershops);
      setPopularBarbershops(data.popularBarbershops);
      setLoading(false);
    }
    fetchData();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!search) return;
    router.push(`/barbearias/search/${encodeURIComponent(search)}`);
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />

      <PageContainer>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            className="border-border h-11 rounded-full px-4"
            placeholder="Buscar barbearia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button type="submit" className="h-11 w-11 rounded-full">
            <Search className="size-5" />
          </Button>
        </form>

        <QuickSearch />

        <PageSectionContent>
          <Link href="/barbearias" className="block">
            <Image
              src={banner}
              alt="Agende nos melhores com a Aparatus"
              className="w-full rounded-2xl object-cover"
              priority
            />
          </Link>
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Barbearias</PageSectionTitle>

          {loading ? (
            <Loading />
          ) : (
            <PageSectionScroller>
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </PageSectionScroller>
          )}
        </PageSectionContent>

        <PageSectionContent>
          <PageSectionTitle>Mais populares</PageSectionTitle>

          {loading ? (
            <Loading />
          ) : (
            <PageSectionScroller>
              {popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </PageSectionScroller>
          )}
        </PageSectionContent>
      </PageContainer>

      <Footer />
    </div>
  );
}
