"use client";

import { useRef, useState, type CSSProperties } from "react";

// 會噴出來的小貓頭：一半是 emoji，一半是網站上的真貓照片
const EMOJIS = ["😺", "😸", "😻", "😽", "🐱", "😹"];
const PHOTOS = [
  "/images/ragdoll.jpg",
  "/images/american-shorthair.jpg",
  "/images/british-shorthair.jpg",
  "/images/hero-kitten.jpg",
  "/images/gallery-1.jpg",
  "/images/bengal.jpg",
];

type Cat = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  delay: number;
  emoji?: string;
  photo?: string;
};

const COUNT = 28;
const DURATION = 1600;

export default function CatBurstButton() {
  const [cats, setCats] = useState<Cat[]>([]);
  const nextId = useRef(0);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const burst: Cat[] = Array.from({ length: COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 220;
      const usePhoto = Math.random() < 0.5;
      return {
        id: nextId.current++,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 60, // 稍微往上噴
        rot: (Math.random() - 0.5) * 540,
        size: 32 + Math.random() * 28,
        delay: Math.random() * 150,
        ...(usePhoto
          ? { photo: PHOTOS[Math.floor(Math.random() * PHOTOS.length)] }
          : { emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)] }),
      };
    });

    const ids = new Set(burst.map((c) => c.id));
    setCats((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setCats((prev) => prev.filter((c) => !ids.has(c.id)));
    }, DURATION + 200);

    // 小貓頭噴出一下後，再捲到貓咪品種
    setTimeout(() => {
      document.getElementById("breeds")?.scrollIntoView({ behavior: "smooth" });
    }, 700);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="mt-8 inline-block cursor-pointer rounded-full bg-pink-400 px-8 py-3 font-semibold text-white shadow-md shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-500 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-pink-300 active:scale-95"
      >
        開始認識貓咪 🐾
      </button>

      <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
        {cats.map((c) => (
          <span
            key={c.id}
            className="cat-burst absolute flex items-center justify-center"
            style={
              {
                left: c.x,
                top: c.y,
                width: c.size,
                height: c.size,
                fontSize: c.size * 0.85,
                "--dx": `${c.dx}px`,
                "--dy": `${c.dy}px`,
                "--rot": `${c.rot}deg`,
                animationDuration: `${DURATION}ms`,
                animationDelay: `${c.delay}ms`,
              } as CSSProperties
            }
          >
            {c.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.photo}
                alt=""
                className="h-full w-full rounded-full object-cover ring-2 ring-white shadow-md"
              />
            ) : (
              c.emoji
            )}
          </span>
        ))}
      </div>
    </>
  );
}
