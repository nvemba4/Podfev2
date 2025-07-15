'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { recentNews } from '@/mock/noticiasPublicidadeData';

export default function EventosListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  
  // If an ID is provided, show the event detail
  if (id) {
    const evento = recentNews.find(e => String(e.id) === id);
    if (!evento) return <div className="text-center py-20">Evento não encontrado.</div>;
    const related = recentNews.filter(e => evento.relatedPosts.includes(e.id) && e.id !== evento.id);

    // Social share URLs
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = encodeURIComponent(evento.title + ' - ' + evento.description);

    return (
      <div className="min-h-screen bg-[#fdf6ef] flex justify-center py-8 px-2">
        <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-8 md:pr-4">
            {/* Hero Image with overlay */}
            <div className="relative overflow-hidden rounded-xl mb-8">
              <img
                src={evento.image}
                alt={evento.title}
                className="w-full h-56 md:h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#fdf6ef] via-transparent to-transparent px-6 py-4">
                <span className="text-[#e94d2c] font-semibold text-base">{evento.category}</span>
                <div className="text-xs text-gray-700 mt-1">{evento.date} &nbsp;|&nbsp; {evento.author}</div>
              </div>
            </div>
            {/* Title & Content */}
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gray-900 leading-tight">
              {evento.title}
            </h1>
            <div className="text-lg font-serif text-gray-800 mb-6">
              {evento.description}
            </div>
            {/* Location */}
            <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 mb-6 text-center text-[#a05a2c] text-base font-serif shadow-sm">
              Local: <span className="font-semibold">{evento.location}</span>
            </div>
            {/* Back to list button */}
            <div className="mb-6">
              <button 
                onClick={() => router.push('/eventos')}
                className="bg-[#e94d2c] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d13d1c] transition"
              >
                ← Voltar aos Eventos
              </button>
            </div>
          </div>
          {/* Sidebar */}
          <aside className="w-full md:w-80 bg-[#fcf7f2] border-l border-[#f5e6d6] flex flex-col p-6 gap-8">
            {/* Tags */}
            <div>
              <div className="text-[#e09a4b] font-semibold text-sm mb-2 tracking-wide uppercase">TAGS</div>
              <div className="flex flex-wrap gap-2">
                {evento.tags.map((tag: string) => (
                  <span key={tag} className="bg-[#fdf1e2] text-[#a05a2c] px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
            </div>
            {/* Related Events */}
            <div>
              <div className="text-[#e94d2c] font-semibold text-sm mb-2 tracking-wide uppercase">EVENTOS RELACIONADOS</div>
              <ul className="divide-y divide-[#f5e6d6]">
                {related.map((ev) => (
                  <li 
                    key={ev.id} 
                    className="py-2 text-base text-gray-900 hover:text-[#e94d2c] cursor-pointer transition"
                    onClick={() => router.push(`/eventos?id=${ev.id}`)}
                  >
                    {ev.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Show the events list if no ID is provided
  return (
    <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Todos os Eventos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((evento) => (
            <div 
              key={evento.id} 
              className="block group cursor-pointer"
              onClick={() => router.push(`/eventos?id=${evento.id}`)}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition hover:shadow-2xl">
                <img
                  src={evento.image}
                  alt={evento.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-red-600 text-xs font-semibold mb-1">{evento.category}</span>
                  <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-red-600 transition">{evento.title}</h2>
                  <div className="text-gray-700 text-sm mb-2 flex-1">
                    {evento.description.length > 120 ? evento.description.slice(0, 120) + '...' : evento.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-auto">{evento.date} &nbsp;|&nbsp; {evento.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 