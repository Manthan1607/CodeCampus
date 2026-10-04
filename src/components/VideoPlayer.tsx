import React, { useState, useEffect, useRef } from "react";
import { soundFx } from "../utils/audio";

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
}

interface VideoPlayerProps {
  title: string;
  instructor: string;
  avatar: string;
  posterImage: string;
  chapters: VideoChapter[];
  narrationText: string;
  onChapterSelect?: (ch: VideoChapter) => void;
}

export default function VideoPlayer({
  title,
  instructor,
  avatar,
  posterImage,
  chapters,
  narrationText,
  onChapterSelect,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(240); // 4 minutes video
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitlesOn, setSubtitlesOn] = useState(true);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);

  const timerRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isFemaleInstructor = instructor.toLowerCase().includes("ada") || instructor.toLowerCase().includes("female");

  // Clean HUD Telemetry Box (No Rotating Lines)
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isPlaying) step += 0.04;

      // Draw Sleek HUD Telemetry Box
      const leftIdx = isPlaying ? Math.floor((step * 1.2) % 4) : 0;
      const rightIdx = 6 - (isPlaying ? Math.floor((step * 1.1) % 4) : 0);

      ctx.fillStyle = "rgba(13, 13, 13, 0.85)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(24, 24, 280, 52, 12);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#28C840";
      ctx.font = "bold 10px monospace";
      ctx.fillText(`▶ LIVE TEACHING STEP · ALGORITHM RUNTIME`, 38, 43);

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.font = "11px monospace";
      ctx.fillText(`left=${leftIdx} (val=${leftIdx * 2 + 1}) | right=${rightIdx} (val=${rightIdx * 3})`, 38, 62);

      animId = requestAnimationFrame(renderFrame);
    };

    renderFrame();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((t) => {
          if (t >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return t + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, duration, playbackSpeed]);

  const speakVideoNarration = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(narrationText);
      const voices = window.speechSynthesis.getVoices();

      if (isFemaleInstructor) {
        const femaleVoice = voices.find(
          (v) =>
            v.name.includes("Female") ||
            v.name.includes("Zira") ||
            v.name.includes("Samantha") ||
            v.name.includes("Google UK English Female") ||
            v.name.includes("Victoria")
        );
        if (femaleVoice) utterance.voice = femaleVoice;
        utterance.pitch = 1.25;
        utterance.rate = playbackSpeed * 1.0;
      } else {
        const maleVoice = voices.find(
          (v) =>
            v.name.includes("Male") ||
            v.name.includes("David") ||
            v.name.includes("Alex") ||
            v.name.includes("Google US English") ||
            v.name.includes("George")
        );
        if (maleVoice) utterance.voice = maleVoice;
        utterance.pitch = 0.85;
        utterance.rate = playbackSpeed * 0.95;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTogglePlay = () => {
    soundFx.playClick();
    if (!isPlaying) {
      setIsPlaying(true);
      speakVideoNarration();
    } else {
      setIsPlaying(false);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleSeek = (seconds: number, idx: number) => {
    soundFx.playClick();
    setCurrentTime(seconds);
    setActiveChapterIdx(idx);
    if (onChapterSelect) {
      onChapterSelect(chapters[idx]);
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = Math.floor((clickX / rect.width) * duration);
    setCurrentTime(newTime);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progressPct = (currentTime / duration) * 100;

  return (
    <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">

      {/* Video Screen Display */}
      <div className="relative w-full h-88 bg-black flex flex-col justify-between p-6 overflow-hidden border-b border-white/10 group">
        
        {/* Crisp 3D AI Teacher Video Stream Poster */}
        <img
          src={posterImage}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover contrast-[1.05] transition-all duration-700 ${
            isPlaying
              ? "scale-105 brightness-105 animate-pulse origin-bottom-right"
              : "scale-100 opacity-85"
          }`}
          style={{
            animationDuration: isPlaying ? "3s" : "0s",
          }}
        />
        
        {/* Sleek HUD Overlay Canvas */}
        <canvas
          ref={canvasRef}
          width={640}
          height={350}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10"></div>
        
        {/* Stream Header */}
        <div className="relative z-20 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-lg">
            <div className="w-8 h-8 rounded-full bg-[#E44D26] text-white font-bold text-xs flex items-center justify-center shadow-md font-mono">
              {avatar}
            </div>
            <div>
              <div className="text-xs font-bold text-white font-display uppercase">{instructor}</div>
              <div className="text-[9px] text-[#28C840] font-mono flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full bg-[#28C840] ${isPlaying ? "animate-ping" : ""}`}></span>
                {isPlaying ? "3D AI MODEL ACTIVELY TEACHING · MOVING & SPEAKING" : "HD VIDEO LESSON READY"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#E44D26]/20 text-[#E44D26] border border-[#E44D26]/40 px-3 py-1 rounded-full text-[10px] font-mono font-bold">
              🎙️ {isFemaleInstructor ? "FEMALE VOICE" : "MALE VOICE"}
            </span>

            <div className="bg-black/80 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[10px] font-mono text-white/90">
              CHAPTER {activeChapterIdx + 1}/{chapters.length}
            </div>
          </div>
        </div>

        {/* Clean Play/Pause Center Trigger Overlay (Only when paused) */}
        {!isPlaying && (
          <div className="relative z-20 flex items-center justify-center my-auto">
            <button
              onClick={handleTogglePlay}
              className="w-16 h-16 rounded-full bg-[#E44D26] text-white font-bold text-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            >
              ▶
            </button>
          </div>
        )}

        {/* Closed Captions / Subtitles Bar at Bottom Screen */}
        {subtitlesOn && (
          <div className="relative z-20 text-center mt-auto">
            <span className="bg-black/90 text-white font-mono text-xs px-5 py-2 rounded-xl border border-white/15 backdrop-blur-md shadow-xl inline-block max-w-xl truncate">
              "{narrationText}"
            </span>
          </div>
        )}
      </div>

      {/* Video Control Bar */}
      <div className="p-4 bg-[#141414] text-white flex flex-col gap-3">
        {/* Timeline Scrubber */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-white/60 w-10 text-right">{formatTime(currentTime)}</span>
          
          <div
            onClick={handleTimelineClick}
            className="flex-1 relative h-2.5 bg-white/10 rounded-full cursor-pointer overflow-hidden group"
          >
            <div
              className="h-full bg-[#E44D26] rounded-full transition-all duration-200"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>

          <span className="text-white/60 w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls Strip */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlay}
              className="bg-[#E44D26] text-white font-mono font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-md"
            >
              {isPlaying ? "PAUSE LESSON ⏸" : "PLAY VIDEO LESSON ▶"}
            </button>

            <button
              onClick={() => setSubtitlesOn(!subtitlesOn)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-colors ${
                subtitlesOn ? "bg-white/20 text-white" : "bg-white/5 text-white/40"
              }`}
            >
              CC {subtitlesOn ? "ON" : "OFF"}
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/50">SPEED:</span>
            {[1, 1.25, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                  playbackSpeed === spd ? "bg-[#E44D26] text-white" : "bg-white/5 text-white/50 hover:text-white"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Video Chapters List */}
        <div className="flex items-center gap-2 pt-2 overflow-x-auto">
          {chapters.map((ch, idx) => (
            <button
              key={ch.time}
              onClick={() => handleSeek(ch.seconds, idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-mono flex-shrink-0 transition-colors ${
                activeChapterIdx === idx
                  ? "bg-white text-black border-white font-bold"
                  : "bg-white/5 text-white/70 border-white/10 hover:border-white/40"
              }`}
            >
              <span className="text-[#E44D26]">{ch.time}</span>
              <span>{ch.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
