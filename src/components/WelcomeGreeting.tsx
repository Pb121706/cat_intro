"use client";

import { useEffect, useRef, useSyncExternalStore, type FormEvent } from "react";

const STORAGE_KEY = "visitor-name";
const CHANGE_EVENT = "visitor-name-change";

// 稱呼存在瀏覽器裡，下次再來就不用重新輸入
function readName(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveName(name: string) {
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // 無痕模式等情況存不進去也沒關係
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** 首頁的歡迎標籤：第一次進來會跳出視窗問稱呼，之後顯示「歡迎你~ 稱呼」 */
export default function WelcomeGreeting() {
  // undefined：伺服器端還不知道；null：還沒輸入過；""：選擇略過
  const name = useSyncExternalStore<string | null | undefined>(subscribe, readName, () => undefined);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 第一次來（還沒有稱呼）就自動跳出輸入視窗
  useEffect(() => {
    if (name === null && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [name]);

  const openDialog = () => {
    if (inputRef.current) inputRef.current.value = name ?? "";
    dialogRef.current?.showModal();
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (inputRef.current?.value ?? "").trim();
    if (!value) {
      inputRef.current?.focus();
      return;
    }
    saveName(value);
    dialogRef.current?.close();
  };

  const skip = () => {
    // 略過的話存空字串，就不會每次都再問
    if (name === null) saveName("");
    dialogRef.current?.close();
  };

  return (
    <>
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
        <p className="inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
          {name ? (
            <>
              歡迎你~ <strong className="font-bold">{name}</strong> ฅ^•ﻌ•^ฅ
            </>
          ) : (
            "歡迎光臨 ฅ^•ﻌ•^ฅ"
          )}
        </p>
        {name !== undefined && (
          <button
            type="button"
            onClick={openDialog}
            className="cursor-pointer rounded-full px-2 py-1 text-xs text-pink-500 underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-pink-300"
          >
            {name ? "改稱呼" : "輸入稱呼"}
          </button>
        )}
      </div>

      <dialog
        ref={dialogRef}
        onCancel={(e) => {
          // 按 Esc 視同略過
          e.preventDefault();
          skip();
        }}
        aria-labelledby="welcome-title"
        className="paw-dialog m-auto w-[min(92vw,24rem)] overflow-visible rounded-[2rem] bg-transparent p-0 backdrop:bg-rose-900/40 backdrop:backdrop-blur-sm"
      >
        <form
          onSubmit={submit}
          className="paw-pop rounded-[2rem] bg-white p-6 text-center text-rose-900 shadow-2xl ring-8 ring-pink-100"
        >
          <div className="text-5xl" aria-hidden>
            🐱
          </div>
          <h2 id="welcome-title" className="mt-3 text-xl font-bold text-pink-600">
            喵～歡迎來到小山竹聚集地！
          </h2>
          <label htmlFor="visitor-name" className="mt-2 block leading-7 text-rose-700">
            請問要怎麼稱呼你呢？
          </label>
          <input
            ref={inputRef}
            id="visitor-name"
            type="text"
            maxLength={20}
            autoComplete="nickname"
            placeholder="例如：小山竹的鏟屎官"
            defaultValue={name ?? ""}
            autoFocus
            className="mt-3 w-full rounded-full border-2 border-pink-200 bg-pink-50/50 px-5 py-2.5 text-center text-rose-900 outline-none transition placeholder:text-rose-300 focus:border-pink-400 focus:bg-white"
          />
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="submit"
              className="cursor-pointer rounded-full bg-pink-400 px-6 py-2 font-semibold text-white transition hover:bg-pink-500 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
            >
              確定
            </button>
            <button
              type="button"
              onClick={skip}
              className="cursor-pointer rounded-full bg-pink-50 px-6 py-2 font-semibold text-pink-600 ring-1 ring-pink-200 transition hover:bg-pink-100 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
            >
              {name ? "取消" : "先略過"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
