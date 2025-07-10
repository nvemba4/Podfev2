import React from 'react';

interface EpisodioRecenteDescriptionsProps {
  episode: {
    title: string;
    description: string;
    image: string;
    speakerName: string;
    speakerRole: string;
    quote?: string;
    reference?: string;
  };
}

const socialLinks = [
  { icon: 'ⓕ', label: 'Facebook', href: '#' },
  { icon: 'ⓘ', label: 'Instagram', href: '#' },
  { icon: '▶', label: 'YouTube', href: '#' },
];

const EpisodioRecenteDescriptions: React.FC<EpisodioRecenteDescriptionsProps> = ({ episode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        background: '#fafbfc',
        borderRadius: 24,
        boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
        padding: 36,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        minHeight: 340,
      }}
    >
      {/* Left: Episode Info */}
      <div
        style={{
          flex: 2,
          minWidth: 260,
          maxWidth: 540,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h2 style={{ fontWeight: 800, fontSize: 30, marginBottom: 18, color: '#1a1a1a', lineHeight: 1.2 }}>{episode.title}</h2>
        <p style={{ fontSize: 18, color: '#333', marginBottom: 24, lineHeight: 1.6 }}>{episode.description}</p>
        {episode.quote && (
          <blockquote style={{ fontStyle: 'italic', color: '#e11d48', background: '#fff', borderLeft: '4px solid #e11d48', padding: '12px 18px', borderRadius: 8, marginBottom: 10 }}>
            {episode.quote}
          </blockquote>
        )}
        {episode.reference && (
          <div style={{ fontWeight: 700, fontSize: 17, color: '#1a1a1a', marginBottom: 18 }}>{episode.reference}</div>
        )}
        <button
          style={{
            background: 'linear-gradient(90deg, #e11d48 60%, #f43f5e 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '16px 36px',
            fontWeight: 700,
            fontSize: 18,
            marginTop: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(225,29,72,0.08)',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#be123c')}
          onMouseOut={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #e11d48 60%, #f43f5e 100%)')}
        >
          Assista Mais Episódios
        </button>
      </div>

      {/* Right: Speaker Card */}
      <div
        style={{
          flex: 1,
          minWidth: 220,
          maxWidth: 320,
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 28,
          marginTop: 8,
        }}
      >
        <img
          src={episode.image}
          alt={episode.speakerName}
          style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', marginBottom: 14, border: '4px solid #f3f4f6' }}
        />
        <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 4, color: '#1a1a1a', textAlign: 'center' }}>{episode.speakerName}</div>
        <div style={{ fontSize: 15, color: '#666', marginBottom: 18, textAlign: 'center' }}>{episode.speakerRole}</div>
        
        <button
          style={{
            background: '#fff',
            color: '#e11d48',
            border: '2px solid #e11d48',
            borderRadius: 8,
            padding: '12px 24px',
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 18,
            cursor: 'pointer',
            width: '100%',
            transition: 'background 0.2s, color 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = '#e11d48';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#e11d48';
          }}
        >
          Apoie o Podfé
        </button>
        <div style={{ display: 'flex', gap: 18, marginBottom: 16 }}>
          {socialLinks.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              style={{ fontSize: 26, color: '#e11d48', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = '#be123c')}
              onMouseOut={e => (e.currentTarget.style.color = '#e11d48')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 13, color: '#aaa', textAlign: 'center' }}>Contato © 2024 Poofé</div>
      </div>
    </div>
  );
};

export default EpisodioRecenteDescriptions; 