"use client";

import { HiSearch } from "react-icons/hi";

type EventSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EventSearch({
  value,
  onChange,
}: EventSearchProps) {
  return (
    <div className="relative">
      <HiSearch
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          h-5
          w-5
          -translate-y-1/2
          text-neutral-500
        "
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tìm kiếm sự kiện"
        className="
          h-[42px]
          w-full
          rounded-xl
          border
          border-neutral-200
          bg-white
          pl-11
          pr-4
          text-sm
          text-neutral-800
          outline-none
          shadow-sm
          transition
          placeholder:text-neutral-400
          focus:border-red-400
          focus:ring-2
          focus:ring-red-100
        "
      />
    </div>
  );
}