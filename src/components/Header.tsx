"use client";

import { useState } from "react";
import { PiCaretDown, PiMapTrifold, PiMapPin, PiUser } from "react-icons/pi";
import Image from "next/image";
import emblem from "@/assets/images/vietnam_national_emblem.png";
import title from "@/assets/images/title.png";
export default function Header() {
    const [activeNav, setActiveNav] = useState<"public" | "local">(
        "public"
    );

    return (
        <header className="relative overflow-hidden bg-[#A90000]">

            <div className="relative mx-auto max-w-[1440px] px-8 pt-7">
                {/* Top row */}
                <div className="flex items-start justify-between gap-8">
                    {/* LEFT: Emblem + title */}
                    <div className="flex items-center gap-4">
                        {/* Replace with actual emblem later */}
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                            <Image
                                src={emblem}
                                alt="Emblem"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div>
                            {/* Small text can stay as text */}
                            <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-white">
                                Bộ Văn hóa, Thể thao và Du lịch — Nền tảng dùng chung
                                (V-Culture Map)
                            </p>

                            {/* Replace this with your title image later */}
<div className="min-w-0">
  <Image
    src={title}
    alt="NGÀY VĂN HÓA VIỆT NAM"
    className="h-auto max-h-10 w-auto max-w-full"
  />
</div>
                        </div>
                    </div>

                    {/* RIGHT: actions */}
                    <div className="flex items-center gap-3">
                        {/* Countdown */}
                        <div className="flex h-11 items-center rounded-md bg-white px-4 text-sm text-neutral-600 shadow-sm">
                            <span>Còn lại đến Ngày Văn hóa Việt Nam</span>

                            <span className="ml-1 font-semibold text-red-600">
                                93 ngày 10 giờ
                            </span>
                        </div>

                        {/* Language selector */}
                        <button
                            type="button"
                            className="flex h-11 items-center gap-3 rounded-md bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100"
                        >
                            {/* Vietnam flag placeholder */}
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] text-yellow-300">
                                ★
                            </span>

                            <span>Tiếng Việt</span>

                            <PiCaretDown className="h-4 w-4" />
                        </button>

                        {/* Login */}
                        <button
                            type="button"
                            className="flex h-11 items-center gap-2 rounded-md bg-white px-5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100"
                        >
                            <PiUser className="h-5 w-5" />
                            <span>Đăng nhập</span>
                        </button>
                    </div>
                </div>

                {/* Navigation bar */}
                <div className="mt-7 pb-7">
                    <nav className="flex h-[50px] items-center rounded-full bg-[#F4F4F5] px-5">
                        <button
                            type="button"
                            onClick={() => setActiveNav("public")}
                            className={`flex h-full items-center gap-2 border-b-2 px-4 text-sm font-medium transition ${activeNav === "public"
                                    ? "border-red-600 text-red-600"
                                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                                }`}
                        >
                            <PiMapTrifold className="h-4 w-4" />
                            <span>Bản đồ công khai</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveNav("local")}
                            className={`flex h-full items-center gap-2 border-b-2 px-4 text-sm font-medium transition ${activeNav === "local"
                                    ? "border-red-600 text-red-600"
                                    : "border-transparent text-neutral-600 hover:text-neutral-900"
                                }`}
                        >
                            <PiMapPin className="h-4 w-4" />
                            <span>Theo địa phương</span>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}