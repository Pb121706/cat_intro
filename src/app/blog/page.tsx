import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "貓咪部落格｜毛茸茸小山竹聚集地",
  description: "養貓新手指南、貓咪行為解讀與健康照護小知識。",
};

export default function BlogPage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50 text-rose-900">
      <section className="mx-auto max-w-5xl px-4 pb-4 pt-10 text-center sm:px-6 sm:pt-14">
        <p className="mb-3 inline-block rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
          小山竹日記 📖
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-pink-600 sm:text-4xl lg:text-5xl">貓咪部落格</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-rose-700 sm:text-lg">
          跟貓咪一起生活的大小事，都寫在這裡了。
        </p>
      </section>

      {/* 手機一欄、平板兩欄（第三篇橫跨整排）、電腦三欄 */}
      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-8 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-10 lg:grid-cols-3 lg:gap-8">
        {posts.map((post, i) => {
          // 平板兩欄時，如果最後一篇落單，就橫跨整排並改成左圖右文
          const wide = i === posts.length - 1 && posts.length % 2 === 1;
          return (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-pink-100 transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-4 focus-visible:outline-pink-300 ${
              wide ? "sm:col-span-2 sm:flex-row lg:col-span-1 lg:flex-col" : ""
            }`}
          >
            <div className={`relative aspect-[4/3] overflow-hidden ${wide ? "sm:w-1/2 sm:shrink-0 lg:w-full" : ""}`}>
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-pink-600">
                {post.tag}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="text-sm text-rose-500">
                {formatDate(post.date)} · 約 {post.readMinutes} 分鐘
              </p>
              <h2 className="mt-2 text-xl font-bold leading-snug text-rose-800 group-hover:text-pink-600">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 leading-7 text-rose-700">{post.excerpt}</p>
              <span className="mt-5 font-semibold text-pink-500">閱讀文章 →</span>
            </div>
          </Link>
          );
        })}
      </section>
    </div>
  );
}
