import React, { useState } from "react";
import { soundFx } from "../utils/audio";

interface RewardItem {
  id: string;
  label: string;
  type: string;
  val: string;
  color: string;
}

const rewards: RewardItem[] = [
  { id: "1", label: "+100 XP", type: "xp", val: "100 XP", color: "#E44D26" },
  { id: "2", label: "Streak Shield 🛡️", type: "shield", val: "1 Shield", color: "#1B52CC" },
  { id: "3", label: "+250 XP", type: "xp", val: "250 XP", color: "#1E7A4E" },
  { id: "4", label: "Gold Badge 🏅", type: "badge", val: "Gold Coder", color: "#A65C00" },
  { id: "5", label: "+50 XP", type: "xp", val: "50 XP", color: "#E44D26" },
  { id: "6", label: "Double XP Boost ⚡", type: "boost", val: "2x XP (24h)", color: "#9333EA" },
];

export default function DailyRewardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [wonReward, setWonReward] = useState<RewardItem | null>(null);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (spinning) return;
    soundFx.playClick();
    setSpinning(true);
    setWonReward(null);

    const randomDegrees = 1440 + Math.floor(Math.random() * 360);
    setRotation(randomDegrees);

    setTimeout(() => {
      soundFx.playSuccess();
      setSpinning(false);
      const selected = rewards[Math.floor(Math.random() * rewards.length)];
      setWonReward(selected);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-[#0D0D0D] border border-white/20 rounded-3xl p-6 w-full max-w-md text-white shadow-2xl text-center relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white font-bold text-sm">✕</button>

        <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase tracking-widest mb-1">DAILY REWARD WHEEL</div>
        <h2 className="font-display font-black text-3xl uppercase mb-6">SPIN FOR DAILY LOOT</h2>

        {/* Spin Wheel Visual */}
        <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center">
          {/* Top Indicator Pointer Arrow */}
          <div className="absolute -top-3 z-30 text-2xl text-[#E44D26]">▼</div>

          {/* Rotating Wheel Circle */}
          <div
            className="w-full h-full rounded-full border-4 border-white/20 shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-[3000ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {rewards.map((r, i) => {
              const angle = (i * 360) / rewards.length;
              return (
                <div
                  key={r.id}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className="w-full h-full flex items-start justify-center pt-3 text-[10px] font-mono font-bold uppercase shadow-inner"
                    style={{ backgroundColor: `${r.color}30`, color: r.color }}
                  >
                    {r.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Won Reward Banner */}
        {wonReward && (
          <div className="bg-[#1E7A4E]/20 border border-[#28C840] rounded-2xl p-4 mb-4 animate-bounce">
            <div className="text-xs font-mono font-bold text-[#28C840] uppercase mb-1">🎉 REWARD UNLOCKED!</div>
            <div className="font-display font-black text-2xl text-white uppercase">{wonReward.val}</div>
          </div>
        )}

        <button
          onClick={handleSpin}
          disabled={spinning}
          className="w-full bg-[#E44D26] text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-50 transition-colors shadow-lg"
        >
          {spinning ? "SPINNING WHEEL..." : "SPIN DAILY WHEEL 🎡"}
        </button>
      </div>
    </div>
  );
}
