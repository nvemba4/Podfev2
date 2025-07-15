import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Data types
type MainNews = {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
};
type Destaque = {
  image?: string;
  category?: string;
  title?: string;
};
type RecentNews = {
  id: number;
  image: string;
  category: string;
  title: string;
};
type Ad = {
  image: string;
  alt: string;
};

type NoticiasPublicidadeData = {
  mainNews: MainNews;
  destaques: Destaque[];
  recentNews: RecentNews[];
  ads: Ad[];
};

export default function NoticiasePublicidade() {
  const router = useRouter();
  const [data, setData] = useState<NoticiasPublicidadeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/noticias-publicidade")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Car
    regando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!data) return <div>Nenhum dado encontrado.</div>;

  const { mainNews, destaques, recentNews, ads } = data;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Column 1: Main News (col-span-8) */}
      <div className="md:col-span-8 flex flex-col">
        <div className="bg-white shadow-lg overflow-hidden mb-6 flex flex-col">
          <div className="relative group">
            <img
              src={mainNews.image}
              alt="Main News"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link href={"/noticias"}>
                <Button variant="outline" className="rounded-full bg-white/70 hover:bg-white text-black font-semibold px-6 py-2 text-lg shadow-lg backdrop-blur border-none">
                  Ler mais
                </Button>
              </Link>
            </div>
          </div>
          <div className="p-8 flex-1 flex flex-col">
            <span className="text-red-600 font-semibold text-base mb-2 block">{mainNews.category}</span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {mainNews.title}
            </h2>
            <p className="text-gray-700 text-base flex-1">
              {mainNews.description}
            </p>
          </div>
        </div>
      </div>
      {/* Column 2: Recent News (col-span-2) */}
      <div className="md:col-span-2 flex flex-col gap-9 ">
        {recentNews.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-white shadow overflow-hidden cursor-pointer"
            onClick={() => router.push(`/eventos?id=${item.id}`)}
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
              />
            ) : null}
            <div className="flex flex-col justify-end p-3 flex-1 bg-white shadow-lg overflow-hidden">
              <span className="text-red-600 text-xs font-semibold mb-1">{item.category}</span>
              <h4 className="text-base font-medium leading-tight">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
        <Link href="/eventos" className="-mt-10">
          <p className="w-full text-red-600 py-2  text-center rounded font-semibold  transition">Ver mais</p>
        </Link>
      </div>
      {/* Column 3:   Ads   (col-span-2) */}
      <aside className="md:col-span-2 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {ads.slice(0, 3).map((ad, idx) => (
            <div key={idx} className="shadow overflow-hidden">
              <img src={ad.image} alt={ad.alt} className="w-full object-cover" />
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
} 