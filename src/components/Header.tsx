"use client";

import { useState } from "react";
import { PiCaretDown, PiMapTrifold, PiMapPin, PiUser } from "react-icons/pi";
import Image from "next/image";
import emblem from "@/assets/images/vietnam_national_emblem.png";
import title from "@/assets/images/title.png";

const NAV_ITEMS = [
    { id: "public", label: "Bản đồ công khai", icon: PiMapTrifold },
    { id: "local", label: "Theo địa phương", icon: PiMapPin },
    { id: "passport", label: "Hộ chiếu văn hóa", icon: PiMapPin },
] as const;
type NavId = (typeof NAV_ITEMS)[number]["id"];

export default function Header() {
    const [activeNav, setActiveNav] = useState<NavId>("public");
    return (
        <header className="relative overflow-hidden bg-[#A90000]">
            <div className="relative mx-auto max-w-[1440px] px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8 lg:pt-7">
                {/* Top row */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                    {/* LEFT: Emblem + title */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full sm:h-16 sm:w-16">
                            <Image
                                src={emblem}
                                alt="Emblem"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="min-w-0">
                            {/* Small text can stay as text */}
                            <p className="mb-1 text-[9px] font-medium uppercase leading-tight tracking-wide text-white sm:text-[10px]">
                                Bộ Văn hóa, Thể thao và Du lịch — Nền tảng dùng chung
                                (V-Culture Map)
                            </p>

                            <div className="min-w-0">
                                <Image
                                    src={title}
                                    alt="NGÀY VĂN HÓA VIỆT NAM"
                                    className="h-auto max-h-8 w-auto max-w-full sm:max-h-10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: actions */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {/* Countdown */}
                        <div className="flex h-10 items-center rounded-md bg-white px-3 text-xs text-neutral-600 shadow-sm sm:h-11 sm:px-4 sm:text-sm">
                            <span className="hidden sm:inline">
                                Còn lại đến Ngày Văn hóa Việt Nam
                            </span>
                            <span className="sm:hidden">Còn lại</span>

                            <span className="ml-1 font-semibold text-red-600 whitespace-nowrap">
                                93 ngày 10 giờ
                            </span>
                        </div>

                        {/* Language selector */}
                        <button
                            type="button"
                            className="flex h-10 items-center gap-2 rounded-md bg-white px-3 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 sm:h-11 sm:gap-3 sm:px-4 sm:text-sm"
                        >
                            {/* Vietnam flag placeholder */}
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-600 text-[9px] text-yellow-300 sm:h-5 sm:w-5 sm:text-[10px]">
                                ★
                            </span>

                            <span className="hidden sm:inline">Tiếng Việt</span>
                            <span className="sm:hidden">VI</span>

                            <PiCaretDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>

                        {/* Login */}
<button
    type="button"
    className="flex h-10 items-center gap-2 rounded-md bg-white px-3 text-xs font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 sm:h-11 sm:px-5 sm:text-sm"
>
    <PiUser className="h-4 w-4 sm:h-5 sm:w-5" />
    <span className="hidden sm:inline">Đăng nhập</span>
</button>
                    </div>
                </div>

                {/* Navigation bar */}
{/* Navigation bar */}
<div className="relative z-10 mt-5 pb-5 sm:mt-6 sm:pb-6 lg:mt-7 lg:pb-7">
    <nav className="flex flex-wrap items-center gap-1 rounded-2xl bg-[#F4F4F5] px-3 py-2 sm:gap-0 sm:rounded-full sm:px-5 sm:py-0 sm:h-[50px]">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
                key={id}
                type="button"
                onClick={() => setActiveNav(id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium transition sm:gap-2 sm:rounded-none sm:px-4 sm:py-0 sm:h-full sm:text-sm ${activeNav === id
                        ? "bg-red-600 text-white sm:bg-transparent sm:border-b-2 sm:border-red-600 sm:text-red-600"
                        : "text-neutral-600 hover:text-neutral-900 sm:border-b-2 sm:border-transparent"
                    }`}
            >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {label}
            </button>
        ))}
    </nav>
</div>
            </div>
        </header>
    );
}