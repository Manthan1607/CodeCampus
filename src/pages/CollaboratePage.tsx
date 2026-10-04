import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";

interface Partner {
  name: string;
  avatar: string;
  cursorLine: number;
  cursorCol: number;
  colorHex: string;
}

export default function CollaboratePage() {
  const [partner, setPartner] = useState<Partner>({
    name: "Vikram Singh",
    avatar: "VS",
    cursorLine: 4,
    cursorCol: 12,
    colorHex: "#E44D26",
  });

  const [sharedCode, setSharedCode] = useState(
    "// Live Pair Programming Session: LRU Cache Implementation\nclass LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Vikram editing here...\n    }\n};"
  );

  const [inCall, setInCall] = useState(true);
  const [micMuted, setMicMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPartner((prev) => ({
        ...prev,
        cursorLine: Math.floor(Math.random() * 5) + 2,
        cursorCol: Math.floor(Math.random() * 20) + 5,
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">REAL-TIME CO-CODING ARENA</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">PAIR PROGRAMMING ROOM</h1>
          </div>

          {/* Audio Call Controls */}
          <div className="flex items-center gap-3">
            <div className="bg-[#0D0D0D] text-white px-4 py-2 rounded-full border border-white/20 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#28C840] animate-pulse"></span>
              Voice Call Connected ({partner.name})
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                setMicMuted(!micMuted);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-colors ${
                micMuted ? "bg-[#C93D18] text-white" : "bg-[#1E7A4E] text-white"
              }`}
            >
              {micMuted ? "Mic Muted 🔇" : "Mic On 🎙️"}
            </button>
          </div>
        </div>

        {/* Pair Programming Canvas */}
        <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 text-white shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#E44D26] font-bold text-xs flex items-center justify-center">
                {partner.avatar}
              </div>
              <span className="text-xs font-bold font-mono">{partner.name}'s Cursor: Line {partner.cursorLine}, Col {partner.cursorCol}</span>
            </div>

            <span className="text-[10px] font-mono font-bold bg-[#E44D26]/20 text-[#E44D26] px-3 py-1 rounded-full">
              LIVE MULTI-USER CURSOR SYNC
            </span>
          </div>

          <div className="relative font-mono text-xs">
            {/* Simulated Partner Floating Cursor */}
            <div
              className="absolute z-20 transition-all duration-500 flex items-center gap-1 pointer-events-none"
              style={{ top: `${(partner.cursorLine - 1) * 24 + 16}px`, left: `${partner.cursorCol * 8 + 24}px` }}
            >
              <div className="w-0.5 h-5 bg-[#E44D26] animate-pulse"></div>
              <span className="bg-[#E44D26] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                {partner.name}
              </span>
            </div>

            <textarea
              value={sharedCode}
              onChange={(e) => setSharedCode(e.target.value)}
              className="w-full h-96 bg-black text-[#82AAFF] p-4 rounded-2xl border border-white/10 font-mono text-xs focus:outline-none leading-6 resize-none"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
