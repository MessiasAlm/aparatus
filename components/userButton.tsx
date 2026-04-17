"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { FiLogIn } from "react-icons/fi";
import { GoogleSignButton } from "./google-sign-button";

export function UserButton() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div></div>;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <GoogleSignButton />
      </div>
    );
  }

  const user = session.user;

  return (
    <div>
      {/*<Image
          src={user.image ?? "/avatar.png"}
          width={32}
          height={32}
          className="rounded-full"
          alt="avatar"
        />*/}
      <h2 className="text-lg font-bold"> Olá, {user.name}</h2>
    </div>
  );
}

export default UserButton;
