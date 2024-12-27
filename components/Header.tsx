import logo from "../public/img/C@merMap2.png";
import { MessageCircleQuestionIcon as QuestionMarkCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { HeaderProps } from "../types/voting";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header({ userImage = "/placeholder.svg" }: HeaderProps) {
  return (
    <header className="w-full h-[85px] bg-white shadow-sm">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger/>
          <Image src={logo} width={126} height={126} alt="logo" />
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-[#093B14] text-white hover:bg-[#093B14]/90">
            <span className="mr-1">Aide ?</span>
          </Button>

          <div className="w-[50px] h-[50px] relative rounded-full overflow-hidden">
            <Image
              src={userImage}
              alt="User profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
