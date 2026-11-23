import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜毛茸茸小山竹聚集地`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <div className="flex-1 bg-gradient-to-b from-pink-50 via-rose-50 to-orange-50 text-rose-900">
      <article className="mx-auto max-w-3xl px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
        <Link href="/blog" className="text-sm font-medium text-pink-500 hover:text-pink-600">
          ← 回到部落格
        </Link>

        <header className="mt-6">
          <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
            {post.tag}
          </span>
          <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-pink-600 sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-rose-500">
            {formatDate(post.date)} · 約 {post.readMinutes} 分鐘閱讀
          </p>
        </header>

        <div className="relative mt-6 aspect-[16/10] overflow-hidden rounded-3xl shadow-md ring-4 ring-white sm:mt-8 sm:rounded-[2rem] sm:ring-8">
          <Image src={post.cover} alt={post.coverAlt} fill priority sizes="(min-width: 768px) 720px, 100vw" className="object-cover" />
        </div>

        <p className="mt-8 rounded-2xl bg-pink-100/70 px-5 py-4 text-base leading-8 text-rose-800 sm:mt-10 sm:px-6 sm:py-5 sm:text-lg">
          {post.excerpt}
        </p>

        <div className="mt-10 space-y-10">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="flex items-center gap-2 text-xl font-bold text-rose-800 sm:text-2xl">
                <span aria-hidden className="text-pink-400">🐾</span>
                {s.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {s.paragraphs.map((p) => (
                  <p key={p} className="text-[1.05rem] leading-8 text-rose-800/90">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6 sm:pb-16">
        <h2 className="mb-5 text-xl font-bold text-pink-600">你可能也會喜歡</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/blog/${o.slug}`}
              className="group flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-pink-100 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={o.cover} alt={o.coverAlt} fill sizes="80px" className="object-cover" />
              </div>
              <p className="min-w-0 font-semibold leading-snug text-rose-800 group-hover:text-pink-600">
                {o.title}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
