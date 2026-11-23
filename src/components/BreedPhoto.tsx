"use client";

import Image from "next/image";
import { useRef } from "react";
import Parallax from "@/components/Parallax";

type Props = {
  name: string;
  img: string;
  paw: string;
  pawText: string;
};

/** 品種卡片的照片：點一下會彈出這個品種的貓手照片 */
export default function BreedPhoto({ name, img, paw, pawText }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`看看${name}的貓手`}
        className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-pink-300"
      >
        <Parallax speed={0.08} max={24} className="absolute inset-x-0 -inset-y-[12%]" innerClassName="relative h-full w-full">
          <Image
            src={img}
            alt={name}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </Parallax>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pink-600 shadow-sm transition group-hover:scale-105">
          點我看貓手 🐾
        </span>
      </button>

      <dialog
        ref={dialogRef}
        // 點到灰色背景（dialog 本身）就關閉
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="paw-dialog m-auto w-[min(92vw,26rem)] overflow-visible rounded-[2rem] bg-transparent p-0 backdrop:bg-rose-900/40 backdrop:backdrop-blur-sm"
      >
        <div className="paw-pop max-h-[92dvh] overflow-y-auto rounded-[2rem] bg-white p-4 text-center shadow-2xl ring-8 ring-pink-100">
          {/* 橫向手機畫面比較矮，照片改成寬版避免超出螢幕 */}
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] [@media(max-height:500px)]:aspect-[16/9]">
            <Image src={paw} alt={`${name}的貓手`} fill sizes="400px" className="object-cover" />
          </div>
          <p className="mt-4 text-xl font-bold text-pink-600">{name}的貓手 🐾</p>
          <p className="mt-1 leading-7 text-rose-700">{pawText}</p>
          <button
            type="button"
            onClick={close}
            className="mt-4 cursor-pointer rounded-full bg-pink-400 px-6 py-2 font-semibold text-white transition hover:bg-pink-500 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
          >
            好可愛，關閉
          </button>
        </div>
      </dialog>
    </>
  );
}
