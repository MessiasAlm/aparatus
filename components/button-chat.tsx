import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "./ui/button";

{
  /*export const ButtonChat = () => {
  return (
    <div className="fixed right-5 bottom-20 z-50">
      <Link href="/chat">
        <Button variant="default" size="icon-lg" className="border-gray-50">
          <BotMessageSquare className="size-5" />
        </Button>
      </Link>
    </div>
  );
};*/
}

interface ButtonWhatsProps {
  phoneNumber: string;
}

export const ButtonWhatsapp = ({ phoneNumber }: ButtonWhatsProps) => {
  return (
    <div className="fixed right-5 bottom-6 z-50">
      <Link
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          variant="default"
          size="icon-lg"
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full"
        >
          <FaWhatsapp className="size-6 text-white" />
        </Button>
      </Link>
    </div>
  );
};
