import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import DashboardLayout from "../components/DashboardLayout";
import { notifications, xpData, submissionHistory } from "../data/mockData";

const weeklyProgress = [
  { day: "Mon", solved: 3, xp: 180 },
  { day: "Tue", solved: 5, xp: 320 },
  { day: "Wed", solved: 2, xp: 140 },
  { day: "Thu", solved: 7, xp: 480 },
  { day: "Fri", solved: 4, xp: 260 },
  { day: "Sat", solved: 6, xp: 390 },
  { day: "Sun", solved: 8, xp: 540 },
];

const topicMastery = [
  { topic: "Arrays", mastery: 76 },
  { topic: "Strings", mastery: 70 },
  { topic: "Trees", mastery: 51 },
  { topic: "Binary Search", mastery: 63 },
  { topic: "Two Pointers", mastery: 82 },
  { topic: "Sorting", mastery: 89 },
  { topic: "Graphs", mastery: 23 },
  { topic: "DP", mastery: 24 },
];

const typeIcons: Record<string, { icon: string; color: string; bg: string }> = {
  submission: { icon: "✓", color: "#1E7A4E", bg: "#EDFBF3" },
  battle: { icon: "⚔", color: "#E44D26", bg: "#FFF1EE" },
  mentor: { icon: "👤", color: "#1B52CC", bg: "#EEF3FF" },
  badge: { icon: "🏅", color: "#A65C00", bg: "#FFF8ED" },
  course: { icon: "📚", color: "#68665F", bg: "#F0EFE9" },
  system: { icon: "📊", color: "#68665F", bg: "#F0EFE9" },
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"notifications" | "analytics">("notifications");
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifs, setNotifs] = useState(notifications);

  const displayed = filter === "unread" ? notifs.filter((n) => !n.read) : notifs;
  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#E44D26] uppercase mb-1">Activity</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">
              {activeTab === "notifications" ? "NOTIFICATIONS" : "ANALYTICS"}
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white border border-[#DDDBD5] rounded-xl p-1 w-fit">
          {(["notifications", "analytics"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widets transition-colors flex items-center gap-2 ${
                activeTab === tab ? "bg-[#0D0D0D] text-white" : "text-[#68665F] hover:text-[#0D0D0D]"
              }`}
            >
              {tab}
              {tab === "notifications" && unreadCount > 0 && (
                <span className="bg-[#E44D26] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "notifications" && (
          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EFE9]">
              <div className="flex gap-1 bg-[#F0EFE9] rounded-full p-1">
                {(["all", "unread"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                      filter === f ? "bg-white text-[#0D0D0D] shadow-sm" : "text-[#68665F]"
                    }`}
                  >
                    {f === "all" ? "All" : `Unread (${unreadCount})`}
                  </button>
                ))}
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs font-semibold text-[#E44D26] hover:underline">
                  Mark all read
                </button>
              )}
            </div>

            <div className="divide-y divide-[#F7F6F3]">
              {displayed.map((n) => {
                const config = typeIcons[n.type];
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-[#F7F6F3] transition-colors ${!n.read ? "bg-[#FFFDF9]" : ""}`}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ background: config.bg, color: config.color }}
                    >
                      {config.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#0D0D0D] leading-relaxed">{n.message}</p>
                      <span className="text-[11px] text-[#A09E98]">{n.time}</span>
                    </div>
                    {!n.read && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#E44D26] flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                );
              })}
              {displayed.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-4xl mb-3">🎉</div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">All caught up!</div>
                  <p className="text-sm text-[#68665F] mt-1">No unread notifications.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="flex flex-col gap-6">
            {/* Summary stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "This Week", value: "35", sub: "Problems solved", accent: true },
                { label: "Acceptance Rate", value: "72%", sub: "This month" },
                { label: "Avg Daily Solve", value: "5.1", sub: "Problems/day" },
                { label: "Current Streak", value: "47🔥", sub: "Days" },
              ].map((s) => (
                <div key={s.label} className={`rounded-2xl p-5 ${s.accent ? "bg-[#0D0D0D] text-white" : "bg-white border border-[#DDDBD5]"}`}>
                  <div className={`text-[10px] tracking-[0.18em] font-semibold uppercase mb-1 ${s.accent ? "text-white/50" : "text-[#A09E98]"}`}>{s.label}</div>
                  <div className={`font-display font-black text-3xl leading-none mb-1 ${s.accent ? "text-white" : "text-[#0D0D0D]"}`}>{s.value}</div>
                  <div className={`text-[11px] ${s.accent ? "text-white/60" : "text-[#68665F]"}`}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Weekly solve chart */}
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
                <div className="mb-5">
                  <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">This Week</div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">DAILY PROBLEMS SOLVED</div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={weeklyProgress}>
                    <defs>
                      <linearGradient id="solveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E44D26" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#E44D26" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#A09E98" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0D0D0D", border: "none", borderRadius: "8px", fontSize: "11px", color: "white" }} cursor={false} />
                    <Area type="monotone" dataKey="solved" stroke="#E44D26" strokeWidth={2} fill="url(#solveGrad)" dot={{ fill: "#E44D26", strokeWidth: 0, r: 3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Topic mastery */}
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
                <div className="mb-5">
                  <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">Mastery</div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">TOPIC BREAKDOWN</div>
                </div>
                <div className="flex flex-col gap-2.5">
                  {topicMastery.slice(0, 6).map((t) => (
                    <div key={t.topic} className="flex items-center gap-3">
                      <span className="text-[11px] text-[#68665F] w-24 flex-shrink-0">{t.topic}</span>
                      <div className="flex-1 h-2 bg-[#F0EFE9] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${t.mastery}%`,
                            backgroundColor: t.mastery >= 70 ? "#1E7A4E" : t.mastery >= 40 ? "#E44D26" : "#A09E98"
                          }}
                        ></div>
                      </div>
                      <span className="text-[11px] font-bold text-[#0D0D0D] w-8 text-right flex-shrink-0">{t.mastery}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* XP over time */}
            <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">8 Weeks</div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">XP EARNED OVER TIME</div>
                </div>
                <span className="text-[11px] bg-[#EDFBF3] text-[#1E7A4E] font-semibold px-2.5 py-1 rounded-full">↑ 22% vs last period</span>
              </div>
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={xpData}>
                  <defs>
                    <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0D0D0D" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0D0D0D" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#A09E98" }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ background: "#0D0D0D", border: "none", borderRadius: "8px", fontSize: "11px", color: "white" }} cursor={false} />
                  <Area type="monotone" dataKey="xp" stroke="#0D0D0D" strokeWidth={2} fill="url(#xpGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
