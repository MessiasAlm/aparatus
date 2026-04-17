import { NextResponse } from "next/server";
import {
  getBarbershops,
  getPopularBarbershops,
  getBarbershopByTerm,
  getServiceByTerm,
} from "@/data/barbershops";

{
  /*A rota de API aceita um parâmetro de busca (search)
   e retorna barbearias e serviços que correspondam ao termo informado.
   Se não houver termo, retorna o comportamento padrão.*/
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  if (search) {
    const [barbershops, services] = await Promise.all([
      getBarbershopByTerm(search),
      getServiceByTerm(search),
    ]);
    return NextResponse.json({ barbershops, services });
  }

  const barbershops = await getBarbershops();
  const popularBarbershops = await getPopularBarbershops();
  return NextResponse.json({ barbershops, popularBarbershops });
}
