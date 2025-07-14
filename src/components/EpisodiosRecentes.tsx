import React, { useEffect, useState, useRef, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";
import { FaPlay, FaShareAlt, FaHeart } from "react-icons/fa";
import { mockEpisodes } from "@/mock/episodiosRecentesData";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useSearchParams } from "next/navigation";

type Episode = {
  id: number;
  image: string;
  title: string;
  description: string;
  idVideo?: string;
};

const EpisodioRecentesPageContent = () => {
  const searchParams = useSearchParams();
  const [episodes, setEpisodes] = useState<Episode[]>(mockEpisodes);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    fetch("/api/episodios")
      .then((res) => res.json())
      .then((data) => {
        const episodesData = Array.isArray(data) && data.length ? data : mockEpisodes;
        setEpisodes(episodesData);
        console.log("Loaded episodes:", episodesData);
      })
      .catch(() => {
        setEpisodes(mockEpisodes);
        console.log("Fallback to mockEpisodes");
      });
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-1 pt-8 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wide">VER MAIS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1">EPISÓDIOS RECENTES</h2>
        </div>
      </div>
      {episodes.length === 0 ? (
        <div className="text-center text-gray-500 py-12">Nenhum episódio encontrado.</div>
      ) : (
        <>
        <Swiper
          modules={[Navigation, Pagination]}
            navigation={{
              prevEl: '.episodios-prev',
              nextEl: '.episodios-next',
            }}
          pagination={{ clickable: true }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {episodes.map((ep, idx) => (
              <SwiperSlide key={ep.id}>
                <Link href={`/episodioRecentes?ep=${ep.id}&idVideo=${ep.idVideo || ''}`} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative bg-white rounded shadow-lg overflow-hidden flex flex-col h-[480px] cursor-pointer group-hover:shadow-xl transition"
                  >
                    <div className="relative w-full h-48">
                <img
                  src={ep.image}
                  alt={ep.title}
                        className="w-full h-full object-cover"
                />
                      {/* Overlay and Play Icon on Hover (image only) */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex"
                          >
                            <FaPlay className="text-white text-4xl drop-shadow-lg" />
                          </motion.span>
                        </div>
                      </div>
                <div className="flex-1 flex flex-col p-6">
                  <h3 className="font-semibold text-xl mb-2 leading-snug">
                    {ep.title}
                  </h3>
                  <p className="text-gray-700 text-base mb-6 flex-1">
                    {episodes[0] && ep.description.length > episodes[0].description.length
                      ? ep.description.slice(0, episodes[0].description.length) + '...'
                      : ep.description}
                  </p>
                      <div className="flex items-center justify-end mt-auto">
                      <span className="flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-red-600">
                        <FaShareAlt className="text-base" /> Compartilhar
                      </span>
                        <span className="flex items-center gap-1 text-gray-500 text-sm cursor-pointer hover:text-red-600 ml-6">
                        <FaHeart className="text-base" /> Gosto
                      </span>
                    </div>
                  </div>
                  </motion.div>
                </Link>
            </SwiperSlide>
          ))}
        </Swiper>
          {/* Custom Arrow Controls */}
          <div className="absolute right-8 bottom-0 flex flex-row gap-3 z-10 pb-4">
            <button
              className="episodios-prev rounded-full bg-red-600 text-white p-2 shadow transition hover:bg-red-700 disabled:opacity-50"
              aria-label="Anterior"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              className="episodios-next rounded-full bg-red-600 text-white p-2 shadow transition hover:bg-red-700 disabled:opacity-50"
              aria-label="Próximo"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default function EpisodioRecentesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EpisodioRecentesPageContent />
    </Suspense>
  );
} 