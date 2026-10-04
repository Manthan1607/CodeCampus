import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";

interface PodcastEpisode {
  id: string;
  title: string;
  hosts: string;
  duration: string;
  topic: string;
  script: { speaker: string; text: string }[];
}

const episodes: PodcastEpisode[] = [
  {
    id: "1",
    title: "Ep. 42: Why Two Pointers Beat Brute Force O(N²)",
    hosts: "Alex & Sam",
    duration: "2:30",
    topic: "Arrays & Pointers",
    script: [
      { speaker: "Alex", text: "Welcome to CodeCampus AI Podcast! Today we are discussing why Two Pointers is such a game changer in competitive programming." },
      { speaker: "Sam", text: "Exactly Alex! Instead of nested loops checking every single pair in quadratic O(N²) time, you iterate from both ends toward the center in O(N) linear time." },
      { speaker: "Alex", text: "And the key requirement? The array must be sorted! That allows us to decide which pointer to move based on the current sum." },
    ],
  },
  {
    id: "2",
    title: "Ep. 43: System Design - Scalable Caching with Redis",
    hosts: "Alex & Sam",
    duration: "3:15",
    topic: "System Design",
    script: [
      { speaker: "Alex", text: "Sam, why do high-traffic tech platforms put Redis in front of PostgreSQL?" },
      { speaker: "Sam", text: "Because RAM read latency is under 1 millisecond! Redis serves cached queries instantly, shielding the primary database." },
    ],
  },
];

export default function PodcastPage() {
  const [activeEpisodeIdx, setActiveEpisodeIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  const activeEp = episodes[activeEpisodeIdx];

  const speakLine = (index: number) => {
    if (index >= activeEp.script.length) {
      setPlaying(false);
      setCurrentLineIdx(0);
      return;
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const line = activeEp.script[index];
      const utterance = new SpeechSynthesisUtterance(`${line.speaker} says: ${line.text}`);
      utterance.rate = 1.0;
      utterance.pitch = line.speaker === "Alex" ? 1.1 : 0.9;

      utterance.onend = () => {
        setCurrentLineIdx(index + 1);
        speakLine(index + 1);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTogglePlay = () => {
    soundFx.playClick();
    if (!playing) {
      setPlaying(true);
      speakLine(currentLineIdx);
    } else {
      setPlaying(false);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">DUAL-HOST AI PODCAST ENGINE</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">CODE-TO-AUDIO AI PODCAST</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Podcast Player Card */}
          <div className="lg:col-span-8 bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#E44D26] uppercase">{activeEp.topic}</span>
                <h2 className="font-display font-black text-2xl uppercase mt-1">{activeEp.title}</h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/50">{activeEp.hosts}</span>
              </div>
            </div>

            {/* Audio Wave Visualizer Animation */}
            <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10 flex items-center justify-center gap-1.5 h-28">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    playing ? "bg-[#E44D26] animate-pulse" : "bg-white/20"
                  }`}
                  style={{
                    height: playing ? `${20 + (i % 5) * 12}px` : "16px",
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Dialogue Transcript Stream */}
            <div className="flex flex-col gap-3 mb-8 max-h-56 overflow-y-auto">
              {activeEp.script.map((line, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl font-mono text-xs border transition-all ${
                    currentLineIdx === idx && playing
                      ? "bg-[#E44D26]/20 border-[#E44D26] text-white"
                      : "bg-white/5 border-white/5 text-white/70"
                  }`}
                >
                  <span className="font-bold text-[#E44D26] uppercase mr-2">{line.speaker}:</span>
                  {line.text}
                </div>
              ))}
            </div>

            {/* Play Button */}
            <button
              onClick={handleTogglePlay}
              className="w-full bg-[#E44D26] text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-xl"
            >
              {playing ? "PAUSE PODCAST EPISODE ⏸" : "PLAY AI PODCAST EPISODE 🎙️"}
            </button>
          </div>

          {/* Episode List */}
          <div className="lg:col-span-4 bg-white border border-[#DDDBD5] rounded-3xl p-6 shadow-xs">
            <div className="text-[10px] font-mono font-bold text-[#0D0D0D] uppercase mb-4">EPISODE PLAYLIST</div>
            <div className="flex flex-col gap-3">
              {episodes.map((ep, idx) => (
                <div
                  key={ep.id}
                  onClick={() => {
                    soundFx.playClick();
                    setActiveEpisodeIdx(idx);
                    setPlaying(false);
                    setCurrentLineIdx(0);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    activeEpisodeIdx === idx ? "bg-[#0D0D0D] text-white border-[#0D0D0D]" : "bg-[#F7F6F3] border-[#F0EFE9] hover:border-[#0D0D0D]"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase mb-1">{ep.topic} · {ep.duration}</div>
                  <div className="text-xs font-bold leading-tight">{ep.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
