import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import VideoPlayer, { VideoChapter } from "../components/VideoPlayer";
import { soundFx } from "../utils/audio";

interface VideoModule {
  id: string;
  title: string;
  instructor: string;
  avatar: string;
  posterImage: string;
  tagline: string;
  narrationText: string;
  timeComplexity: string;
  spaceComplexity: string;
  codeSnippet: string;
  chapters: VideoChapter[];
}

const modules: VideoModule[] = [
  {
    id: "two-pointers",
    title: "Two Pointers Technique",
    instructor: "Prof. Turing",
    avatar: "PT",
    posterImage: "/assets/video_poster_two_pointers.jpg",
    tagline: "Traverse sorted arrays from left & right ends in linear O(N) time",
    narrationText: "In this video lesson, we explore how Two Pointers eliminates nested loops. We start left pointer at 0 and right pointer at N-1.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    codeSnippet: `class Solution {
public:
    vector<int> twoSumSorted(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return {left, right};
            if (sum < target) left++;
            else right--;
        }
        return {};
    }
};`,
    chapters: [
      { time: "0:00", seconds: 0, title: "1. Problem Breakdown" },
      { time: "1:15", seconds: 75, title: "2. Two Pointer Visualization" },
      { time: "2:40", seconds: 160, title: "3. C++ Code Walkthrough" },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search Halving Portal",
    instructor: "Dr. Ada Lovelace",
    avatar: "AL",
    posterImage: "/assets/video_poster_binary_search.jpg",
    tagline: "Logarithmic halving of sorted search spaces in O(log N) time",
    narrationText: "Binary search cuts the search space in half at every step. Comparing target against mid eliminates 50% of candidates instantly.",
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    codeSnippet: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};`,
    chapters: [
      { time: "0:00", seconds: 0, title: "1. Search Space Halving" },
      { time: "1:20", seconds: 80, title: "2. Midpoint Calculation" },
      { time: "3:00", seconds: 180, title: "3. Boundary Edge Cases" },
    ],
  },
  {
    id: "lru-cache",
    title: "LRU Cache Design Masterclass",
    instructor: "Prof. Turing",
    avatar: "PT",
    posterImage: "/assets/video_poster_lru_cache.jpg",
    tagline: "O(1) Hash Map + Doubly-Linked List Cache Eviction Policy",
    narrationText: "Learn how high-performance databases implement LRU Cache eviction using hash map lookups combined with doubly-linked list node removal.",
    timeComplexity: "O(1)",
    spaceComplexity: "O(K)",
    codeSnippet: `class LRUCache {
    unordered_map<int, list<pair<int,int>>::iterator> map;
    list<pair<int,int>> cache;
    int cap;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!map.count(key)) return -1;
        cache.splice(cache.begin(), cache, map[key]);
        return map[key]->second;
    }
};`,
    chapters: [
      { time: "0:00", seconds: 0, title: "1. Cache Eviction Concept" },
      { time: "1:45", seconds: 105, title: "2. Doubly-Linked List Operations" },
      { time: "3:15", seconds: 195, title: "3. O(1) Time Complexity Proof" },
    ],
  },
];

export default function LearnAnimatedPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeMod = modules[activeIdx];

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Video Learning Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">
              VIDEO LESSON SUITE
            </div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">
              INTERACTIVE VIDEO COURSES
            </h1>
          </div>

          <Link
            to="/ide/1"
            onClick={() => soundFx.playSuccess()}
            className="bg-[#E44D26] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-[#0D0D0D] transition-colors shadow-md font-mono"
          >
            PRACTICE IN MONACO IDE →
          </Link>
        </div>

        {/* Course Module Tabs */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {modules.map((m, idx) => (
            <div
              key={m.id}
              onClick={() => {
                soundFx.playClick();
                setActiveIdx(idx);
              }}
              className={`cursor-pointer rounded-2xl p-4 border transition-all duration-200 ${
                activeIdx === idx
                  ? "bg-[#0D0D0D] text-white border-[#0D0D0D] shadow-lg"
                  : "bg-white text-[#0D0D0D] border-[#DDDBD5] hover:border-[#0D0D0D]"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-mono font-bold ${activeIdx === idx ? "text-[#E44D26]" : "text-[#A09E98]"}`}>
                  MODULE {idx + 1}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#28C840]">{m.timeComplexity}</span>
              </div>
              <h3 className="font-display font-black text-base uppercase leading-tight mb-1">{m.title}</h3>
              <p className={`text-xs truncate ${activeIdx === idx ? "text-white/70" : "text-[#68665F]"}`}>
                {m.instructor}
              </p>
            </div>
          ))}
        </div>

        {/* Video Player + Code Editor Split */}
        <div className="grid lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Interactive Video Player with 3D AI Teacher Stream */}
          <div className="lg:col-span-7">
            <VideoPlayer
              key={activeMod.id}
              title={activeMod.title}
              instructor={activeMod.instructor}
              avatar={activeMod.avatar}
              posterImage={activeMod.posterImage}
              chapters={activeMod.chapters}
              narrationText={activeMod.narrationText}
            />
          </div>

          {/* Right Column: Code Editor & Execution Panel */}
          <div className="lg:col-span-5 bg-[#0D0D0D] border border-white/10 rounded-3xl p-5 text-white shadow-2xl flex flex-col h-[480px]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <span className="text-xs font-mono font-bold text-[#E44D26]">LESSON CODE WORKSPACE</span>
              <span className="text-[10px] font-mono text-[#28C840]">{activeMod.timeComplexity} Time · {activeMod.spaceComplexity} Space</span>
            </div>

            <textarea
              readOnly
              value={activeMod.codeSnippet}
              className="flex-1 w-full bg-black text-[#82AAFF] font-mono text-xs p-4 rounded-xl border border-white/10 focus:outline-none resize-none leading-relaxed"
            />

            <div className="flex justify-end pt-3">
              <Link
                to="/ide/1"
                onClick={() => soundFx.playSuccess()}
                className="bg-[#E44D26] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-md font-mono"
              >
                OPEN IN IDE →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
