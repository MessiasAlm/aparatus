"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      size="icon"
      className="bg-background absolute top-6 left-5 cursor-pointer"
      onClick={() => router.back()}
    >
      <ChevronLeft className="size-5" />
    </Button>
  );
};

export default BackButton;
