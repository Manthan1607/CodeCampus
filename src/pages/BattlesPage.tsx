import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { leaderboard } from "../data/mockData";
import { socket, connectSocket, disconnectSocket } from "../services/socket";
import BattleRadarModal from "../components/BattleRadarModal";

type BattleState = "lobby" | "matchmaking" | "battle" | "victory" | "defeat";

const BATTLE_PROBLEM = {
  title: "Valid Parentheses",
  difficulty: "Easy",
  desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
};

function ConfettiPiece({ x, color, delay }: { x: number; color: string; delay: number }) {
  return (
    <div
      className="confetti-piece fixed w-3 h-2 rounded-sm pointer-events-none z-50"
      style={{
        left: `${x}%`,
        top: "-20px",
        backgroundColor: color,
        animationDuration: `${2 + Math.random() * 2}s`,
        animationDelay: `${delay}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    ></div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 40 }).map((_, i) => ({
    x: Math.random() * 100,
    color: ["#E44D26", "#0D0D0D", "#1E7A4E", "#1B52CC", "#FEBC2E"][Math.floor(Math.random() * 5)],
    delay: Math.random() * 1,
  }));
  return <>{pieces.map((p, i) => <ConfettiPiece key={i} {...p} />)}</>;
}

function BattleEditor({ player, code, onCodeChange, progress }: {
  player: { name: string; avatar: string; rating: number };
  code: string;
  onCodeChange?: (c: string) => void;
  progress: number;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] border-b border-[#2A2A2A] flex-shrink-0">
        <div className="w-6 h-6 rounded-full bg-[#E44D26] text-white text-xs font-bold flex items-center justify-center">
          {player.avatar}
        </div>
        <span className="text-white text-sm font-semibold">{player.name}</span>
        <span className="text-white/40 text-xs">Rating {player.rating}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-24 h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E44D26] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-white/40">{Math.round(progress)}%</span>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => onCodeChange?.(e.target.value)}
        readOnly={!onCodeChange}
        className="flex-1 bg-[#0D0D0D] text-[#EEFFFF] font-mono text-xs p-4 resize-none focus:outline-none leading-5 caret-[#E44D26]"
        placeholder="// Write your solution here..."
      />
    </div>
  );
}

export default function BattlesPage() {
  const [state, setState] = useState<BattleState>("lobby");
  const [radarOpen, setRadarOpen] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [battleTime, setBattleTime] = useState(300);
  const [myCode, setMyCode] = useState("// Valid Parentheses\nfunction isValid(s) {\n  \n}");
  const [opponentCode, setOpponentCode] = useState("# Valid Parentheses\ndef isValid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            if not stack or stack[-1] != mapping[char]:\n                return False\n            stack.pop()\n        else:\n            stack.append(char)\n    return not stack");
  const [myProgress, setMyProgress] = useState(0);
  const [oppProgress, setOppProgress] = useState(0);
  const [battleId, setBattleId] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Setup socket connection & listeners
  useEffect(() => {
    connectSocket();

    socket.on("match_found", (data: any) => {
      setBattleId(data.battleId);
      setState("battle");
      setBattleTime(data.duration || 300);
      setMyProgress(0);
      setOppProgress(0);
    });

    socket.on("opponent_code_sync", (data: { code: string; progress: number }) => {
      if (data.code) setOpponentCode(data.code);
      if (typeof data.progress === "number") setOppProgress(data.progress);
    });

    socket.on("battle_result", (data: any) => {
      if (data.winnerSocketId === socket.id) {
        setState("victory");
      } else {
        setState("defeat");
      }
      if (timerRef.current) clearInterval(timerRef.current);
    });

    return () => {
      socket.off("match_found");
      socket.off("opponent_code_sync");
      socket.off("battle_result");
    };
  }, []);

  const handleStartMatchmaking = () => {
    setState("matchmaking");
    socket.emit("join_queue", {
      userId: "user_123",
      name: "Priya Sharma",
      avatar: "PS",
      rating: 1847,
    });
  };

  useEffect(() => {
    if (state === "matchmaking") {
      const t = setTimeout(() => {
        if (state === "matchmaking") {
          // Fallback simulation if socket server offline
          setState("battle");
          setBattleTime(300);
          setMyProgress(0);
          setOppProgress(0);
        }
      }, 3500);
      return () => clearTimeout(t);
    }
    if (state === "battle") {
      timerRef.current = setInterval(() => {
        setBattleTime((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setState("defeat");
            return 0;
          }
          return t - 1;
        });
        setOppProgress((p) => Math.min(100, p + 1.5));
      }, 200);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [state]);

  useEffect(() => {
    const words = myCode.split(/\s+/).filter(Boolean).length;
    const progressVal = Math.min(95, words * 3);
    setMyProgress(progressVal);

    if (battleId && socket.connected) {
      socket.emit("code_sync", { battleId, code: myCode, progress: progressVal });
    }

    if (words > 25) {
      if (battleId && socket.connected) {
        socket.emit("submit_battle_solution", { battleId, code: myCode });
      }
      setState("victory");
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [myCode, battleId]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <DashboardLayout role="student">
      {state === "victory" && <Confetti />}

      {state === "lobby" && (
        <div className="p-6 max-w-7xl mx-auto">
          
          {/* Esports Battle Arena Header Banner with 3D Image */}
          <div className="relative rounded-3xl overflow-hidden mb-8 bg-[#0D0D0D] border border-white/10 shadow-2xl p-8 text-white min-h-[280px] flex flex-col justify-between group">
            
            {/* 3D Esports Coding Battle Stadium Image */}
            <img
              src="/assets/story_scene_2.jpg"
              alt="1v1 Esports Coding Battle Stadium"
              className="absolute inset-0 w-full h-full object-cover opacity-50 contrast-[1.08] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent z-10"></div>

            <div className="relative z-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1 bg-[#E44D26]/20 border border-[#E44D26]/40 px-3.5 py-1 rounded-full w-fit">
                  ⚔️ LIVE ESPORTS CODING ARENA
                </div>
                <h1 className="font-display font-black text-4xl lg:text-6xl uppercase leading-none mt-2 mb-2">
                  1v1 BATTLES ARENA
                </h1>
                <p className="text-white/80 font-mono text-xs max-w-xl">
                  Compete side-by-side in real-time code diff battles with top programmers nationwide.
                </p>
              </div>

              {/* Matchmaking Action Button */}
              <button
                onClick={() => {
                  setRadarOpen(true);
                  handleStartMatchmaking();
                }}
                className="bg-[#E44D26] text-white font-mono font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-2xl border border-white/20 whitespace-nowrap"
              >
                ENTER 1v1 RADAR ARENA ⚔️
              </button>
            </div>

            {/* Glassmorphic Stats Strip */}
            <div className="relative z-20 grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/15">
              {[
                { label: "Battles Won", value: "34", sub: "W/L ratio 65%" },
                { label: "Current Rating", value: "1847", sub: "Top 12% Nationwide" },
                { label: "Global Rank", value: "#142", sub: "Division Standings" },
              ].map((s) => (
                <div key={s.label} className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                  <div className="text-[10px] font-mono text-white/50 uppercase">{s.label}</div>
                  <div className="font-display font-black text-2xl text-white mt-0.5">{s.value}</div>
                  <div className="text-[10px] font-mono text-[#28C840] mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <BattleRadarModal
            isOpen={radarOpen}
            onClose={() => {
              setRadarOpen(false);
              setState("battle");
            }}
          />

          {/* Leaderboard */}
          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EFE9]">
              <div>
                <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">Rankings</div>
                <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">GLOBAL LEADERBOARD</div>
              </div>
              <div className="flex gap-1 bg-[#F0EFE9] rounded-full p-1">
                {["All Time", "Weekly", "Monthly"].map((t) => (
                  <button key={t} className="text-[10px] font-semibold px-3 py-1 rounded-full text-[#68665F] hover:bg-white hover:text-[#0D0D0D] transition-colors first:bg-white first:text-[#0D0D0D]">
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-[#F7F6F3]">
              {leaderboard.map((player) => (
                <div key={player.rank} className="flex items-center gap-4 px-5 py-3 hover:bg-[#F7F6F3] transition-colors">
                  <span className={`font-display font-black text-2xl w-8 flex-shrink-0 ${
                    player.rank <= 3 ? "text-[#E44D26]" : "text-[#DDDBD5]"
                  }`}>
                    {player.rank <= 3 ? ["🥇", "🥈", "🥉"][player.rank - 1] : player.rank}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {player.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#0D0D0D]">{player.name}</div>
                    <div className="text-[11px] text-[#A09E98]">{player.college}</div>
                  </div>
                  <div className="hidden md:flex items-center gap-6 text-[11px]">
                    <span className="text-[#A09E98]">Rating <span className="font-bold text-[#0D0D0D]">{player.rating}</span></span>
                    <span className="text-[#A09E98]">Solved <span className="font-bold text-[#0D0D0D]">{player.solved}</span></span>
                    <span className="text-[#A09E98]">🔥 <span className="font-bold text-[#0D0D0D]">{player.streak}</span></span>
                    <span className="font-display font-bold text-lg text-[#0D0D0D]">{player.xp.toLocaleString()} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {state === "matchmaking" && (
        <div className="flex items-center justify-center h-[calc(100vh-56px)] bg-[#F7F6F3]">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-[#E44D26]/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-[#E44D26] rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-transparent border-t-[#0D0D0D] rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display font-black text-2xl text-[#E44D26]">⚔</span>
              </div>
            </div>
            <div className="font-display font-black text-4xl text-[#0D0D0D] uppercase mb-3">FINDING MATCH</div>
            <p className="text-[#68665F] text-sm mb-6">Searching for a player near rating 1847...</p>
            <div className="flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-[#E44D26]" style={{ animation: `pulse-dot 1s ease-in-out ${i * 0.2}s infinite` }}></div>
              ))}
            </div>
            <button onClick={() => setState("lobby")} className="mt-8 text-sm text-[#A09E98] hover:text-[#0D0D0D] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {state === "battle" && (
        <div className="flex flex-col h-[calc(100vh-56px)] bg-[#0D0D0D]">
          {/* Battle header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#1A1A1A] border-b border-[#2A2A2A] flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="font-display font-black text-white uppercase">{BATTLE_PROBLEM.title}</div>
              <span className="text-[10px] font-semibold bg-[#EDFBF3]/20 text-[#28C840] px-2 py-0.5 rounded-full">
                {BATTLE_PROBLEM.difficulty}
              </span>
            </div>
            <div className="font-display font-black text-[#E44D26] text-2xl">{formatTime(battleTime)}</div>
            <div className="flex gap-2">
              <button
                onClick={() => { setState("victory"); if (timerRef.current) clearInterval(timerRef.current); }}
                className="bg-[#1E7A4E] text-white font-semibold px-4 py-1.5 rounded-lg text-xs hover:bg-[#166238] transition-colors"
              >
                SUBMIT
              </button>
            </div>
          </div>

          {/* Problem brief */}
          <div className="px-6 py-3 bg-[#0D0D0D] border-b border-[#1A1A1A] flex-shrink-0">
            <p className="text-white/70 text-xs leading-relaxed">{BATTLE_PROBLEM.desc}</p>
          </div>

          {/* Dual editors */}
          <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden divide-x divide-[#2A2A2A]">
            <BattleEditor
              player={{ name: "You (Priya)", avatar: "PS", rating: 1847 }}
              code={myCode}
              onCodeChange={setMyCode}
              progress={myProgress}
            />
            <BattleEditor
              player={{ name: "Vikram Singh", avatar: "VS", rating: 2134 }}
              code={opponentCode}
              progress={oppProgress}
            />
          </div>
        </div>
      )}

      {(state === "victory" || state === "defeat") && (
        <div className="flex items-center justify-center h-[calc(100vh-56px)] bg-[#F7F6F3]">
          <div className="text-center max-w-lg">
            {state === "victory" ? (
              <>
                <div className="font-display font-black text-[120px] text-[#E44D26] leading-none mb-4">WIN</div>
                <div className="font-display font-black text-4xl text-[#0D0D0D] uppercase mb-3">BATTLE COMPLETE!</div>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-[#1E7A4E]">+42</div>
                    <div className="text-[11px] text-[#A09E98] uppercase tracking-widets">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-[#E44D26]">+150</div>
                    <div className="text-[11px] text-[#A09E98] uppercase tracking-widets">XP</div>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-black text-3xl text-[#0D0D0D]">#11</div>
                    <div className="text-[11px] text-[#A09E98] uppercase tracking-widets">New Rank</div>
                  </div>
                </div>
                <p className="text-[#68665F] mb-8">You solved Valid Parentheses in 1:48 — faster than your opponent!</p>
              </>
            ) : (
              <>
                <div className="font-display font-black text-[120px] text-[#A09E98] leading-none mb-4">LOSE</div>
                <div className="font-display font-black text-4xl text-[#0D0D0D] uppercase mb-3">DEFEATED</div>
                <p className="text-[#68665F] mb-8">Vikram Singh solved it first. Study the solution and come back stronger.</p>
              </>
            )}
            <div className="flex items-center justify-center gap-4">
              <button onClick={() => setState("matchmaking")} className="bg-[#E44D26] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#C93D18] transition-colors">
                REMATCH
              </button>
              <button onClick={() => setState("lobby")} className="border border-[#DDDBD5] text-[#0D0D0D] font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#F0EFE9] transition-colors">
                BACK TO LOBBY
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
