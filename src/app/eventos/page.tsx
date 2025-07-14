import React from 'react';
import { recentNews } from '@/mock/noticiasPublicidadeData';
import Link from 'next/link';

export default function EventosListPage() {
  return (
    <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Todos os Eventos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentNews.map((evento) => (
            <Link key={evento.id} href={`/eventos/${evento.id}`} className="block group">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 