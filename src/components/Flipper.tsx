"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import { EffectFlip } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";

export type FlipperData = {
  alt: string;
  src: string;
  description: string;
  price: number;
  oriPrice: number;
  unit: string;
  ratio: string;
};

export type FlipperRefHandle = {
  flip: () => void;
};

type FlipperProps = {
  data: FlipperData;
  isShownResult: boolean;
};

const Flipper = forwardRef<FlipperRefHandle, FlipperProps>(
  ({ data, isShownResult }, ref) => {
    const swiperRef = useRef<SwiperRef>(null);

    useImperativeHandle(ref, () => ({
      flip: () => {
        if (!swiperRef.current || !swiperRef.current.swiper) return;
        swiperRef.current.swiper.slideNext();
      },
      slidePrev: () => {
        if (!swiperRef.current || !swiperRef.current.swiper) return;
        swiperRef.current.swiper.slidePrev();
      },
    }));

    return (
      <Swiper
        ref={swiperRef}
        className="w-[500px] h-[500px]"
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
              "w-[500px] h-[500px] flex flex-col items-center justify-center rounded-2xl text-white",
              isShownResult && "bg-green-100 text-black"
            )}
          >
            <span className="mb-[10px] text-6xl">{`약 ${data.price.toLocaleString()}원`}</span>
            <span className="text-3xl">{`현지 가격 ${data.oriPrice.toLocaleString()} ${
              data.unit
            }`}</span>
            <span className="text-2xl text-neutral-400 ">
              {`(${data.ratio})`}
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    );
  }
);

Flipper.displayName = "Flipper";

export default Flipper;
