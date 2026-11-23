import Image from "next/image";
import CatBurstButton from "@/components/CatBurstButton";
import Parallax from "@/components/Parallax";
import BreedPhoto from "@/components/BreedPhoto";
import LuckyDrawButton from "@/components/LuckyDrawButton";

const breeds = [
  {
    img: "/images/ragdoll.jpg",
    name: "布偶貓",
    desc: "藍眼睛加上蓬鬆長毛，被抱起來會整隻放軟，像真的布偶一樣。",
    paw: "/images/paw-ragdoll.jpg",
    pawText: "白白的手套加上深色肉球，舉起來跟你說嗨！",
  },
  {
    img: "/images/american-shorthair.jpg",
    name: "美國短毛貓",
    desc: "經典的虎斑花紋配上圓潤身形，個性開朗好相處，很適合新手飼養。",
    paw: "/images/paw-american-shorthair.jpg",
    pawText: "睡到一半伸出來的小白手，還有粉紅色的肉球。",
  },
  {
    img: "/images/devon-rex.jpg",
    name: "德文捲毛貓",
    desc: "大耳朵、大眼睛加上捲捲的短毛，像小精靈一樣調皮又黏人。",
    paw: "/images/paw-devon-rex.jpg",
    pawText: "奶油色的小短手，乖乖併攏站好。",
  },
  {
    img: "/images/norwegian-forest.jpg",
    name: "挪威森林貓",
    desc: "來自北歐的長毛貓，有防水的厚毛和蓬蓬尾巴，溫柔又聰明。",
    paw: "/images/paw-norwegian-forest.jpg",
    pawText: "正在認真舔手手洗臉，毛茸茸的橘色小爪子。",
  },
  {
    img: "/images/bengal.jpg",
    name: "孟加拉貓",
    desc: "身上有像小豹子一樣的斑點花紋，精力充沛，還很喜歡玩水。",
    paw: "/images/paw-bengal.jpg",
    pawText: "像小豹子一樣的大手，偷偷露出了小爪子！",
  },
  {
    img: "/images/british-shorthair.jpg",
    name: "英短",
    desc: "圓圓的臉、肉肉的身體，個性穩重又愛撒嬌，是療癒系代表。",
    paw: "/images/paw-british-shorthair.jpg",
    pawText: "粉嫩嫩的肉球一整排，讓人好想捏一下。",
  },
];

const gallery = [
  { img: "/images/gallery-1.jpg", alt: "坐在床上的灰白小奶貓" },
  { img: "/images/gallery-2.jpg", alt: "瞇著眼睛趴在地板上的橘貓" },
  { img: "/images/gallery-3.jpg", alt: "戴著黃色領巾開心張嘴的貓咪" },
  { img: "/images/gallery-4.jpg", alt: "黃色背景前回頭看的橘白貓" },
  { img: "/images/gallery-5.jpg", alt: "坐在白色樓梯上的長毛虎斑貓" },
  { img: "/images/gallery-6.jpg", alt: "鼻子上停著蝴蝶的長毛貓" },
];

const facts = [
  "貓咪一天大約會睡 12 到 16 個小時 💤",
  "貓咪發出呼嚕聲，通常代表牠很放鬆、很安心 🎶",
  "用頭蹭你，是在你身上留下牠的味道，表示「你是我的」💕",
  "慢慢對你眨眼睛，是貓咪版本的「我愛你」😽",
];

