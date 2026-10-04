import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";
import DashboardLayout from "../components/DashboardLayout";

const dailyActive = [
  { day: "Mon", users: 1842 }, { day: "Tue", users: 2140 }, { day: "Wed", users: 1980 },
  { day: "Thu", users: 2580 }, { day: "Fri", users: 2320 }, { day: "Sat", users: 1650 }, { day: "Sun", users: 1410 },
];

const submissionsOverTime = [
  { date: "Jan 1", count: 3200 }, { date: "Jan 5", count: 4100 }, { date: "Jan 10", count: 3800 },
  { date: "Jan 15", count: 5200 }, { date: "Jan 20", count: 4900 }, { date: "Jan 25", count: 6100 }, { date: "Jan 28", count: 5800 },
];

const flaggedContent = [
  { id: 1, type: "Reel", title: "Misleading DP explanation", user: "Unknown", time: "2h ago", severity: "high" },
  { id: 2, type: "Comment", title: "Spam links in forum", user: "abc123", time: "4h ago", severity: "medium" },
  { id: 3, type: "Profile", title: "Fake credentials claimed", user: "xyz789", time: "1d ago", severity: "low" },
];

const recentUsers = [
  { name: "Aryan Gupta", email: "aryan@iitb.ac.in", role: "student", joined: "Jan 28", status: "active" },
  { name: "Sunita Patel", email: "sunita@mentors.cc", role: "mentor", joined: "Jan 27", status: "active" },
  { name: "Rahul Verma", email: "rahul@techcorp.com", role: "recruiter", joined: "Jan 27", status: "pending" },
  { name: "Kavya Reddy", email: "kavya@bits.ac.in", role: "student", joined: "Jan 26", status: "active" },
  { name: "Nikhil Shah", email: "nikhil@iitm.ac.in", role: "student", joined: "Jan 26", status: "active" },
];

