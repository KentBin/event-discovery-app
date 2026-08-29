import Image from "next/image";
import { PiCalendarDotsLight, PiMapPin, PiSparkle } from "react-icons/pi";
import type { EventItem } from "@/types/event";

type EventCardProps = {
  event: EventItem;
  onClick?: () => void;
};

export default function EventCard({
  event,
  onClick,
}: EventCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        w-full
        overflow-hidden
        rounded-xl
        bg-white
        text-left
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      {/* Image */}
      <div className="relative h-[96px] w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

        {/* Temperature badge */}
        <div
          className="
            absolute
            right-2
            top-2
            flex
            items-center
            gap-1
            rounded-full
            bg-white
            px-2
            py-1
            text-[11px]
            font-semibold
            text-neutral-700
            shadow-sm
          "
        >
          <PiSparkle className="h-3 w-3 text-orange-500" />

          {event.temperature}
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5">
        {/* Title */}
        <h3
          className="
            line-clamp-2
            min-h-[38px]
            text-[13px]
            font-medium
            leading-[19px]
            text-neutral-800
          "
        >
          {event.title}
        </h3>

        <div className="mt-2 space-y-1">
          {/* Date */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <PiCalendarDotsLight className="h-3 w-3 shrink-0 text-red-500" />

            <span className="truncate">
              {event.date}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
            <PiMapPin className="h-3 w-3 shrink-0 text-red-500" />

            <span className="truncate">
              {event.location}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}