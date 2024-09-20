"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import useScoreStore from "@/store/score";
import ScoreBoard from "./ScoreBoard";

export type SNBMenuData = {
  id: string;
  name: string;
  href: string;
};

const MENU_DATA: SNBMenuData[] = [
  {
    id: "main",
    name: "🏡 메인",
    href: "/",
  },
  {
    id: "setting",
    name: "⚙️ 게임 참가자 설정",
    href: "/setting",
  },
  {
    id: "price",
    name: "💵 가격을 맞춰라!",
    href: "/price",
  },
  {
    id: "place",
    name: "🏞️ 장소를 맞춰라!",
    href: "/place",
  },
];

export default function SNB() {
  const pathname = usePathname();
  const { didSetting } = useScoreStore((state) => state.data);

  return (
    <div className="fixed l-0 t-0 w-[180px] h-[100vh] bg-slate-300">
      <div className="w-full h-[48px] mb-[20px] flex items-center justify-center gap-[10px]">
        <span className="text-lg">🎉 집들이 퀴즈! 🎉</span>
      </div>

      <div>
        {MENU_DATA.map((menu) => {
          return (
            <MenuItem
              key={menu.id}
              name={menu.name}
              href={menu.href}
              isSelected={pathname.includes(menu.id)}
            />
          );
        })}
      </div>

      <Drawer>
        {didSetting && (
          <DrawerTrigger className="absolute bottom-[20px] l-[20px] w-full flex items-center justify-center hover:scale-150 transition-all duration-200">
            <span>💯 스코어 💯</span>
          </DrawerTrigger>
        )}
        <DrawerContent className="bg-white">
          <div className="py-[50px]">
            <ScoreBoard />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

type MenuItemProps = {
  name: string;
  href: string;
  isSelected: boolean;
};

const MenuItem = ({ name, href, isSelected }: MenuItemProps) => {
  return (
    <Link href={href}>
      <div
        className={cn(
          "hover:bg-white px-[20px] py-[8px]",
          isSelected && "bg-white"
        )}
      >
        {name}
      </div>
    </Link>
  );
};
