import React, { useState } from "react";
import { soundFx } from "../utils/audio";

interface SkillNode {
  id: string;
  level: number;
  title: string;
  category: string;
  status: "unlocked" | "in-progress" | "locked";
  xpReward: number;
  icon: string;
  description: string;
}

const skillNodes: SkillNode[] = [
  { id: "1", level: 1, title: "Array Awakening", category: "Arrays & Strings", status: "unlocked", xpReward: 150, icon: "⚔️", description: "Master two-pointer convergence, sliding window, and linear scans." },
  { id: "2", level: 2, title: "Binary Search Portal", category: "Search Algorithms", status: "unlocked", xpReward: 200, icon: "🎯", description: "Halve search space in log₂(N) steps. Master monotonic predicates." },
  { id: "3", level: 3, title: "Graph Labyrinth", category: "Graphs & Trees", status: "in-progress", xpReward: 350, icon: "🕸️", description: "Conquer BFS shortest path queues, DFS recursion, and Dijkstra's algorithm." },
  { id: "4", level: 4, title: "Dynamic Kingdom", category: "Dynamic Programming", status: "locked", xpReward: 500, icon: "👑", description: "Unlock memoization tables, bottom-up 2D grid DP, and knapsack optimization." },
  { id: "5", level: 5, title: "System Architect", category: "Distributed Systems", status: "locked", xpReward: 1000, icon: "🏛️", description: "Design scalable microservices, load balancers, and Redis caching layers." },
];

export default function SkillTreeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [unlockedNodes, setUnlockedNodes] = useState<string[]>(["1", "2"]);
  const [claimedChest, setClaimedChest] = useState(false);

  if (!isOpen) return null;

  const handleUnlock = (node: SkillNode) => {
    soundFx.playSuccess();
    if (!unlockedNodes.includes(node.id)) {
      setUnlockedNodes([...unlockedNodes, node.id]);
    }
  };

  const handleClaimChest = () => {
    soundFx.playSuccess();
    setClaimedChest(true);
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-[#0D0D0D] border border-white/20 rounded-3xl p-6 w-full max-w-2xl text-white shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase tracking-widest mb-1">RPG MASTERY QUEST</div>
            <h2 className="font-display font-black text-3xl uppercase">INTERACTIVE DSA SKILL TREE</h2>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white font-bold text-sm">✕</button>
        </div>

        {/* Skill Node Path Line */}
        <div className="relative flex flex-col gap-6 max-h-[420px] overflow-y-auto pr-2">
          {/* Vertical Connecting Line */}
          <div className="absolute left-7 top-6 bottom-6 w-1 bg-white/10 rounded-full z-0"></div>

          {skillNodes.map((node) => {
            const isUnlocked = unlockedNodes.includes(node.id);
            const isCurrent = node.status === "in-progress" && !isUnlocked;

            return (
              <div key={node.id} className="flex items-start gap-4 relative z-10">
                {/* Node Icon Circle */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl flex-shrink-0 border-2 transition-transform duration-300 ${
                    isUnlocked
                      ? "bg-[#1E7A4E] border-[#28C840] scale-105"
                      : isCurrent
                      ? "bg-[#E44D26] border-[#FF7347] animate-pulse"
                      : "bg-white/5 border-white/10 opacity-50 grayscale"
                  }`}
                >
                  {node.icon}
                </div>

                {/* Node Details Card */}
                <div className={`flex-1 rounded-2xl p-4 border transition-all ${
                  isUnlocked ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10"
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#E44D26] uppercase">Level {node.level}</span>
                      <h3 className="font-display font-black text-lg uppercase">{node.title}</h3>
                    </div>

                    <span className="text-[10px] font-mono font-bold bg-[#E44D26]/20 text-[#E44D26] px-2.5 py-0.5 rounded-full">
                      +{node.xpReward} XP
                    </span>
                  </div>

                  <div className="text-[10px] text-white/50 font-mono mb-2">{node.category}</div>
                  <p className="text-xs text-white/80 leading-relaxed mb-3">{node.description}</p>

                  <div className="flex justify-end">
                    {isUnlocked ? (
                      <span className="text-[10px] font-mono font-bold text-[#28C840] flex items-center gap-1">
                        ✓ UNLOCKED & MASTERED
                      </span>
                    ) : (
                      <button
                        onClick={() => handleUnlock(node)}
                        className="bg-[#E44D26] text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-colors shadow-md"
                      >
                        Unlock Quest Node ⚔️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Milestone Chest Reward */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎁</span>
            <div>
              <div className="text-xs font-bold uppercase font-display">MILESTONE CHEST REWARD</div>
              <div className="text-[10px] text-white/50 font-mono">Complete 3 nodes to claim +500 XP Bonus!</div>
            </div>
          </div>

          <button
            onClick={handleClaimChest}
            disabled={claimedChest}
            className={`font-mono text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md ${
              claimedChest
                ? "bg-[#1E7A4E] text-white"
                : "bg-[#E44D26] text-white hover:bg-white hover:text-black"
            }`}
          >
            {claimedChest ? "✓ Chest Claimed!" : "Claim Reward Chest 🎉"}
          </button>
        </div>
      </div>
    </div>
  );
}
