'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { recentNews } from '@/mock/noticiasPublicidadeData';
import { Facebook, Instagram, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

function EventosListPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const [open, setOpen] = React.useState(false);
  const [likedEvents, setLikedEvents] = React.useState<Set<number>>(new Set());
  const [shareUrl, setShareUrl] = React.useState('');

  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const toggleLike = (eventId: number) => {
    setLikedEvents(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(eventId)) {
        newLiked.delete(eventId);
      } else {
        newLiked.add(eventId);
      }
      return newLiked;
    });
  };
  
  // If an ID is provided, show the event detail
  if (id) {
    const evento = recentNews.find(e => String(e.id) === id);
    if (!evento) return <div className="text-center py-20">Evento não encontrado.</div>;
    const related = recentNews.filter(e => evento.relatedPosts.includes(e.id) && e.id !== evento.id);

    // Social share URLs
    const shareText = encodeURIComponent(evento.title + ' - ' + evento.description);

    return (
      <div className="min-h-screen bg-[#fdf6ef] flex justify-center py-8 px-2">
        <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-8 md:pr-4">
            {/* Hero Image with overlay */}
            <div className="relative overflow-hidden mb-8">
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
            {/* Date and Time */}
            <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 mb-6 text-center text-[#a05a2c] text-base font-serif shadow-sm">
              <div className="font-semibold mb-1">Data e Hora</div>
              <div>{evento.date} às 19:00</div>
            </div>
            {/* Location */}
            <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 mb-6 text-center text-[#a05a2c] text-base font-serif shadow-sm">
              Local: <span className="font-semibold">{evento.location}</span>
            </div>
            {/* Social Sharing */}
            <div className="flex gap-4 mb-6">
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no WhatsApp"
                >
                  <MessageCircle className="text-green-600 w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no Facebook"
                >
                  <Facebook className="text-blue-600 w-5 h-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href={`https://www.instagram.com/`} // Instagram does not support direct share links
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Compartilhar no Instagram"
                >
                  <Instagram className="text-pink-500 w-5 h-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => toggleLike(evento.id)}
                className={likedEvents.has(evento.id) ? "bg-red-50 border-red-200" : ""}
              >
                <Heart className={`w-5 h-5 ${likedEvents.has(evento.id) ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e09a4b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b97a2c] transition">Participar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirme sua participação</DialogTitle>
                    <DialogDescription>
                      Preencha o formulário abaixo para confirmar sua presença no evento.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="flex flex-col gap-4 mt-4">
                    <input type="text" placeholder="Seu nome" className="border rounded px-3 py-2" />
                    <input type="text" placeholder="Seu número de WhatsApp" className="border rounded px-3 py-2" />
                    <textarea placeholder="Mensagem (opcional)" className="border rounded px-3 py-2" rows={3} />
                    <DialogFooter>
                      <Button type="submit" className="bg-[#e94d2c] text-white">Confirmar</Button>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Fechar</Button>
                      </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-red-600 text-xs font-semibold">{evento.category}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(evento.id);
                      }}
                      className={likedEvents.has(evento.id) ? "text-red-500" : "text-gray-400"}
                    >
                      <Heart className={`w-4 h-4 ${likedEvents.has(evento.id) ? "fill-red-500" : ""}`} />
                    </Button>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-red-600 transition">{evento.title}</h2>
                  <div className="text-gray-700 text-sm mb-2 flex-1">
                    {evento.description.length > 120 ? evento.description.slice(0, 120) + '...' : evento.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-auto">
                    <div className="font-semibold text-[#e94d2c]">{evento.date} às 19:00</div>
                    <div>{evento.location}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EventosListPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdf6ef] flex items-center justify-center">Carregando...</div>}>
      <EventosListPageContent />
    </Suspense>
  );
} 