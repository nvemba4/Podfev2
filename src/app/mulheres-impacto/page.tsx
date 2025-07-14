import React from 'react';
import Image from 'next/image';

const recentPosts = [
  'Voltei à Vida por um Milagre',
  'Ela Superou o Impensável',
  'Ele Saía Sexta Só Voltava no Sábado',
];

const categories = [
  'Voltei a Vida por um Milagre',
  'Ela Superou o Impensável',
];

export default function VernoticiaPage() {
  return (
    <div className="min-h-screen bg-[#fdf6ef] flex justify-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white/80 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-8 md:pr-4">
          {/* Hero Image */}
          <div className="overflow-hidden rounded-xl mb-8">
            <Image
              src="/images/creaPodcast-African-Americans.png"
              alt="Sunset"
              width={800}
              height={300}
              className="w-full h-56 md:h-64 object-cover"
              priority
            />
          </div>
          {/* Title & Meta */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-gray-900 leading-tight">
            Mulheres que Impactam outras Mulheres: Histórias de Fé, Força e Transformação
          </h1>
          <div className="text-[#e09a4b] text-sm font-medium mb-6">
            10 de julho de 2025 &nbsp;|&nbsp; Entretenimento
          </div>
          {/* Article */}
          <div className="text-lg font-serif text-gray-800 mb-6">
            Em um inqumos a ias vezes essern iarciar u estar corojagens. Guias, incluir térroismos serénos. Listas as intensônars de resiliência e renovação. Renuovoas outras recuperação.<br /><br />
            Nestenv deia, numa recomtes las revéstesson, dourou.ne jnstlhês ira, com pósissilto de tovãr:u noimomento.
          </div>
          {/* Scripture/Quote Box */}
          <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-5 mb-6 text-center text-[#a05a2c] text-xl font-serif shadow-sm">
            Porque Deus tanto amou o mundo que deu o seu Filho unigênito. João 3:16.
          </div>
          <div className="text-lg font-serif text-gray-800 mb-2">
            Voltei para textistar a conheca. Sua impulizes a acorojas de <span className="font-semibold text-[#e09a4b]">flora</span> refrescêe a <span className="font-semibold text-[#e09a4b]">desenvolvir</span> do sentimento de renovação. Eles sves realenteen esses novas matorás estrenssántes.
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-[#fcf7f2] border-l border-[#f5e6d6] flex flex-col p-6 gap-8">
          {/* Recent Posts */}
          <div>
            <div className="text-[#e94d2c] font-semibold text-sm mb-2 tracking-wide uppercase">ULTIMAS POSTAGENS</div>
            <ul className="divide-y divide-[#f5e6d6]">
              {recentPosts.map((post, i) => (
                <li key={i} className="py-2 text-base text-gray-900 hover:text-[#e94d2c] cursor-pointer transition">
                  {post}
                </li>
              ))}
            </ul>
          </div>
          {/* Categories/Tags */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#e09a4b] text-xl">⎯</span>
              <span className="text-[#a05a2c] font-semibold text-base tracking-wide">LETEMAS</span>
            </div>
            <ul className="divide-y divide-[#f5e6d6]">
              {categories.map((cat, i) => (
                <li key={i} className="py-2 text-base text-gray-900 hover:text-[#e94d2c] cursor-pointer transition">
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
} 