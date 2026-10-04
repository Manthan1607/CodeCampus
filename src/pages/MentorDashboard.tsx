import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { students, notifications } from "../data/mockData";

const sessions = [
  { id: 1, student: "Priya Sharma", avatar: "PS", topic: "DP – Knapsack & Coin Change", date: "Today", time: "4:00 PM", status: "upcoming" },
  { id: 2, student: "Rohan Mehta", avatar: "RM", topic: "Graph BFS/DFS Review", date: "Tomorrow", time: "11:00 AM", status: "upcoming" },
  { id: 3, student: "Shreya Nair", avatar: "SN", topic: "Trees – LCA and Traversal", date: "Jan 28", time: "2:30 PM", status: "completed" },
  { id: 4, student: "Arjun Kumar", avatar: "AK", topic: "Sorting Algorithms Deep Dive", date: "Jan 26", time: "5:00 PM", status: "completed" },
];

const reviewQueue = [
  { id: 1, student: "Priya Sharma", problem: "N-Queens", lang: "C++", submitted: "2h ago", difficulty: "Hard" },
  { id: 2, student: "Rohan Mehta", problem: "Merge K Sorted Lists", lang: "Python", submitted: "4h ago", difficulty: "Hard" },
  { id: 3, student: "Vikram Singh", problem: "Word Ladder", lang: "JavaScript", submitted: "6h ago", difficulty: "Hard" },
];

export default function MentorDashboard() {
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  return (
    <DashboardLayout role="mentor">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#E44D26] uppercase mb-1">Mentor Dashboard</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">
              Hello,<br/><span className="text-[#E44D26]">Dr. Anita.</span>
            </h1>
          </div>
          <button className="bg-[#E44D26] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-[#C93D18] transition-colors">
            + SCHEDULE SESSION
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Mentees", value: "12", sub: "3 new this month" },
            { label: "Sessions Completed", value: "142", sub: "All time", accent: true },
            { label: "Avg. Rating", value: "4.9", sub: "From 84 reviews" },
            { label: "Pending Reviews", value: "3", sub: "Code submissions" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-5 ${s.accent ? "bg-[#0D0D0D] text-white" : "bg-white border border-[#DDDBD5]"}`}>
              <div className={`text-[10px] tracking-[0.18em] font-semibold uppercase mb-1 ${s.accent ? "text-white/50" : "text-[#A09E98]"}`}>{s.label}</div>
              <div className={`font-display font-black text-4xl leading-none mb-1 ${s.accent ? "text-white" : "text-[#0D0D0D]"}`}>{s.value}</div>
              <div className={`text-[11px] ${s.accent ? "text-white/60" : "text-[#68665F]"}`}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Mentees list */}
          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F0EFE9]">
              <div className="text-[10px] tracking-widest font-semibold text-[#A09E98] uppercase mb-1">Your Students</div>
              <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">MENTEES</div>
            </div>
            <div className="divide-y divide-[#F7F6F3]">
              {students.slice(0, 5).map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStudent(selectedStudent === s.id ? null : s.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-[#F7F6F3] transition-colors text-left ${selectedStudent === s.id ? "bg-[#F7F6F3]" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0D0D0D] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {s.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#0D0D0D] truncate">{s.name}</div>
                    <div className="text-[11px] text-[#A09E98]">{s.college} · Rating {s.rating}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.streak > 30 ? "bg-[#E44D26]" : "bg-[#DDDBD5]"}`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming sessions */}
          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F0EFE9]">
              <div className="text-[10px] tracking-widest font-semibold text-[#A09E98] uppercase mb-1">Schedule</div>
              <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">SESSIONS</div>
            </div>
            <div className="divide-y divide-[#F7F6F3]">
              {sessions.map((s) => (
                <div key={s.id} className="px-5 py-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center text-xs font-bold">
                        {s.avatar}
                      </div>
                      <span className="text-sm font-semibold text-[#0D0D0D]">{s.student}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      s.status === "upcoming" ? "bg-[#EEF3FF] text-[#1B52CC]" : "bg-[#F0EFE9] text-[#A09E98]"
                    }`}>
                      {s.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#68665F] mb-1">{s.topic}</p>
                  <div className="flex items-center gap-2 text-[10px] text-[#A09E98]">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {s.date} at {s.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Review queue */}
          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F0EFE9]">
              <div className="text-[10px] tracking-widest font-semibold text-[#A09E98] uppercase mb-1">Pending</div>
              <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">REVIEW QUEUE</div>
            </div>
            <div className="divide-y divide-[#F7F6F3]">
              {reviewQueue.map((r) => (
                <div key={r.id} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[#0D0D0D]">{r.problem}</span>
                    <span className="text-[10px] font-semibold text-[#C93D18] bg-[#FFF1EE] px-2 py-0.5 rounded-full">{r.difficulty}</span>
                  </div>
                  <div className="text-[11px] text-[#68665F] mb-2">by {r.student} · {r.lang}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#A09E98]">Submitted {r.submitted}</span>
                    <button className="text-[11px] font-semibold text-[#E44D26] hover:underline">Review →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent messages */}
        <div className="mt-6 bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#F0EFE9]">
            <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">RECENT MESSAGES</div>
          </div>
          <div className="divide-y divide-[#F7F6F3]">
            {[
              { name: "Priya Sharma", avatar: "PS", msg: "Sir, I'm stuck on the Knapsack variant with two constraints. Can we cover this in our session today?", time: "30m ago" },
              { name: "Rohan Mehta", avatar: "RM", msg: "Thank you for the session! I finally understood the cycle detection in directed graphs.", time: "2h ago" },
              { name: "Vikram Singh", avatar: "VS", msg: "My solution passes 8/10 test cases. I think there's an edge case with empty arrays I'm missing.", time: "5h ago" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F7F6F3] transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {m.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#0D0D0D] mb-0.5">{m.name}</div>
                  <p className="text-[11px] text-[#68665F] truncate">{m.msg}</p>
                </div>
                <div className="text-[10px] text-[#A09E98] flex-shrink-0">{m.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
