"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { UserButton } from "./userButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-background border-border sticky top-0 z-30 border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/">
            <Image src="/logo.svg" alt="Aparatus" width={100} height={28} />
          </Link>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(true)}
            className="h-10 w-10"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`bg-background border-border fixed top-0 right-0 z-50 h-screen w-full transform border-l transition-transform duration-300 ease-in-out sm:max-w-sm ${isMenuOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex items-center justify-between p-5">
          <UserButton />

          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        <div className="bg-border h-px w-full" />

        <nav className="flex flex-col gap-2 px-5 py-6">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:bg-accent rounded-md px-3 py-3 text-sm font-medium transition"
          >
            Home
          </Link>

          <Link
            href="/barbearias"
            onClick={() => setIsMenuOpen(false)}
            className="hover:bg-accent rounded-md px-3 py-3 text-sm font-medium transition"
          >
            Barbearias
          </Link>

          <Link
            href="/agendamentos"
            onClick={() => setIsMenuOpen(false)}
            className="hover:bg-accent rounded-md px-3 py-3 text-sm font-medium transition"
          >
            Agendamentos
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;
