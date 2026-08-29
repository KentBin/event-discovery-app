"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
}

const TARGET_DATE = new Date("2026-11-24T00:00:00+07:00");

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = TARGET_DATE.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0 });
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      setTimeLeft({ days, hours });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="whitespace-nowrap">
      {timeLeft.days} ngày {timeLeft.hours} giờ
    </span>
  );
}