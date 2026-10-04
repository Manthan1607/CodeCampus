import React, { useState, useEffect } from "react";
import { soundFx } from "../utils/audio";

interface Opponent {
  name: string;
  avatar: string;
  rating: number;
  college: string;
  codeSnippet: string;
  progress: number;
}

const mockOpponents: Opponent[] = [
  { name: "Vikram Singh", avatar: "VS", rating: 2134, college: "IIT Bombay", codeSnippet: "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i=0; i<nums.size(); i++) {\n        if(mp.count(target-nums[i])) return {mp[target-nums[i]], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}", progress: 75 },
  { name: "Ananya Patel", avatar: "AP", rating: 1980, college: "BITS Pilani", codeSnippet: "def twoSum(nums: List[int], target: int) -> List[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i", progress: 60 },
];

export default function BattleRadarModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searching, setSearching] = useState(true);
  const [matchFound, setMatchFound] = useState(false);
  const [opponent, setOpponent] = useState<Opponent | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSearching(true);
      setMatchFound(false);

      const timer1 = setTimeout(() => {
        soundFx.playBattleStart();
        const matched = mockOpponents[Math.floor(Math.random() * mockOpponents.length)];
        setOpponent(matched);
        setSearching(false);
        setMatchFound(true);
      }, 2500);

      return () => clearTimeout(timer1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <div className="bg-[#0D0D0D] border border-white/20 rounded-3xl p-6 w-full max-w-xl text-white shadow-2xl text-center relative overflow-hidden">

        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white font-bold text-sm">✕</button>

        {searching ? (
          <div className="py-12 flex flex-col items-center justify-center gap-6">
            {/* Animated Radar Radar Sweep Circle */}
            <div className="relative w-40 h-40 rounded-full border-2 border-[#E44D26]/40 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 rounded-full border border-white/10"></div>
              <div className="absolute w-24 h-24 rounded-full border border-white/10"></div>
              <div className="absolute w-12 h-12 rounded-full border border-white/10"></div>

              {/* Rotating Scanner Needle */}
              <div className="absolute inset-0 origin-center animate-spin" style={{ animationDuration: "3s" }}>
                <div className="w-1/2 h-1/2 bg-gradient-to-br from-[#E44D26]/60 to-transparent origin-bottom-right" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}></div>
              </div>

              <div className="w-4 h-4 rounded-full bg-[#E44D26] animate-ping relative z-10"></div>
            </div>

            <div>
              <div className="font-display font-black text-2xl uppercase tracking-wider mb-1">SEARCHING FOR OPPONENT...</div>
              <div className="text-xs text-white/50 font-mono">Radar scanning global 1v1 matchmaking queue...</div>
            </div>
          </div>
        ) : (
          <div className="py-6 flex flex-col gap-6">
            <div className="inline-block text-[10px] font-mono font-bold bg-[#E44D26] text-white px-3 py-1 rounded-full uppercase tracking-widest mx-auto animate-pulse">
              MATCH FOUND! 1V1 BATTLE ARENA
            </div>

            {/* Matchup Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#E44D26] text-white font-bold text-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                  MM
                </div>
                <div className="text-xs font-bold font-mono">Manthan Mandavkar</div>
                <div className="text-[10px] text-white/50 font-mono">Rating 1847</div>
              </div>

              <div className="text-center">
                <div className="font-display font-black text-4xl text-[#E44D26] italic">VS</div>
                <div className="text-[10px] font-mono text-[#28C840] font-bold mt-1">LIVE SYNC READY</div>
              </div>

              {opponent && (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[#1B52CC] text-white font-bold text-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                    {opponent.avatar}
                  </div>
                  <div className="text-xs font-bold font-mono">{opponent.name}</div>
                  <div className="text-[10px] text-white/50 font-mono">Rating {opponent.rating} · {opponent.college}</div>
                </div>
              )}
            </div>

            {/* Live Opponent Code Diff Preview */}
            {opponent && (
              <div className="bg-black/80 rounded-2xl p-4 border border-white/10 text-left font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-white/50 mb-2 border-b border-white/10 pb-1">
                  <span>{`// ${opponent.name}'s Code Execution Sync`}</span>
                  <span className="text-[#E44D26] font-bold">{opponent.progress}% Solved</span>
                </div>
                <pre className="text-[#82AAFF] text-[10px] leading-4 overflow-x-auto whitespace-pre-wrap bg-white/5 p-3 rounded-xl border border-white/5">
                  {opponent.codeSnippet}
                </pre>
              </div>
            )}

            <button
              onClick={onClose}
              className="bg-[#E44D26] text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-lg"
            >
              START BATTLE ARENA NOW ⚔️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
