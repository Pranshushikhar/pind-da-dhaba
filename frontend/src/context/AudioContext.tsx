import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isLoaded: boolean;
  volume: number;
  togglePlay: () => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setVolume: (vol: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const STORAGE_KEY = 'pind-da-dhaba-music-enabled';
const DEFAULT_VOLUME = 0.12; // 12% luxury ambient volume
const AUDIO_SRC = '/audio/pind-da-dhaba-ambient.mp3';

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const targetVolumeRef = useRef<number>(DEFAULT_VOLUME);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(DEFAULT_VOLUME);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Initialize single persistent HTMLAudioElement
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'metadata';
    audio.volume = 0; // Starts at 0 for smooth fade-in
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoaded(true);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = (e: Event) => {
      console.warn('Pind Da Dhaba Ambient Audio:', e);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Check stored user preference
    const savedPref = localStorage.getItem(STORAGE_KEY);
    const userDisabled = savedPref === 'false';

    // First user interaction listener to conform strictly to modern browser autoplay policies
    const handleFirstInteraction = () => {
      // Remove listeners once fired
      cleanupInteractionListeners();

      // Check current preference right at interaction time
      const currentPref = localStorage.getItem(STORAGE_KEY);
      if (currentPref === 'false') {
        return; // User explicitly previously opted out
      }

      // If user hasn't disabled it, smoothly start playback
      if (audioRef.current && audioRef.current.paused) {
        fadeInAudio();
      }
    };

    const interactionEvents = ['click', 'keydown', 'pointerdown', 'touchstart'];
    const cleanupInteractionListeners = () => {
      interactionEvents.forEach((ev) => {
        window.removeEventListener(ev, handleFirstInteraction);
      });
    };

    if (!userDisabled) {
      interactionEvents.forEach((ev) => {
        window.addEventListener(ev, handleFirstInteraction, { once: true, passive: true });
      });
    }

    return () => {
      cleanupInteractionListeners();
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Smooth Fade In (from current volume to target volume over ~1.5s)
  const fadeInAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }

    const target = isMuted ? 0 : targetVolumeRef.current;

    // Start playing at 0 volume if paused
    if (audio.paused) {
      audio.volume = 0;
      audio.play().catch(() => {
        // Autoplay policy prevented playback silently without noise
      });
    }

    const stepTime = 40; // 40ms per step
    const duration = 1400; // 1.4s total fade
    const totalSteps = duration / stepTime;
    const stepSize = (target - audio.volume) / totalSteps;

    fadeIntervalRef.current = window.setInterval(() => {
      if (!audioRef.current) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }
      const nextVol = audioRef.current.volume + stepSize;
      if (nextVol >= target) {
        audioRef.current.volume = target;
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      } else {
        audioRef.current.volume = Math.max(0, Math.min(1, nextVol));
      }
    }, stepTime);
  }, [isMuted]);

  // Smooth Fade Out (from current volume to 0 over ~0.8s, then pause)
  const fadeOutAudio = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      const audio = audioRef.current;
      if (!audio || audio.paused) {
        resolve();
        return;
      }

      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      const stepTime = 40;
      const duration = 700; // 0.7s smooth fade out
      const totalSteps = duration / stepTime;
      const stepSize = audio.volume / totalSteps;

      fadeIntervalRef.current = window.setInterval(() => {
        if (!audioRef.current) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          resolve();
          return;
        }
        const nextVol = audioRef.current.volume - stepSize;
        if (nextVol <= 0.005) {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
          resolve();
        } else {
          audioRef.current.volume = Math.max(0, nextVol);
        }
      }, stepTime);
    });
  }, []);

  // Explicit Play
  const play = useCallback(async () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    fadeInAudio();
  }, [fadeInAudio]);

  // Explicit Pause
  const pause = useCallback(async () => {
    localStorage.setItem(STORAGE_KEY, 'false');
    await fadeOutAudio();
  }, [fadeOutAudio]);

  // Toggle Play / Pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused || !isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  // Set Volume
  const setVolume = useCallback((newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    targetVolumeRef.current = clamped;
    setVolumeState(clamped);

    if (clamped === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }

    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.volume = clamped;
    }
  }, [isMuted]);

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      const target = targetVolumeRef.current > 0 ? targetVolumeRef.current : DEFAULT_VOLUME;
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.volume = target;
      }
    } else {
      setIsMuted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        isLoaded,
        volume,
        togglePlay,
        play,
        pause,
        setVolume,
        isMuted,
        toggleMute,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
