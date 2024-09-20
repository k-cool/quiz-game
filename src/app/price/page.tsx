"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useScoreStore from "@/store/score";
import Flipper, { FlipperRefHandle } from "@/components/Flipper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRICE_DATA } from "@/data/priceQuiz";

export default function pricePage() {
  const router = useRouter();
  const { didSetting } = useScoreStore((state) => state.data);
  const flipperRef = useRef<FlipperRefHandle>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [isShownResult, setIsShownResult] = useState(false);

  if (!didSetting)
    return (
      <div className="flex flex-col items-center mt-[350px] h-full text-4xl gap-[30px]">
        <span>참가자 설정을 먼저 하고 와주세요~!</span>
        <Button
          className="w-[200px] h-[48px] bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white"
          onClick={() => router.push("/setting")}
        >
          참가자 설정하러 가기
        </Button>
      </div>
    );

  if (currentQuiz > PRICE_DATA.length - 1)
    return (
      <div className="flex flex-col items-center mt-[350px] h-full text-4xl gap-[30px]">
        <span>수고하셨습니다~! 다음 게임으로 넘어가시쥬~! 👏</span>
        <Button
          className="w-[200px] h-[48px] bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white"
          onClick={() => router.push("/place")}
        >
          다음 게임
        </Button>
      </div>
    );

  const handleClickResult = () => {
    if (!flipperRef.current) return;

    flipperRef.current.flip();
    setIsShownResult(true);
  };

  const handleClickNext = () => {
    if (!flipperRef.current) return;

    setCurrentQuiz((prev) => prev + 1);
    flipperRef.current.flip();
    setIsShownResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-4xl gap-[30px]">
      <div className="text-4xl">{PRICE_DATA[currentQuiz].alt}</div>
      <Flipper
        ref={flipperRef}
        data={PRICE_DATA[currentQuiz]}
        isShownResult={isShownResult}
      />
      <div className="text-4xl">{PRICE_DATA[currentQuiz].description}</div>

      <Button
        className={cn(
          isShownResult && "pointer-events-none bg-neutral-200 text-neutral-400"
        )}
        onClick={handleClickResult}
      >
        정답
      </Button>

      <div className="h-[100px]">
        {isShownResult && (
          <Button
            className="w-[200px] h-[48px] bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white"
            onClick={handleClickNext}
          >
            다음 문제
          </Button>
        )}
      </div>
    </div>
  );
}
