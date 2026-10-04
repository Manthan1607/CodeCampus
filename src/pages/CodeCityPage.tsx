import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";

interface Building {
  id: string;
  name: string;
  lines: number;
  functions: number;
  coverage: number;
  colorHex: string;
}

const cityBuildings: Building[] = [
  { id: "1", name: "AuthEngine.ts", lines: 420, functions: 14, coverage: 95, colorHex: "#1E7A4E" },
  { id: "2", name: "BattleSocket.ts", lines: 780, functions: 22, coverage: 88, colorHex: "#E44D26" },
  { id: "3", name: "ProblemRouter.ts", lines: 310, functions: 10, coverage: 92, colorHex: "#1B52CC" },
  { id: "4", name: "UserStore.ts", lines: 560, functions: 18, coverage: 82, colorHex: "#A65C00" },
  { id: "5", name: "ReelGenerator.ts", lines: 690, functions: 24, coverage: 90, colorHex: "#9333EA" },
];

export default function CodeCityPage() {
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(cityBuildings[1]);

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">3D VISUAL CODE ARCHITECTURE</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">3D CODE CITY SKYSCRAPERS</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 3D Isometric City Canvas */}
          <div className="lg:col-span-8 bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 text-white min-h-[460px] relative overflow-hidden shadow-2xl flex flex-col justify-end">
            <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-mono text-white/50">
              <span className="w-2 h-2 rounded-full bg-[#E44D26] animate-ping"></span>
              3D ISOMETRIC CITY MATRIX RENDERING
            </div>

            {/* Isometric Skyscraper Grid */}
            <div className="relative w-full h-80 flex items-end justify-center gap-6 pb-6" style={{ perspective: "800px" }}>
              {cityBuildings.map((b) => {
                const isSelected = selectedBuilding.id === b.id;
                const heightPct = Math.max(30, (b.lines / 800) * 100);

                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedBuilding(b);
                    }}
                    className={`group cursor-pointer flex flex-col items-center flex-1 max-w-[80px] transition-all duration-500 transform ${
                      isSelected ? "scale-110 -translate-y-2 z-20" : "opacity-80 hover:opacity-100 hover:-translate-y-1"
                    }`}
                    style={{ transformStyle: "preserve-3d", transform: "rotateX(25deg) rotateY(-15deg)" }}
                  >
                    {/* Building Name overhead */}
                    <div className="text-[9px] font-mono font-bold text-center mb-1 truncate text-white/70">
                      {b.name}
                    </div>

                    {/* 3D Building Tower Box */}
                    <div
                      className="w-full rounded-t-xl transition-all duration-300 shadow-2xl relative border-t-2 border-white/40 flex flex-col justify-between p-1"
                      style={{ height: `${heightPct}%`, backgroundColor: b.colorHex }}
                    >
                      {/* Windows grid effect */}
                      <div className="grid grid-cols-2 gap-1 opacity-60">
                        {Array.from({ length: 6 }).map((_, idx) => (
                          <div key={idx} className="h-1 bg-white/60 rounded-xs"></div>
                        ))}
                      </div>

                      <div className="text-[9px] font-mono font-bold text-center text-white/90">
                        {b.lines}L
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Building Details Panel */}
          <div className="lg:col-span-4 bg-white border border-[#DDDBD5] rounded-3xl p-6 shadow-xs">
            <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase mb-1">BUILDING ARCHITECTURE</div>
            <h2 className="font-display font-black text-2xl text-[#0D0D0D] uppercase mb-4">{selectedBuilding.name}</h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#F7F6F3] p-3 rounded-xl border border-[#F0EFE9] text-center">
                <div className="font-display font-black text-2xl text-[#0D0D0D]">{selectedBuilding.lines}</div>
                <div className="text-[10px] text-[#A09E98] font-mono uppercase">Lines of Code</div>
              </div>

              <div className="bg-[#F7F6F3] p-3 rounded-xl border border-[#F0EFE9] text-center">
                <div className="font-display font-black text-2xl text-[#E44D26]">{selectedBuilding.functions}</div>
                <div className="text-[10px] text-[#A09E98] font-mono uppercase">Functions</div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] rounded-2xl p-4 text-white mb-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span>TEST COVERAGE</span>
                <span className="text-[#28C840] font-bold">{selectedBuilding.coverage}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-[#28C840] rounded-full" style={{ width: `${selectedBuilding.coverage}%` }}></div>
              </div>
            </div>

            <button
              onClick={() => soundFx.playSuccess()}
              className="w-full bg-[#E44D26] text-white font-bold py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-[#0D0D0D] transition-colors shadow-md"
            >
              INSPECT CODE MODULE →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
