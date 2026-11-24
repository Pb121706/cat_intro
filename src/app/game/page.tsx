import type { Metadata } from "next";
import CatCatchGame from "@/components/CatCatchGame";

export const metadata: Metadata = {
  title: "接貓咪小遊戲｜毛茸茸小山竹聚集地",
  description: "移動籃子接住掉下來的貓咪，看看你能拿幾分！",
};

const rules = [
  { icon: "🐱", text: "接到貓咪 +1 分" },
  { icon: "😻", text: "接到愛心眼貓咪 +3 分" },
  { icon: "🥒", text: "接到小黃瓜會扣一顆愛心" },
  { icon: "💔", text: "漏接貓咪也會扣一顆愛心" },
];

export default function GamePage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50 text-rose-900">
      <section className="mx-auto max-w-5xl px-4 pb-2 pt-10 text-center sm:px-6 sm:pt-14">
        <p className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
          小山竹遊樂場 🎮
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-pink-600 sm:text-4xl lg:text-5xl">接貓咪小遊戲</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-rose-700 sm:text-lg">
          貓咪從天上掉下來了！快拿籃子接住牠們～
        </p>
      </section>

      <section className="mx-auto grid max-w-5xl items-start gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[3fr_2fr]">
        <CatCatchGame />

        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-pink-100 sm:p-6">
          <h2 className="text-xl font-bold text-pink-600">🎯 遊戲規則</h2>
          <ul className="mt-4 grid gap-3">
            {rules.map((r) => (
              <li key={r.text} className="flex items-center gap-3 leading-7 text-rose-700">
                <span className="text-2xl" aria-hidden>
                  {r.icon}
                </span>
                {r.text}
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-xl font-bold text-pink-600">🕹️ 怎麼操作</h2>
          <ul className="mt-3 grid gap-2 leading-7 text-rose-700">
            <li>電腦：移動滑鼠，或按鍵盤 ← → 鍵</li>
            <li>手機、平板：手指在畫面上左右拖曳</li>
          </ul>
          <p className="mt-6 rounded-2xl bg-pink-50 px-4 py-3 text-sm leading-6 text-rose-600">
            一共有 3 顆愛心，用完就結束。分數越高，貓咪掉得越快喔！
          </p>
        </div>
      </section>
    </div>
  );
}
