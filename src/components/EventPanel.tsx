"use client";

import { useMemo, useRef, useState } from "react";

import EventSearch from "./EventSearch";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";

import { events, type EventItem } from "@/types/event";

type EventPanelProps = {
  selectedEvent: EventItem | null;
  onSelectEvent: (event: EventItem | null) => void;
};

type SheetState = "collapsed" | "half" | "full";

// % of the visible viewport height for these stages
const SHEET_HEIGHTS: Record<SheetState, number> = {
  collapsed: 14,
  half: 50,
  full: 92,
};

export default function EventPanel({
  selectedEvent,
  onSelectEvent,
}: EventPanelProps) {
  const [search, setSearch] = useState("");
  const [sheetState, setSheetState] = useState<SheetState>("half");
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef<number | null>(null);
  const isDragging = useRef(false);

  const filteredEvents = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return events;
    return events.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
    );
  }, [search]);

  // Drag handler on mobile sheet
  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY;
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStartY.current === null) return;
    const delta = e.clientY - dragStartY.current;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const vh = window.innerHeight;
    const draggedPercent = (dragOffset / vh) * 100;
    const order: SheetState[] = ["collapsed", "half", "full"];
    const currentIndex = order.indexOf(sheetState);

    // drag range to exand or collapse
    if (draggedPercent < -8 && currentIndex < order.length - 1) {
      setSheetState(order[currentIndex + 1]);
    } else if (draggedPercent > 8 && currentIndex > 0) {
      setSheetState(order[currentIndex - 1]);
    }

    setDragOffset(0);
    dragStartY.current = null;
  };

  const heightVh = SHEET_HEIGHTS[sheetState];

  // ShARED
  const content = selectedEvent ? (
    <EventDetail event={selectedEvent} onBack={() => onSelectEvent(null)} />
  ) : (
    <>
      <EventSearch value={search} onChange={setSearch} />
      <div
        className="
          @container
          mt-5
          grid
          min-h-0
          flex-1
          grid-cols-1
          @[340px]:grid-cols-2
          content-start
          gap-3
          overflow-y-auto
          pr-1
        "
      >
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onClick={() => onSelectEvent(event)}
          />
        ))}
        {filteredEvents.length === 0 && (
          <div className="col-span-full py-10 text-center text-sm text-neutral-500">
            Không tìm thấy sự kiện phù hợp.
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* DESKTOP: floating left panel */}
      <div className="absolute bottom-0 left-4 top-4 z-10 hidden md:block">
      <aside
        className="
          @container
          h-full
          w-[380px]
          min-w-0
          flex
          flex-col
          overflow-hidden
          rounded-[28px]
          bg-[#F7F7F8]
          p-4
          shadow-xl
        "
      >
        {content}
      </aside>
      </div>
      {/* MOBILE: bottom sheet */}
      <div
        className="
          @container
          fixed
          inset-x-0
          bottom-0
          z-20
          flex
          flex-col
          overflow-hidden
          rounded-t-[28px]
          bg-[#F7F7F8]
          shadow-2xl
          md:hidden
        "
        style={{
          height: `${heightVh}vh`,
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset === 0 ? "height 0.3s ease" : "none",
        }}
      >
        {/* Drag handle */}
        <div
          className="flex shrink-0 cursor-grab touch-none justify-center py-3 active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="h-1.5 w-10 rounded-full bg-neutral-300" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-4 pb-4">
          {content}
        </div>
      </div>
    </>
  );
}