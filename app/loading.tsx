import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image src="/logo.svg" alt="Aparatus" width={91} height={24} />
    </div>
  );
}
