"use client";

import Image from "next/image";
import { PiArrowLeftLight, PiCalendarDotsLight, PiHouse, PiMapPin, PiBookmarkBold, PiSparkle, PiGridFour } from "react-icons/pi";

import type { EventItem } from "@/types/event";

type EventDetailProps = {
  event: EventItem;
  onBack: () => void;
};

export default function EventDetail({
  event,
  onBack,
}: EventDetailProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Top controls */}
      <div className="flex shrink-0 items-center justify-between px-1 pb-5">
        <button
          type="button"
          onClick={onBack}
          className="
  flex
  h-10
  items-center
  gap-2
  rounded-full
  border
  border-neutral-200
  bg-white
  px-4
  text-sm
  font-medium
  text-neutral-800
  shadow-sm
  transition
  hover:bg-neutral-50
"
        >
          <PiArrowLeftLight className="h-4 w-4" />
          Quay lại
        </button>

        <button
          className="
  flex
  h-10
  w-10
  items-center
  justify-center
  rounded-full
  border
  border-neutral-200
  bg-white
  text-neutral-800
  shadow-sm
  transition
  hover:bg-neutral-50
"
          aria-label="Trang chủ"
        >
          <PiHouse className="h-4 w-4" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="min-h-0 flex-1 overflow-y-auto px-1 pb-5">
        {/* Image */}
        <div className="relative h-[150px] w-full overflow-hidden rounded-[20px]">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />

          {/* Temperature badge */}
          <div
            className="
              absolute
              right-4
              top-4
              flex
              items-center
              gap-2
              rounded-full
              bg-white/95
              px-4
              py-2
              text-xl
              font-medium
              text-neutral-800
              shadow-sm
            "
          >
            <PiSparkle className="h-6 w-6 text-orange-400" />
            {event.temperature}
          </div>
        </div>

        {/* Category */}
        <div className="mt-5">
          <div
            className="
    inline-flex
    items-center
    gap-1.5
    rounded-md
    bg-red-700
    px-3
    py-1.5
    text-xs
    font-semibold
    text-white
            "
          >
            <PiGridFour className="h-3 w-3" />
            {event.category}
          </div>
        </div>

        {/* Title */}
        <h1
          className="
            mt-4
            text-[21px]
            font-medium
            leading-tight
            tracking-tight
            text-neutral-900
          "
        >
          {event.title}
        </h1>

        {/* Separator */}
        <div className="my-5 h-px w-full bg-red-100" />

        {/* Date + location */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-500">
          <div className="flex items-center gap-2">
            <PiCalendarDotsLight className="h-4 w-4 text-red-700" />

            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <PiMapPin className="h-5 w-5 text-red-700" />

            <span>{event.location}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5 space-y-4">
          {event.description
            .split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p
                key={index}
                className="
text-sm
leading-6
                  text-neutral-700
                "
              >
                {paragraph}
              </p>
            ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex shrink-0 gap-3 border-t border-neutral-200 pt-4">
        <button
          type="button"
          className="
            flex
            h-11
            flex-1
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-neutral-300
            bg-white
            text-sm
            font-medium
            text-neutral-800
            transition
            hover:bg-neutral-50
          "
        >
          Chỉ đường
        </button>

        <button
          type="button"
          className="
            flex
            h-11
            flex-1
            items-center
            justify-center
            gap-2
            rounded-full
            bg-red-700
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition
            hover:bg-red-800
          "
        >
          <PiBookmarkBold className="h-4 w-4 fill-current" />
          Quan tâm sự kiện
        </button>
      </div>
    </div>
  );
}