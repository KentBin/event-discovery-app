"use client";

import { useMemo, useState } from "react";

import EventSearch from "./EventSearch";
import EventCard from "./EventCard";

import { events } from "@/types/event";

export default function EventPanel() {
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return events;
    }

    return events.filter((event) => {
      return (
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const handleEventClick = (eventId: number) => {
    console.log("Selected event:", eventId);

  };

  return (
<aside
  className="
    @container
    flex
    h-full
    w-[380px]
    flex-col
rounded-[28px]
    bg-[#F7F7F8]
    p-4
    shadow-lg
  "
>
      {/* Search */}
      <EventSearch
        value={search}
        onChange={setSearch}
      />

      {/* Event list */}
      <div
        className="
          mt-5
          flex-1
grid
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
            onClick={() => handleEventClick(event.id)}
          />
        ))}

        {filteredEvents.length === 0 && (
          <div className="col-span-2 py-10 text-center text-sm text-neutral-500">
            Không tìm thấy sự kiện phù hợp.
          </div>
        )}
      </div>
    </aside>
  );
}