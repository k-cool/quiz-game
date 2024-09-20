"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import { EffectFlip } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";

export type FlipperPlaceData = {
  alt: string;
  src: string;
  flagSrc: string;
  country: string;
  comment: string;
};

export type FlipperPlaceRefHandle = {
  flip: () => void;
};

type FlipperPlaceProps = {
  data: FlipperPlaceData;
  isShownResult: boolean;
};

const FlipperPlace = forwardRef<FlipperPlaceRefHandle, FlipperPlaceProps>(
  ({ data, isShownResult }, ref) => {
    const swiperRef = useRef<SwiperRef>(null);

    useImperativeHandle(ref, () => ({
      flip: () => {
        if (!swiperRef.current || !swiperRef.current.swiper) return;
        swiperRef.current.swiper.slideNext();
      },
    }));

    return (
      <Swiper
        ref={swiperRef}
        className="w-[600px] h-[450px]"
        modules={[EffectFlip]}
        effect="flip"
        slidesPerView={1}
        loop
      >
        <SwiperSlide>
          <div className="relative w-full h-full">
            <Image
              className={cn(isShownResult && "opacity-0")}
              src={data.src}
              alt={data.alt}
              priority
              fill
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={cn(
              "w-[600px] h-[450px] flex flex-col items-center justify-center rounded-2xl text-white",
              isShownResult && "bg-green-100 text-black"
            )}
          >
            <div className="relative w-[350px] h-[230px] mb-[20px]">
              <Image
                className={cn(!isShownResult && "opacity-0")}
                src={data.flagSrc}
                alt={data.country}
                priority
                fill
              />
            </div>
            <span className="mb-[10px] text-6xl">{data.country}</span>
            <span className="text-3xl">{data.comment}</span>
          </div>
        </SwiperSlide>
      </Swiper>
    );
  }
);

FlipperPlace.displayName = "FlipperPlace";

export default FlipperPlace;
