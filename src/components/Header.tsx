"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/#breeds", label: "貓咪品種" },
  { href: "/#gallery", label: "萌照相簿" },
  { href: "/#facts", label: "趣味小知識" },
  { href: "/#tips", label: "照顧小撇步" },
  { href: "/blog", label: "部落格" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // 選單打開時按 Esc 可以關閉
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-2 text-lg font-bold text-pink-500 sm:text-xl lg:text-2xl"
        >
          <span aria-hidden>🐾</span>
          <span className="truncate">毛茸茸小山竹聚集地</span>
        </Link>

        {/* 平板橫向以上：直接顯示選單 */}
        <nav className="hidden items-center gap-1 text-sm font-medium text-rose-700 md:flex lg:gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 transition hover:bg-pink-100 hover:text-pink-600"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* 手機、直向平板：漢堡選單按鈕 */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "關閉選單" : "開啟選單"}
          className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-pink-500 transition hover:bg-pink-100 focus-visible:outline-4 focus-visible:outline-pink-300 md:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden>
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition ${open ? "top-2 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-2 h-0.5 w-5 rounded bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-0.5 w-5 rounded bg-current transition ${open ? "top-2 -rotate-45" : "top-4"}`} />
          </span>
        </button>
      </div>

      {/* 手機選單 */}
      <nav
        id="mobile-menu"
        hidden={!open}
        className="border-t border-pink-100 bg-white/95 px-4 pb-4 pt-2 sm:px-6 md:hidden"
      >
        <ul className="grid gap-1 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-medium text-rose-700 transition hover:bg-pink-100 hover:text-pink-600"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
