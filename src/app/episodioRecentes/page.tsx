'use client';

import React, { Suspense } from 'react';
import YoutubeScreen from '../../components/ui/youtube-screen';
import { useSearchParams } from 'next/navigation';
import EpisodioRecenteDescriptions from '../../components/episodiorecenteDescriptions';
import EpisodiosRecentes from '@/components/EpisodiosRecentes';
import { mockEpisodes } from '@/mock/episodiosRecentesData';

const EpisodioRecentesPageContent = () => {
  const searchParams = useSearchParams();
  const idVideo = searchParams.get('idVideo');
  const epId = searchParams.get('ep');

  // Find the episode by id (as string or number)
  const episode = mockEpisodes.find(
    (ep) => String(ep.id) === String(epId)
  ) || mockEpisodes[0];

  // Example speaker info (could be part of episode data)
  const episodeObj = {
    title: episode.title,
    description: episode.description,
    image: episode.image,
    speakerName: 'Gui Fernandes',
    speakerRole: 'Empresária, serva de Deu, palestrante',
    quote: '“Até agora vocês não pediram nada em meu nome; peçam e receberão, para que a alegria de vocês seja completa.”',
    reference: 'João 16:24',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#fff', minHeight: '100vh', paddingTop: 40 }}>
      {idVideo ? (
        <YoutubeScreen videoId={idVideo} size='large' />
      ) : (
        <div>No video selected.</div>
      )}
      <div style={{ width: '100%', maxWidth: 1100, margin: '50px auto 0' }}>
        <EpisodioRecenteDescriptions episode={episodeObj} />
        <EpisodiosRecentes/>
      </div>
    </div>
  );
};

export default function EpisodioRecentesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EpisodioRecentesPageContent />
    </Suspense>
  );
} 