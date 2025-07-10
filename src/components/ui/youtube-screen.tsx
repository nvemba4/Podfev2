import React from 'react';

interface YoutubeScreenProps {
  videoId: string;
  size?: 'small' | 'medium' | 'large' | { width: number; height: number };
}

const sizeMap = {
  small: { width: 320, height: 180 },
  medium: { width: 560, height: 315 },
  large: { width: 900, height: 450 },
};

export const YoutubeScreen: React.FC<YoutubeScreenProps> = ({ videoId, size = 'large' }) => {
  const resolvedSize =
    typeof size === 'string' ? sizeMap[size] : size;

  return (
    <div
      style={{
        position: 'relative',
        width: resolvedSize.width,
        height: resolvedSize.height,
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
        // background: '#000', // Removed black background
      }}
    >
      <iframe
        width={resolvedSize.width}
        height={resolvedSize.height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default YoutubeScreen; 