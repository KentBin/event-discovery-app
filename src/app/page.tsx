"use client";

import { useState } from "react";
import EventPanel from "@/components/EventPanel";
import VietnamMap from "@/components/VNMap";
import type { EventItem } from "@/types/event";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#101214]">
        <div className="absolute inset-0">
          <VietnamMap selectedEvent={selectedEvent} />
        </div>

          <EventPanel
            selectedEvent={selectedEvent}
            onSelectEvent={setSelectedEvent}
          />

      </div>
    </main>
  );
}