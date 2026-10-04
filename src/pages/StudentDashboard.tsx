import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import DailyRewardModal from "../components/DailyRewardModal";
import SkillTreeModal from "../components/SkillTreeModal";
import VideoPlayer from "../components/VideoPlayer";
import { problems } from "../data/mockData";
import { soundFx } from "../utils/audio";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const xpData = [
  { week: "W1", xp: 1200 },
  { week: "W2", xp: 1850 },
  { week: "W3", xp: 1400 },
  { week: "W4", xp: 2100 },
  { week: "W5", xp: 2950 },
];

const courses = [
  { id: "1", title: "Two Pointers Technique", progress: 78, completed: 18, total: 24, poster: "/assets/video_poster_two_pointers.jpg", instructor: "Prof. Turing" },
  { id: "2", title: "Binary Search Halving", progress: 45, completed: 9, total: 20, poster: "/assets/video_poster_binary_search.jpg", instructor: "Dr. Ada Lovelace" },
  { id: "3", title: "LRU Cache Masterclass", progress: 90, completed: 18, total: 20, poster: "/assets/video_poster_lru_cache.jpg", instructor: "Prof. Turing" },
];

const videoSessionData: Record<string, {
  title: string;
  instructor: string;
  avatar: string;
  posterImage: string;
  narrationText: string;
  chapters: { time: string; seconds: number; title: string }[];
  codeSnippet: string;
}> = {
  "1": {
    title: "Two Pointers Technique",
    instructor: "Prof. Turing",
    avatar: "PT",
    posterImage: "/assets/video_poster_two_pointers.jpg",
    narrationText: "In this video lesson, we explore how Two Pointers eliminates nested loops. We start left pointer at 0 and right pointer at N-1.",
    chapters: [
      { time: "0:00", seconds: 0, title: "1. Problem Breakdown" },
      { time: "1:15", seconds: 75, title: "2. Two Pointer Visualization" },
      { time: "2:40", seconds: 160, title: "3. C++ Code Walkthrough" },
    ],
    codeSnippet: `class Solution {\npublic:\n    vector<int> twoSumSorted(vector<int>& nums, int target) {\n        int left = 0, right = nums.size() - 1;\n        while (left < right) {\n            int sum = nums[left] + nums[right];\n            if (sum == target) return {left, right};\n            if (sum < target) left++;\n            else right--;\n        }\n        return {};\n    }\n};`,
  },
  "2": {
    title: "Binary Search Halving Portal",
    instructor: "Dr. Ada Lovelace",
    avatar: "AL",
    posterImage: "/assets/video_poster_binary_search.jpg",
    narrationText: "Binary search cuts the search space in half at every step. Comparing target against mid eliminates 50% of candidates instantly.",
    chapters: [
      { time: "0:00", seconds: 0, title: "1. Search Space Halving" },
      { time: "1:20", seconds: 80, title: "2. Midpoint Calculation" },
      { time: "3:00", seconds: 180, title: "3. Boundary Edge Cases" },
    ],
    codeSnippet: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int low = 0, high = nums.size() - 1;\n        while (low <= high) {\n            int mid = low + (high - low) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return -1;\n    }\n};`,
  },
  "3": {
    title: "LRU Cache Design Masterclass",
    instructor: "Prof. Turing",
    avatar: "PT",
    posterImage: "/assets/video_poster_lru_cache.jpg",
    narrationText: "Learn how high-performance databases implement LRU Cache eviction using hash map lookups combined with doubly-linked list node removal.",
    chapters: [
      { time: "0:00", seconds: 0, title: "1. Cache Eviction Concept" },
      { time: "1:45", seconds: 105, title: "2. Doubly-Linked List Operations" },
      { time: "3:15", seconds: 195, title: "3. O(1) Time Complexity Proof" },
    ],
    codeSnippet: `class LRUCache {\n    unordered_map<int, list<pair<int,int>>::iterator> map;\n    list<pair<int,int>> cache;\n    int cap;\npublic:\n    LRUCache(int capacity) : cap(capacity) {}\n    int get(int key) {\n        if (!map.count(key)) return -1;\n        cache.splice(cache.begin(), cache, map[key]);\n        return map[key]->second;\n    }\n};`,
  },
};

export default function StudentDashboard() {
  const [tab, setTab] = useState<"overview" | "progress" | "activity">("overview");
  const [rewardModalOpen, setRewardModalOpen] = useState(false);
  const [rpgModalOpen, setRpgModalOpen] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const activeVideo = activeSessionId ? videoSessionData[activeSessionId] : null;

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">
              STUDENT DASHBOARD · IIT DELHI
            </div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">
              WELCOME BACK, MANTHANMANDAVKAR07.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playSuccess();
                setRpgModalOpen(true);
              }}
              className="bg-[#0D0D0D] text-white font-mono font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-[#E44D26] transition-colors shadow-md flex items-center gap-2"
            >
              <span>🌳</span> RPG SKILL TREE
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setRewardModalOpen(true);
              }}
              className="bg-[#E44D26] text-white font-mono font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-[#0D0D0D] transition-colors shadow-md flex items-center gap-2"
            >
              <span>🎡</span> DAILY REWARD WHEEL
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 mb-8 bg-white border border-[#DDDBD5] rounded-xl p-1 w-fit shadow-xs font-mono">
          {(["overview", "progress", "activity"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                tab === t ? "bg-[#0D0D0D] text-white" : "text-[#68665F] hover:text-[#0D0D0D]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#0D0D0D] text-white rounded-2xl p-5 shadow-lg border border-white/10">
                <div className="text-[10px] font-mono font-bold text-[#A09E98] uppercase">XP TOTAL</div>
                <div className="font-display font-black text-4xl text-white mt-1">9,500</div>
                <div className="text-[10px] font-mono text-[#28C840] mt-1">+340 this week</div>
              </div>

              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5 shadow-xs">
                <div className="text-[10px] font-mono font-bold text-[#A09E98] uppercase">PROBLEMS SOLVED</div>
                <div className="font-display font-black text-4xl text-[#0D0D0D] mt-1">189</div>
                <div className="text-[10px] font-mono text-[#68665F] mt-1">Out of 1,000+</div>
              </div>

              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5 shadow-xs">
                <div className="text-[10px] font-mono font-bold text-[#A09E98] uppercase">GLOBAL RANK</div>
                <div className="font-display font-black text-4xl text-[#0D0D0D] mt-1">#12</div>
                <div className="text-[10px] font-mono text-[#E44D26] mt-1">Top 0.1%</div>
              </div>

              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5 shadow-xs">
                <div className="text-[10px] font-mono font-bold text-[#A09E98] uppercase">RATING</div>
                <div className="font-display font-black text-4xl text-[#0D0D0D] mt-1">1910</div>
                <div className="text-[10px] font-mono text-[#A65C00] mt-1">Streak: 47 🔥</div>
              </div>
            </div>

            {/* Featured Video Lessons Section with Playable Session Trigger */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase tracking-widest">3D AI TEACHER VIDEO COURSES</div>
                  <h2 className="font-display font-black text-2xl text-[#0D0D0D] uppercase">FEATURED VIDEO LESSONS</h2>
                </div>
                <Link
                  to="/learn-animated"
                  className="text-xs font-mono font-bold text-[#E44D26] hover:underline uppercase"
                >
                  VIEW ALL VIDEO COURSES →
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {courses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      soundFx.playClick();
                      setActiveSessionId(c.id);
                    }}
                    className="cursor-pointer bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden shadow-xl group hover:border-[#E44D26] transition-all"
                  >
                    <div className="relative h-44 bg-black overflow-hidden">
                      <img
                        src={c.poster}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 contrast-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                      
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold text-[#28C840] border border-white/10">
                        ● HD VIDEO STREAM
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#E44D26] text-white flex items-center justify-center text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform">
                          ▶
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono">
                        <span>{c.instructor}</span>
                        <span className="text-[#E44D26] font-bold">{c.progress}% COMPLETED</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-display font-bold text-base text-white uppercase leading-tight mb-2">{c.title}</h3>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#E44D26] rounded-full" style={{ width: `${c.progress}%` }}></div>
                      </div>
                      <div className="text-[10px] font-mono text-[#28C840] mt-2 font-bold">CLICK TO LAUNCH LIVE VIDEO LESSON SESSION ▶</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* XP Chart */}
            <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5 shadow-xs mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#A09E98] uppercase">WEEKLY XP</div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">EXPERIENCE EARNED</div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-[#EDFBF3] text-[#1E7A4E] px-3 py-1 rounded-full">↑ 18% vs last month</span>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={xpData} barSize={20}>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#A09E98" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ background: "#0D0D0D", border: "none", borderRadius: "8px", fontSize: "11px", color: "white" }}
                    labelStyle={{ color: "white" }}
                    cursor={{ fill: "#F7F6F3" }}
                  />
                  <Bar dataKey="xp" fill="#E44D26" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recommended Problems */}
            <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden shadow-xs">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EFE9]">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#A09E98] uppercase">PRACTICE</div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">RECOMMENDED PROBLEMS</div>
                </div>
                <Link to="/dsa" className="text-xs font-mono font-bold text-[#E44D26] hover:underline">VIEW ALL →</Link>
              </div>
              <div className="divide-y divide-[#F7F6F3]">
                {problems.map((p) => (
                  <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#F7F6F3]">
                    <div>
                      <div className="text-xs font-bold text-[#0D0D0D] font-mono">{p.title}</div>
                      <div className="text-[10px] text-[#A09E98] font-mono">{p.tags[0]} · {p.difficulty}</div>
                    </div>
                    <Link
                      to={`/ide/${p.id}`}
                      onClick={() => soundFx.playClick()}
                      className="text-[10px] font-mono font-bold bg-[#0D0D0D] text-white px-3 py-1.5 rounded-lg hover:bg-[#E44D26] transition-colors"
                    >
                      SOLVE →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Live Interactive Video Lesson Session Modal Overlay */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 overflow-y-auto animate-fadeIn">
            <div className="bg-[#0D0D0D] border border-white/20 rounded-3xl max-w-6xl w-full p-6 text-white shadow-2xl relative">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="text-[10px] font-mono font-bold text-[#28C840] uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#28C840] animate-ping"></span>
                    LIVE 3D AI TEACHER STREAM SESSION ACTIVE
                  </div>
                  <h2 className="font-display font-black text-2xl uppercase">{activeVideo.title}</h2>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick();
                    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                    setActiveSessionId(null);
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#E44D26] text-white font-bold text-lg flex items-center justify-center transition-colors font-mono"
                >
                  ✕
                </button>
              </div>

              {/* Video Player + Code Workspace Grid */}
              <div className="grid lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Video Player Stream */}
                <div className="lg:col-span-7">
                  <VideoPlayer
                    title={activeVideo.title}
                    instructor={activeVideo.instructor}
                    avatar={activeVideo.avatar}
                    posterImage={activeVideo.posterImage}
                    chapters={activeVideo.chapters}
                    narrationText={activeVideo.narrationText}
                  />
                </div>

                {/* Right Column: Code Editor */}
                <div className="lg:col-span-5 bg-black border border-white/10 rounded-3xl p-5 text-white shadow-2xl flex flex-col h-[480px]">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                    <span className="text-xs font-mono font-bold text-[#E44D26]">LESSON WORKSPACE</span>
                    <span className="text-[10px] font-mono text-[#28C840]">GCC 13.2 · C++17</span>
                  </div>

                  <textarea
                    readOnly
                    value={activeVideo.codeSnippet}
                    className="flex-1 w-full bg-black text-[#82AAFF] font-mono text-xs p-4 rounded-xl border border-white/10 focus:outline-none resize-none leading-relaxed"
                  />

                  <div className="flex justify-between items-center pt-3">
                    <Link
                      to="/ide/1"
                      onClick={() => {
                        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                        setActiveSessionId(null);
                      }}
                      className="bg-[#E44D26] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-md font-mono"
                    >
                      PRACTICE IN IDE →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <DailyRewardModal isOpen={rewardModalOpen} onClose={() => setRewardModalOpen(false)} />
        <SkillTreeModal isOpen={rpgModalOpen} onClose={() => setRpgModalOpen(false)} />
      </div>
    </DashboardLayout>
  );
}