const tips = [
  { icon: "🥣", title: "均衡飲食", text: "選擇適合年齡的貓糧，並準備乾淨的飲水。" },
  { icon: "🧶", title: "每天陪玩", text: "逗貓棒玩 10～15 分鐘，讓牠消耗精力、心情好。" },
  { icon: "🏥", title: "定期健檢", text: "每年帶去看獸醫，打疫苗、檢查身體最安心。" },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50 text-rose-900">
      {/* 主視覺：背景圓球、腳印、文字、照片各自用不同速度移動，做出層次感 */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Parallax speed={0.45} className="absolute -left-24 -top-16">
            <div className="h-48 w-48 rounded-full bg-pink-200/60 blur-2xl sm:h-72 sm:w-72" />
          </Parallax>
          <Parallax speed={0.3} className="absolute -right-20 top-40">
            <div className="h-56 w-56 rounded-full bg-orange-200/50 blur-2xl sm:h-80 sm:w-80" />
          </Parallax>
          <Parallax speed={0.6} className="absolute left-[8%] top-[70%] text-4xl opacity-40">
            🐾
          </Parallax>
          <Parallax speed={-0.25} className="absolute right-[12%] top-6 text-3xl opacity-40">
            🐾
          </Parallax>
          <Parallax speed={0.15} className="absolute left-[46%] top-[85%] text-2xl opacity-30">
            🐾
          </Parallax>
        </div>

        <section className="relative mx-auto grid max-w-5xl items-center gap-10 px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-12 md:grid-cols-2 lg:gap-16">
          <Parallax speed={0.12} className="text-center md:text-left">
            <p className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
              歡迎光臨 ฅ^•ﻌ•^ฅ
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-pink-600 sm:text-5xl lg:text-6xl">
              毛茸茸小山竹<br />聚集地
            </h1>
            <p className="mx-auto mt-4 max-w-md text-base leading-8 text-rose-700 sm:text-lg md:mx-0">
              軟綿綿的肉球、圓滾滾的眼睛，還有聽了就融化的呼嚕聲。
              一起來認識這些可愛的毛孩吧！
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <CatBurstButton />
              <LuckyDrawButton />
            </div>
          </Parallax>
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm">
            <Parallax speed={0.1} className="absolute -inset-3" innerClassName="h-full w-full">
              <div className="h-full w-full rotate-3 rounded-[2.5rem] bg-pink-200" aria-hidden />
            </Parallax>
            <Parallax speed={-0.06} className="relative">
              <Image
                src="/images/hero-kitten.jpg"
                alt="舉起小爪子的小奶貓"
                width={800}
                height={600}
                priority
                className="aspect-square w-full rounded-[2rem] object-cover shadow-lg ring-8 ring-white"
              />
            </Parallax>
          </div>
        </section>
      </div>

      {/* 貓咪品種 */}
      <section id="breeds" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10 sm:px-6 md:py-14">
        <h2 className="mb-6 text-center text-2xl font-bold text-pink-600 sm:mb-8 sm:text-3xl">🎀 人氣貓咪品種</h2>
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {breeds.map((b) => (
            <article
              key={b.name}
              className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-pink-100 transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* 照片有視差效果，點下去會彈出這個品種的貓手 */}
              <BreedPhoto name={b.name} img={b.img} paw={b.paw} pawText={b.pawText} />
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-bold text-rose-800">{b.name}</h3>
                <p className="mt-1 leading-7 text-rose-700">{b.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 視差橫幅：背景照片移動得比捲動慢，像一扇窗 */}
      <section className="relative my-6 h-[18rem] overflow-hidden sm:my-10 sm:h-[24rem] lg:h-[28rem]">
        <Parallax speed={0.3} max={95} className="absolute inset-x-0 -inset-y-[30%]" innerClassName="relative h-full w-full">
          <Image
            src="/images/gallery-2.jpg"
            alt="瞇著眼睛趴在地板上的橘貓"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/60 via-rose-400/35 to-orange-300/20" />
        <div className="relative mx-auto flex h-full max-w-5xl items-center px-4 sm:px-6">
          <Parallax speed={-0.1} max={40}>
            <p className="text-xs font-semibold tracking-[0.2em] text-white/90 sm:text-sm">MEOW · MEOW</p>
            <p className="mt-3 max-w-md text-2xl font-extrabold leading-snug text-white drop-shadow-md sm:text-3xl lg:text-4xl">
              每一隻貓咪，<br />都是一顆毛茸茸的小山竹 🐾
            </p>
          </Parallax>
        </div>
      </section>

      {/* 萌照相簿 */}
      <section id="gallery" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10 sm:px-6 md:py-14">
        <h2 className="mb-6 text-center text-2xl font-bold text-pink-600 sm:mb-8 sm:text-3xl">📸 萌照相簿</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <div key={g.img} className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm ring-2 ring-white sm:ring-4">
              <Parallax
                speed={i % 2 === 0 ? 0.08 : -0.08}
                max={28}
                className="absolute inset-x-0 -inset-y-[12%]"
                innerClassName="relative h-full w-full"
              >
                <Image
                  src={g.img}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 768px) 320px, 50vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </Parallax>
            </div>
          ))}
        </div>
      </section>

      {/* 趣味小知識 */}
      <section id="facts" className="relative mx-auto max-w-5xl scroll-mt-20 px-4 py-10 sm:px-6 md:py-14">
        <Parallax speed={0.35} className="pointer-events-none absolute right-0 top-0 hidden text-6xl opacity-25 sm:block" innerClassName="rotate-12">
          🐾
        </Parallax>
        <div className="grid items-center gap-6 rounded-[2rem] bg-pink-100/70 p-5 sm:gap-8 sm:p-8 lg:grid-cols-[2fr_3fr] lg:p-10">
          {/* 手機、平板：寬版照片放上面；電腦：方形照片放左邊 */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-4 ring-white lg:aspect-square">
            <Parallax speed={0.1} max={40} className="absolute inset-x-0 -inset-y-[15%]" innerClassName="relative h-full w-full">
              <Image
                src="/images/sleepy-cat.jpg"
                alt="睡得很香的橘貓"
                fill
                sizes="(min-width: 1024px) 360px, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-bold text-pink-600 sm:mb-6 sm:text-3xl">💡 貓咪趣味小知識</h2>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-1">
              {facts.map((f) => (
                <li key={f} className="rounded-2xl bg-white/80 px-5 py-3 leading-7 text-rose-800">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 照顧小撇步 */}
      <section id="tips" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-10 sm:px-6 md:py-14">
        <h2 className="mb-6 text-center text-2xl font-bold text-pink-600 sm:mb-8 sm:text-3xl">🏡 照顧小撇步</h2>
        {/* 手機、直向平板：圖示在左的橫向卡片；橫向平板以上：三欄直式卡片 */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {tips.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-pink-100 md:flex-col md:p-6 md:text-center"
            >
              <div className="shrink-0 text-4xl md:text-5xl">{t.icon}</div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-rose-800">{t.title}</h3>
                <p className="mt-1 leading-7 text-rose-700 md:mt-2">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
