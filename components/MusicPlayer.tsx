import React, { useState, useEffect, useRef } from 'react';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import { BACKGROUND_MUSIC_URL } from '../constants';

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(BACKGROUND_MUSIC_URL);
    audioRef.current.loop = true;

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log("Audio play failed (interaction needed first):", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-wedding-cream/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-wedding-gold/30 hover:bg-wedding-cream transition-all duration-300 group"
      >
        {isPlaying ? (
          <div className="relative">
            <Music className="w-6 h-6 text-wedding-gold animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-wedding-cream/95 rounded-full">
              <PauseCircle className="w-6 h-6 text-wedding-gold" />
            </div>
          </div>
        ) : (
          <PlayCircle className="w-6 h-6 text-gray-400" />
        )}
      </button>
      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