const roleBadge: Record<string, string> = {
  student: "bg-[#EEF3FF] text-[#1B52CC]",
  mentor: "bg-[#FFF8ED] text-[#A65C00]",
  recruiter: "bg-[#EDFBF3] text-[#1E7A4E]",
  admin: "bg-[#FFF1EE] text-[#C93D18]",
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "moderation">("overview");

  return (
    <DashboardLayout role="admin">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#E44D26] uppercase mb-1">Admin Panel</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">
              Platform<br/><span className="text-[#E44D26]">Control.</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold bg-[#EDFBF3] text-[#1E7A4E] px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#1E7A4E] rounded-full pulse-dot"></span>
              All systems operational
            </span>
          </div>
        </div>

        <div className="flex gap-1 mb-8 bg-white border border-[#DDDBD5] rounded-xl p-1 w-fit">
          {(["overview", "users", "moderation"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeTab === tab ? "bg-[#0D0D0D] text-white" : "text-[#68665F] hover:text-[#0D0D0D]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Users", value: "12,840", sub: "+342 this week", accent: true },
                { label: "Daily Active", value: "8,241", sub: "64% of total" },
                { label: "Submissions Today", value: "5,872", sub: "Accepted: 68%" },
                { label: "Active Battles", value: "142", sub: "Ongoing right now" },
              ].map((s) => (
                <div key={s.label} className={`rounded-2xl p-5 ${s.accent ? "bg-[#0D0D0D] text-white" : "bg-white border border-[#DDDBD5]"}`}>
                  <div className={`text-[10px] tracking-[0.18em] font-semibold uppercase mb-1 ${s.accent ? "text-white/50" : "text-[#A09E98]"}`}>{s.label}</div>
                  <div className={`font-display font-black text-4xl leading-none mb-1 ${s.accent ? "text-white" : "text-[#0D0D0D]"}`}>{s.value}</div>
                  <div className={`text-[11px] ${s.accent ? "text-white/60" : "text-[#68665F]"}`}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">7-Day</div>
                    <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">DAILY ACTIVE USERS</div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={dailyActive}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E44D26" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#E44D26" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#A09E98" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0D0D0D", border: "none", borderRadius: "8px", fontSize: "11px", color: "white" }} cursor={false} />
                    <Area type="monotone" dataKey="users" stroke="#E44D26" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
                <div className="mb-5">
                  <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">Trend</div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">SUBMISSIONS OVER TIME</div>
                </div>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={submissionsOverTime}>
                    <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#A09E98" }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#0D0D0D", border: "none", borderRadius: "8px", fontSize: "11px", color: "white" }} cursor={false} />
                    <Line type="monotone" dataKey="count" stroke="#0D0D0D" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform health */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { service: "Code Execution (Judge0)", status: "operational", uptime: "99.97%", latency: "124ms" },
                { service: "Real-time (Socket.io)", status: "operational", uptime: "99.92%", latency: "18ms" },
                { service: "AI Tutor API", status: "degraded", uptime: "98.4%", latency: "2.1s" },
              ].map((s) => (
                <div key={s.service} className="bg-white border border-[#DDDBD5] rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2.5 h-2.5 rounded-full pulse-dot ${s.status === "operational" ? "bg-[#1E7A4E]" : "bg-[#FEBC2E]"}`}></div>
                    <span className="text-xs font-semibold text-[#0D0D0D]">{s.service}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#A09E98]">Uptime: <span className="font-bold text-[#0D0D0D]">{s.uptime}</span></span>
                    <span className="text-[#A09E98]">P50: <span className="font-bold text-[#0D0D0D]">{s.latency}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EFE9]">
              <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">RECENT USERS</div>
              <input
                type="text"
                placeholder="Search users..."
                className="text-sm px-4 py-2 border border-[#DDDBD5] rounded-xl focus:outline-none focus:border-[#0D0D0D] transition-colors w-48"
              />
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#F0EFE9]">
                  {["NAME", "EMAIL", "ROLE", "JOINED", "STATUS", "ACTIONS"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-[10px] tracking-widets font-semibold text-[#A09E98]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F7F6F3]">
                {recentUsers.map((u, i) => (
                  <tr key={i} className="hover:bg-[#F7F6F3] transition-colors">
                    <td className="px-5 py-3 text-sm font-semibold text-[#0D0D0D]">{u.name}</td>
                    <td className="px-5 py-3 text-[11px] text-[#68665F]">{u.email}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${roleBadge[u.role]}`}>{u.role}</span>
                    </td>
                    <td className="px-5 py-3 text-[11px] text-[#A09E98]">{u.joined}</td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-[#EDFBF3] text-[#1E7A4E]" : "bg-[#FFF8ED] text-[#A65C00]"}`}>
                        {u.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button className="text-[11px] font-semibold text-[#68665F] hover:text-[#E44D26] transition-colors">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "moderation" && (
          <div className="flex flex-col gap-4">
            {flaggedContent.map((item) => (
              <div key={item.id} className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.severity === "high" ? "bg-[#FFF1EE]" : item.severity === "medium" ? "bg-[#FFF8ED]" : "bg-[#F0EFE9]"
                    }`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.severity === "high" ? "#C93D18" : item.severity === "medium" ? "#A65C00" : "#68665F"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m10.29 3.86-8.6 14.91a2 2 0 0 0 1.71 3h17.2a2 2 0 0 0 1.71-3l-8.6-14.91a2 2 0 0 0-3.43 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[#0D0D0D]">{item.title}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          item.severity === "high" ? "bg-[#FFF1EE] text-[#C93D18]" : item.severity === "medium" ? "bg-[#FFF8ED] text-[#A65C00]" : "bg-[#F0EFE9] text-[#68665F]"
                        }`}>
                          {item.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#68665F]">{item.type} · by {item.user} · {item.time}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs font-semibold bg-[#FFF1EE] text-[#C93D18] px-3 py-1.5 rounded-full hover:bg-[#E44D26] hover:text-white transition-colors">
                      Remove
                    </button>
                    <button className="text-xs font-semibold bg-[#F0EFE9] text-[#68665F] px-3 py-1.5 rounded-full hover:bg-[#DDDBD5] transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
