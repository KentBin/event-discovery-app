"use client";

import { useMemo, useState } from "react";

import EventSearch from "./EventSearch";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";

import { events, type EventItem } from "@/types/event";

export default function EventPanel() {
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] =
    useState<EventItem | null>(null);

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

  return (
    <aside
      className="
        @container
        flex
        h-full
        w-[380px]
        min-w-0
        flex-col
        overflow-hidden
        rounded-[28px]
        bg-[#F7F7F8]
        p-4
        shadow-xl
      "
    >
      {/* DETAIL VIEW */}
      {selectedEvent ? (
        <EventDetail
          event={selectedEvent}
          onBack={() => setSelectedEvent(null)}
        />
      ) : (
        <>
          {/* LIST VIEW */}

          <EventSearch
            value={search}
            onChange={setSearch}
          />

          <div
            className="
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
                onClick={() => setSelectedEvent(event)}
              />
            ))}

            {filteredEvents.length === 0 && (
              <div className="col-span-full py-10 text-center text-sm text-neutral-500">
                Không tìm thấy sự kiện phù hợp.
              </div>
            )}
          </div>
        </>
      )}
    </aside>
  );
}