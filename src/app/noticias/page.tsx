'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';



export default function NoticiaDetailPage() {
  // All hooks at the top, before any return
  const [mainNews, setMainNews] = React.useState<any>(null);
  const [recentNews, setRecentNews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [shareUrl, setShareUrl] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [comments, setComments] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch('/api/noticias-publicidade')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setMainNews(data.mainNews);
        setRecentNews(data.recentNews);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!mainNews) return <div>Nenhuma notícia encontrada.</div>;

  const noticia = mainNews;
  const related = recentNews.filter(e => noticia.relatedPosts && noticia.relatedPosts.includes(e.id));
  const shareText = encodeURIComponent(noticia.title + ' - ' + noticia.description);

  return (
    <div className="min-h-screen bg-[#fdf6ef] flex justify-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-8 md:pr-4">
          {/* Hero Image with overlay */}
          <div className="relative overflow-hidden mb-8">
            <Image
              src={noticia.image}
              alt={noticia.title}
              width={800}
              height={320}
              className="w-full h-56 md:h-64 object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#fdf6ef] via-transparent to-transparent px-6 py-4">
              <span className="text-[#e94d2c] font-semibold text-base">{noticia.category}</span>
              <div className="text-xs text-gray-700 mt-1">{noticia.date} &nbsp;|&nbsp; {noticia.author}</div>
            </div>
          </div>
          {/* Title & Content */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900 leading-tight">
            {noticia.title}
          </h1>
          <div className="text-lg font-serif text-gray-800 mb-6">
            {noticia.description}
          </div>
          {/* Scripture/Quote Box */}
          <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-5 mb-6 text-center text-[#a05a2c] text-xl font-serif shadow-sm">
            {noticia.content && noticia.content.match(/"([^"]+)"/)?.[1] || ''}
          </div>
          <div className="text-lg font-serif text-gray-800 mb-2 whitespace-pre-line">
            {noticia.content && noticia.content.replace(/"([^"]+)".*/, '')}
          </div>
          {/* Comment Input */}
          <div className="my-8">
            <h2 className="text-lg font-semibold mb-2">Deixe um comentário</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Escreva seu comentário..."
                className="flex-1 border rounded px-3 py-2"
              />
              <button
                onClick={() => {
                  if (comment.trim()) {
                    setComments([comment, ...comments]);
                    setComment('');
                  }
                }}
                className="bg-[#e94d2c] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d13d1c] transition"
              >
                Comentar
              </button>
            </div>
            {comments.length > 0 && (
              <div className="mt-4">
                <h3 className="text-base font-semibold mb-2">Comentários</h3>
                <ul className="space-y-2">
                  {comments.map((c, idx) => (
                    <li key={idx} className="bg-[#fdf1e2] border border-[#f5d6b3] rounded px-4 py-2 text-[#a05a2c]">{c}</li>
                  ))}
                </ul>
              </div>
            )}
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#e09a4b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b97a2c] transition">Contato</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Contato com a Igreja</DialogTitle>
                  <DialogDescription>
                    Preencha o formulário abaixo para entrar em contato conosco.
                  </DialogDescription>
                </DialogHeader>
                <form className="flex flex-col gap-4 mt-4">
                  <input type="text" placeholder="Seu nome" className="border rounded px-3 py-2" />
                  <input type="email" placeholder="Seu e-mail" className="border rounded px-3 py-2" />
                  <textarea placeholder="Sua mensagem" className="border rounded px-3 py-2" rows={4} />
                  <DialogFooter>
                    <Button type="submit" className="bg-[#e94d2c] text-white">Enviar</Button>
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
            <div className="text-[#e94d2c] font-semibold text-sm mb-2 tracking-wide uppercase">TAGS</div>
            <div className="flex flex-wrap gap-2">
              {noticia.tags && noticia.tags.map((tag: string) => (
                <span key={tag} className="bg-[#fdf1e2] text-[#a05a2c] px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
              ))}
            </div>
          </div>
          {/* Related Posts */}
          <div>
            <div className="text-[#e94d2c] font-semibold text-sm mb-2 tracking-wide uppercase">POSTAGENS RELACIONADAS</div>
            <ul className="divide-y divide-[#f5e6d6]">
              {related.map((post) => (
                <li key={post.id} className="py-2 text-base text-gray-900 hover:text-[#e94d2c] cursor-pointer transition">
                  <Link href={`/eventos?id=${post.id}`}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
} 