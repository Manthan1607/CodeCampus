import React, { useState, useEffect, useRef } from "react";
import { soundFx } from "../utils/audio";

interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  freq: number;
}

const tracks: Track[] = [
  { id: "cyberpunk", title: "Cyberpunk Code Flow", artist: "LoFi Campus", genre: "Deep Synth", freq: 220 },
  { id: "chill", title: "Midnight Algorithm Study", artist: "ChillHop AI", genre: "Lo-Fi Beats", freq: 174 },
  { id: "focus", title: "Deep Work Focus Waves", artist: "Brainwave Labs", genre: "Ambient Noise", freq: 110 },
];

export default function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [isOpen, setIsOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const activeTrack = tracks[activeTrackIdx];

  const stopBeats = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
        osc1Ref.current = null;
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
        osc2Ref.current = null;
      }
    } catch (e) {}
  };

  const startBeats = () => {
    stopBeats();
    try {
      const AudioCtxFunc = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current && AudioCtxFunc) {
        audioCtxRef.current = new AudioCtxFunc();
      }

      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }

        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(volume * 0.2, audioCtxRef.current.currentTime);
        gainNode.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gainNode;

        // Ambient Oscillator 1
        const osc1 = audioCtxRef.current.createOscillator();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(activeTrack.freq, audioCtxRef.current.currentTime);
        osc1.connect(gainNode);
        osc1.start();
        osc1Ref.current = osc1;

        // Ambient Harmonic Oscillator 2
        const osc2 = audioCtxRef.current.createOscillator();
        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(activeTrack.freq * 1.5, audioCtxRef.current.currentTime);
        osc2.connect(gainNode);
        osc2.start();
        osc2Ref.current = osc2;
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (isPlaying) {
      startBeats();
    } else {
      stopBeats();
    }
    return () => stopBeats();
  }, [isPlaying, activeTrackIdx]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.2, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const togglePlay = () => {
    soundFx.playClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          soundFx.playClick();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
          isPlaying
            ? "bg-[#1E7A4E] text-white border-[#1E7A4E] shadow-md animate-pulse"
            : "bg-white/10 text-white/80 border-white/20 hover:text-white"
        }`}
      >
        <span>🎧</span>
        <span>{isPlaying ? "Lo-Fi Playing" : "Lo-Fi Beats"}</span>
        {isPlaying && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-72 bg-[#0D0D0D] border border-white/20 rounded-2xl p-4 shadow-2xl text-white">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <span className="text-[10px] font-mono font-bold text-[#E44D26] uppercase">FOCUS MUSIC PLAYER</span>
            <button onClick={() => setIsOpen(false)} className="text-xs text-white/40 hover:text-white">✕</button>
          </div>

          <div className="bg-white/5 rounded-xl p-3 mb-3 border border-white/5">
            <div className="text-xs font-bold text-white truncate">{activeTrack.title}</div>
            <div className="text-[10px] text-white/50 font-mono">{activeTrack.artist} · {activeTrack.genre}</div>
          </div>

          {/* Track Selector */}
          <div className="flex flex-col gap-1.5 mb-4">
            {tracks.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTrackIdx(idx);
                  setIsPlaying(true);
                }}
                className={`p-2 rounded-lg text-left text-xs font-mono transition-all flex items-center justify-between ${
                  activeTrackIdx === idx ? "bg-[#E44D26] text-white font-bold" : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <span className="truncate">{t.title}</span>
                {activeTrackIdx === idx && isPlaying && <span className="text-[10px]">▶</span>}
              </button>
            ))}
          </div>

          {/* Controls & Volume */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={togglePlay}
              className="flex-1 bg-white text-black font-bold py-2 rounded-xl text-xs hover:bg-[#E44D26] hover:text-white transition-colors"
            >
              {isPlaying ? "PAUSE ⏸" : "PLAY 🎧"}
            </button>

            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-white/50">Vol</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1 accent-[#E44D26] cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
