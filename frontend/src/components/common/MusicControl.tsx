import React, { useState } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { cn } from '../../lib/utils';

export const MusicControl: React.FC = () => {
  const { isPlaying, volume, setVolume, togglePlay, isMuted, toggleMute } = useAudio();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-30 flex items-center flex-row-reverse gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Primary Circular Music Control Button */}
      <button
        type="button"
        onClick={togglePlay}
        className={cn(
          "group relative flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full",
          "bg-charcoal-900/90 hover:bg-charcoal-850 backdrop-blur-md transition-all duration-300",
          "border cursor-pointer shadow-xl",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950",
          isPlaying
            ? "border-saffron-500/40 text-saffron-400 shadow-[0_0_15px_rgba(229,169,60,0.22)]"
            : "border-charcoal-700/80 text-cream-300 hover:text-cream-100 hover:border-saffron-500/30"
        )}
        aria-label={isPlaying ? "Pause ambient music" : "Play ambient music"}
        aria-pressed={isPlaying}
        title={isPlaying ? "Pause ambient music" : "Play ambient music"}
      >
        {isPlaying ? (
          /* Subtle Animated Soundwave Bars */
          <div className="flex items-end justify-center gap-[3px] h-4.5 w-4.5" aria-hidden="true">
            <span className="w-[2.5px] rounded-full bg-saffron-400 animate-soundwave-1" />
            <span className="w-[2.5px] rounded-full bg-saffron-400 animate-soundwave-2" />
            <span className="w-[2.5px] rounded-full bg-saffron-400 animate-soundwave-3" />
            <span className="w-[2.5px] rounded-full bg-saffron-400 animate-soundwave-4" />
          </div>
        ) : (
          /* Muted / Inactive Note Icon */
          <div className="relative flex items-center justify-center">
            <Music className="w-4 h-4 transition-transform group-hover:scale-110" aria-hidden="true" />
            <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-terracotta-500/80" />
          </div>
        )}

        {/* Accessible tooltip for screen readers / hover */}
        <span className="sr-only">
          {isPlaying ? "Ambient music is currently playing. Click to pause." : "Ambient music is paused. Click to play."}
        </span>
      </button>

      {/* Desktop-Only Refined Sliding Volume Slider */}
      <div
        className={cn(
          "hidden md:flex items-center gap-2.5 overflow-hidden transition-all duration-300 ease-out",
          "bg-charcoal-900/90 backdrop-blur-md border border-charcoal-700/80 rounded-full shadow-lg",
          isHovered
            ? "max-w-48 opacity-100 px-3.5 py-1.5 pointer-events-auto"
            : "max-w-0 opacity-0 px-0 py-1.5 pointer-events-none"
        )}
        aria-hidden={!isHovered}
      >
        <button
          type="button"
          onClick={toggleMute}
          className="text-cream-300 hover:text-saffron-400 transition-colors focus:outline-none cursor-pointer"
          aria-label={isMuted ? "Unmute ambient music" : "Mute ambient music"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5 text-terracotta-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-saffron-400" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 h-1 bg-charcoal-700 rounded-lg appearance-none cursor-pointer accent-saffron-400"
          aria-label="Ambient volume control"
        />

        <span className="text-[10px] text-cream-400 font-mono tracking-tight shrink-0 select-none">
          {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
        </span>
      </div>
    </div>
  );
};
