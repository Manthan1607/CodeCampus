import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";

interface LeagueTier {
  name: string;
  badgeLabel: string;
  colorHex: string;
  minXP: number;
}

const tiers: LeagueTier[] = [
  { name: "Master League", badgeLabel: "MASTER", colorHex: "#FFD700", minXP: 10000 },
  { name: "Diamond League", badgeLabel: "DIAMOND", colorHex: "#38BDF8", minXP: 7500 },
  { name: "Platinum League", badgeLabel: "PLATINUM", colorHex: "#A855F7", minXP: 5000 },
  { name: "Gold League", badgeLabel: "GOLD", colorHex: "#EAB308", minXP: 3000 },
  { name: "Silver League", badgeLabel: "SILVER", colorHex: "#94A3B8", minXP: 1500 },
  { name: "Bronze League", badgeLabel: "BRONZE", colorHex: "#B45309", minXP: 0 },
];

interface CoderRank {
  rank: number;
  name: string;
  photo: string;
  xp: number;
  rating: number;
  solved: number;
  isPromotionZone?: boolean;
  isRelegationZone?: boolean;
}

const leagueStandings: CoderRank[] = [
  {
    rank: 1,
    name: "Priya Sharma",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    xp: 8420,
    rating: 2134,
    solved: 210,
    isPromotionZone: true,
  },
  {
    rank: 2,
    name: "Vikram Singh",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    xp: 7910,
    rating: 2045,
    solved: 189,
    isPromotionZone: true,
  },
  {
    rank: 3,
    name: "Manthan Mandavkar",
    photo: "/assets/user_photo_manthan.jpg",
    xp: 7450,
    rating: 1980,
    solved: 175,
    isPromotionZone: true,
  },
  {
    rank: 4,
    name: "Rohan Mehta",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    xp: 6200,
    rating: 1840,
    solved: 142,
  },
  {
    rank: 5,
    name: "Ananya Patel",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    xp: 5800,
    rating: 1790,
    solved: 130,
  },
  {
    rank: 6,
    name: "Devansh Gupta",
    photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    xp: 3200,
    rating: 1540,
    solved: 95,
    isRelegationZone: true,
  },
];

export default function LeaguesPage() {
  const [selectedTierIdx, setSelectedTierIdx] = useState(1); // Diamond

  const currentTier = tiers[selectedTierIdx];

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">WEEKLY DIVISION STANDINGS</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">GLOBAL DIVISION LEAGUES</h1>
          </div>

          <div className="bg-[#0D0D0D] text-white font-mono text-xs font-bold px-5 py-2.5 rounded-full border border-white/20">
            ⏳ Weekly Reset: <span className="text-[#E44D26]">2 Days 14 Hours</span>
          </div>
        </div>

        {/* Division Tiers Cards (Clean SVG Icons) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
          {tiers.map((t, idx) => (
            <div
              key={t.name}
              onClick={() => {
                soundFx.playClick();
                setSelectedTierIdx(idx);
              }}
              className={`cursor-pointer rounded-2xl p-4 border text-center transition-all ${
                selectedTierIdx === idx
                  ? "bg-[#0D0D0D] text-white border-[#0D0D0D] shadow-xl scale-105"
                  : "bg-white text-[#0D0D0D] border-[#DDDBD5] hover:border-[#0D0D0D]"
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-[#E44D26]/10 text-[#E44D26] font-bold text-xs flex items-center justify-center mx-auto mb-2 font-mono border border-[#E44D26]/20">
                {t.badgeLabel.charAt(0)}
              </div>
              <div className="font-display font-black text-xs uppercase truncate">{t.name}</div>
              <div className="text-[10px] font-mono text-[#A09E98] mt-0.5">{t.minXP}+ XP</div>
            </div>
          ))}
        </div>

        {/* Standings Table with Real Human Coder Photos */}
        <div className="bg-white border border-[#DDDBD5] rounded-3xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 bg-[#0D0D0D] text-white flex items-center justify-between">
            <div>
              <div className="font-display font-black text-xl uppercase">{currentTier.name} Standings</div>
              <div className="text-[10px] font-mono text-white/50">Top 3 Promoted to Next Division</div>
            </div>
          </div>

          <div className="divide-y divide-[#F7F6F3]">
            {leagueStandings.map((c) => (
              <div
                key={c.rank}
                className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                  c.isPromotionZone ? "bg-[#EDFBF3]" : c.isRelegationZone ? "bg-[#FFF1EE]" : "hover:bg-[#F7F6F3]"
                }`}
              >
                <span className="font-display font-black text-xl text-[#0D0D0D] w-8 flex-shrink-0">
                  #{c.rank}
                </span>

                {/* Real Coder Profile Photo */}
                <div className="w-11 h-11 rounded-2xl overflow-hidden border border-[#DDDBD5] flex-shrink-0 shadow-sm">
                  <img
                    src={c.photo}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-[#0D0D0D] font-display">{c.name}</div>
                  <div className="text-xs text-[#A09E98] font-mono">
                    Rating {c.rating} · {c.solved} solved
                  </div>
                </div>

                <div className="flex items-center gap-6 font-mono text-xs text-right">
                  <div>
                    <div className="text-[#E44D26] font-bold">{c.xp.toLocaleString()}</div>
                    <div className="text-[10px] text-[#A09E98]">Weekly XP</div>
                  </div>

                  {c.isPromotionZone && (
                    <span className="text-[10px] font-mono font-bold bg-[#1E7A4E] text-white px-3 py-1 rounded-full">
                      ▲ PROMOTION ZONE
                    </span>
                  )}
                  {c.isRelegationZone && (
                    <span className="text-[10px] font-mono font-bold bg-[#C93D18] text-white px-3 py-1 rounded-full">
                      ▼ RELEGATION ZONE
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
