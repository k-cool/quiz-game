"use client";

import FlipperPlace, { FlipperPlaceRefHandle } from "@/components/FlipperPlace";
import { Button } from "@/components/ui/button";
import { PLACE_DATA } from "@/data/placeQuiz";
import { cn } from "@/lib/utils";
import useScoreStore from "@/store/score";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function placePage() {
  const router = useRouter();
  const { didSetting } = useScoreStore((state) => state.data);
  const flipperRef = useRef<FlipperPlaceRefHandle>(null);
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

  if (currentQuiz > PLACE_DATA.length - 1)
    return (
      <div className="flex flex-col items-center mt-[350px] h-full text-4xl gap-[30px]">
        <span>게임이 종료되었습니다~! 👏</span>
        <Button
          className="w-[200px] h-[48px] bg-purple-100 text-purple-500 hover:bg-purple-500 hover:text-white"
          onClick={() => router.push("/result")}
        >
          결과 확인
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
      <div className="text-4xl">다음 사진속 장소의 국가이름을 맞춰주세요!</div>

      <FlipperPlace
        ref={flipperRef}
        data={PLACE_DATA[currentQuiz]}
        isShownResult={isShownResult}
      />

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
