import React from 'react';
import { recentNews } from '@/mock/noticiasPublicidadeData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

export default function EventoDetailPage({ params }: { params: { id: string } }) {
  const evento = recentNews.find(e => String(e.id) === params.id);
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
          {/* Social Sharing */}
          <div className="flex gap-4 mt-8">
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
            <Dialog>
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
                <li key={ev.id} className="py-2 text-base text-gray-900 hover:text-[#e94d2c] cursor-pointer transition">
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