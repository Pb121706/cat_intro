import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 bg-pink-100/80 text-rose-800">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 md:py-12 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-xl font-bold text-pink-600">🐾 毛茸茸小山竹聚集地</p>
          <p className="mt-3 leading-7 text-rose-700">
            分享貓咪的可愛日常與照顧知識，用愛守護每一隻毛孩。
          </p>
        </div>

        <div>
          <p className="font-semibold text-pink-600">快速連結</p>
          <ul className="mt-3 space-y-2 text-rose-700">
            <li><Link href="/#breeds" className="hover:text-pink-500">貓咪品種</Link></li>
            <li><Link href="/#gallery" className="hover:text-pink-500">萌照相簿</Link></li>
            <li><Link href="/#facts" className="hover:text-pink-500">趣味小知識</Link></li>
            <li><Link href="/#tips" className="hover:text-pink-500">照顧小撇步</Link></li>
            <li><Link href="/blog" className="hover:text-pink-500">部落格</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-pink-600">小提醒</p>
          <p className="mt-3 leading-7 text-rose-700">
            以領養代替購買 💗<br />
            照片來源：
            <a
              href="https://unsplash.com/s/photos/cat"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-pink-300 underline-offset-2 hover:text-pink-500"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-pink-200 px-4 py-5 text-center text-sm text-rose-500">
        © 2026 毛茸茸小山竹聚集地 · Made with 💕
      </div>
    </footer>
  );
}
