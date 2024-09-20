import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function mainPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-4xl gap-[30px]">
      <div className="flex flex-col items-center justify-center gap-[10px]">
        <h2>안녕하세요! </h2>
        <h2>집들이에 오신 여러분 환영합니다~! 🎉</h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-[10px]">
        <h2>집에 딱히 차린게 없어서 간단한 퀴즈를 준비해 봤어요!</h2>
        <h2>길지 않지만 재미있게 즐겨주세용~!</h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-[10px]">
        <h2>자 그럼 시작해보시죠!!</h2>

        <Link href="/setting">
          <Button className="w-[200px] h-[48px] bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white">
            시작하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
