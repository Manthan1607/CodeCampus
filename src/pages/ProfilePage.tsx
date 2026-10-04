import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { soundFx } from "../utils/audio";

const badgeList = [
  { label: "Streak Master", desc: "30-day streak", earned: true },
  { label: "Speed Coder", desc: "Battle in <5 min", earned: true },
  { label: "Top 10", desc: "Global rank top 10", earned: true },
  { label: "Problem Setter", desc: "Create a problem", earned: false },
  { label: "Course Completer", desc: "Finish a course", earned: true },
  { label: "Hall of Fame", desc: "Top 1% yearly", earned: false },
];

const projects = [
  {
    title: "DSA Visualizer",
    desc: "Interactive visualizations for sorting and graph algorithms. Supports BFS, DFS, Dijkstra, Bubble Sort, Merge Sort with step-by-step animation.",
    tags: ["React", "TypeScript", "Canvas API"],
    stars: 142,
    link: "github.com",
  },
  {
    title: "LeetCode Solutions Repository",
    desc: "500+ solutions in C++ and Python with detailed complexity analysis, multiple approaches, and test cases.",
    tags: ["C++", "Python", "Algorithms"],
    stars: 89,
    link: "github.com",
  },
  {
    title: "Mini Redis Clone",
    desc: "Key-value store in Go with persistence, pub/sub, sorted sets, and a RESP protocol implementation.",
    tags: ["Go", "Systems", "Networking"],
    stars: 64,
    link: "github.com",
  },
];

const certificates = [
  { title: "DSA Foundations", issuer: "CodeCampus", date: "Dec 2023", id: "CC-DSA-2023-09847" },
  { title: "System Design Masterclass", issuer: "CodeCampus", date: "Jan 2024", id: "CC-SD-2024-01234" },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "certificates">("overview");
  const [showCertModal, setShowCertModal] = useState<number | null>(null);

  const skills = user.skills && user.skills.length > 0 ? user.skills : ["Arrays", "Trees", "DP", "System Design", "C++", "Python"];

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <Navbar variant="app" role="student" />

      {/* Profile header */}
      <div className="pt-14 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6 py-12 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute right-12 top-6 font-display font-black text-[160px] text-white/5 leading-none">
              {user.avatar || "MM"}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-[#E44D26] flex items-center justify-center text-white font-display font-black text-3xl flex-shrink-0 shadow-lg">
              {user.avatar || "MM"}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display font-black text-4xl text-white uppercase">{user.name}</h1>
                    <span className="text-[10px] font-bold bg-[#E44D26] text-white px-2.5 py-1 rounded-full uppercase tracking-wider">
                      TOP 0.1%
                    </span>
                  </div>
                  <div className="text-white/60 text-sm mb-3 font-mono">{user.college} · Computer Science & Engineering</div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="text-[10px] font-semibold bg-white/10 text-white/80 px-2.5 py-1 rounded-full border border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="bg-[#E44D26] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-white hover:text-[#E44D26] transition-colors shadow-md">
                    VIEW CERTIFICATE
                  </button>
                  <button className="border border-white/20 text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:border-white/60 transition-colors">
                    CONTACT
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 pt-6 border-t border-white/10 relative z-10">
            {[
              { label: "Rating", value: user.rating || 1847 },
              { label: "Global Rank", value: `#${user.rank || 12}` },
              { label: "Problems Solved", value: user.solved || 189 },
              { label: "XP", value: (user.xp || 8420).toLocaleString() },
              { label: "Streak", value: `${user.streak || 47} Days` },
            ].map((s) => (
              <div key={s.label} className="text-center bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="font-display font-black text-2xl text-white">{s.value}</div>
                <div className="text-[10px] text-white/40 tracking-widest uppercase font-mono mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white border border-[#DDDBD5] rounded-xl p-1 w-fit shadow-xs">
          {(["overview", "projects", "certificates"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeTab === tab ? "bg-[#0D0D0D] text-white" : "text-[#68665F] hover:text-[#0D0D0D]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Badges */}
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-6">
                <div className="font-display font-black text-xl text-[#0D0D0D] uppercase mb-5">BADGES & ACHIEVEMENTS</div>
                <div className="grid grid-cols-3 gap-4">
                  {badgeList.map((badge) => (
                    <div
                      key={badge.label}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl text-center border transition-all ${
                        badge.earned ? "bg-[#F7F6F3] border-[#DDDBD5]" : "bg-[#F7F6F3] border-transparent opacity-40 grayscale"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#E44D26]/10 text-[#E44D26] flex items-center justify-center font-bold text-sm">
                        ✓
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0D0D0D]">{badge.label}</div>
                        <div className="text-[10px] text-[#A09E98]">{badge.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solved problems breakdown */}
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-6">
                <div className="font-display font-black text-xl text-[#0D0D0D] uppercase mb-5">PROBLEM SOLVING PROFILE</div>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { label: "Easy", count: 87, total: 120, color: "#1E7A4E", bg: "#EDFBF3" },
                    { label: "Medium", count: 76, total: 180, color: "#A65C00", bg: "#FFF8ED" },
                    { label: "Hard", count: 26, total: 80, color: "#C93D18", bg: "#FFF1EE" },
                  ].map((d) => (
                    <div key={d.label} className="text-center p-3 rounded-xl border border-transparent" style={{ backgroundColor: d.bg }}>
                      <div className="font-display font-black text-3xl" style={{ color: d.color }}>{d.count}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: d.color }}>{d.label}</div>
                      <div className="text-[10px] mt-1 font-mono" style={{ color: d.color, opacity: 0.7 }}>/ {d.total}</div>
                    </div>
                  ))}
                </div>
                <div className="h-2.5 bg-[#F0EFE9] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#1E7A4E]" style={{ width: "46%" }}></div>
                  <div className="h-full bg-[#A65C00]" style={{ width: "40%" }}></div>
                  <div className="h-full bg-[#C93D18]" style={{ width: "14%" }}></div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-6">
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
                <div className="font-display font-black text-xl text-[#0D0D0D] uppercase mb-4">RECENT ACTIVITY</div>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "✓", text: "Solved Coin Change", time: "2h ago", color: "#1E7A4E" },
                    { icon: "⚔", text: "Won battle vs Vikram", time: "5h ago", color: "#E44D26" },
                    { icon: "📚", text: "Advanced DP — Lesson 7", time: "1d ago", color: "#1B52CC" },
                    { icon: "🏅", text: "Earned 'Speed Coder' badge", time: "2d ago", color: "#A65C00" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ backgroundColor: `${item.color}18`, color: item.color }}>
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-[#0D0D0D]">{item.text}</div>
                        <div className="text-[10px] text-[#A09E98] font-mono">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PDF Resume & CV Manager */}
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5">
                <div className="font-display font-black text-lg text-[#0D0D0D] uppercase mb-3">RESUME & CV DOCUMENT (PDF)</div>
                
                <div className="bg-[#F7F6F3] border border-[#DDDBD5] rounded-xl p-3.5 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <div className="text-xs font-bold text-[#0D0D0D] font-mono">Manthan_Mandavkar_Resume.pdf</div>
                      <div className="text-[10px] text-[#1E7A4E] font-mono">420 KB · Verified ATS Score 95%</div>
                    </div>
                  </div>
                  <a
                    href="/portfolio/analyzer"
                    className="text-[10px] font-mono font-bold bg-[#0D0D0D] text-white px-3 py-1.5 rounded-lg hover:bg-[#E44D26] transition-colors"
                  >
                    SCAN ATS
                  </a>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => soundFx.playSuccess()}
                    className="flex-1 bg-[#E44D26] text-white font-mono font-bold py-2 rounded-xl text-xs uppercase tracking-wider hover:bg-[#0D0D0D] transition-colors"
                  >
                    UPLOAD NEW PDF CV
                  </button>
                  <a
                    href="/portfolio/analyzer"
                    className="px-4 py-2 border border-[#DDDBD5] rounded-xl text-xs font-mono font-bold text-[#0D0D0D] hover:bg-[#F7F6F3]"
                  >
                    DOWNLOAD PDF
                  </a>
                </div>
              </div>

              <div className="bg-[#0D0D0D] rounded-2xl p-5 text-white">
                <div className="font-display font-black text-xl uppercase mb-4">OPEN TO WORK</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Full-Time", "SWE Intern", "DSA Tutor"].map((t) => (
                    <span key={t} className="text-[10px] font-semibold bg-white/10 px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="text-white/60 text-xs mb-4 font-mono">Available for software engineering roles</div>
                <button className="w-full bg-[#E44D26] text-white font-semibold py-2.5 rounded-full text-xs hover:bg-white hover:text-[#E44D26] transition-colors font-mono">
                  CONTACT ME
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div key={project.title} className="bg-white border border-[#DDDBD5] rounded-2xl p-5 hover-lift">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-black text-lg text-[#0D0D0D] uppercase leading-tight">{project.title}</h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#A09E98] flex-shrink-0 ml-3 font-mono">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {project.stars}
                  </div>
                </div>
                <p className="text-xs text-[#68665F] leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold bg-[#F0EFE9] text-[#68665F] px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <a href="#" className="flex items-center gap-1.5 text-[11px] font-semibold text-[#E44D26] hover:underline font-mono">
                  {project.link} →
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="grid md:grid-cols-2 gap-5">
            {certificates.map((cert, i) => (
              <div key={cert.id} className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden hover-lift">
                <div className="bg-[#0D0D0D] p-8 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-2 font-mono">Certificate of Completion</div>
                    <div className="font-display font-black text-3xl text-white uppercase mb-1">{cert.title}</div>
                    <div className="text-white/50 text-xs mb-3">Issued to <span className="text-white font-bold">{user.name}</span> by {cert.issuer}</div>
                    <div className="font-mono text-[10px] text-[#E44D26]">{cert.id}</div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#0D0D0D]">{cert.title}</div>
                    <div className="text-[11px] text-[#A09E98] font-mono">{cert.issuer} · {cert.date}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCertModal(i)}
                      className="text-xs font-semibold bg-[#F0EFE9] text-[#68665F] px-3 py-1.5 rounded-full hover:bg-[#DDDBD5] transition-colors"
                    >
                      View
                    </button>
                    <button className="text-xs font-semibold bg-[#E44D26] text-white px-3 py-1.5 rounded-full hover:bg-[#C93D18] transition-colors">
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate modal */}
      {showCertModal !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full border border-[#DDDBD5] shadow-2xl">
            <div className="bg-[#0D0D0D] p-12 text-center relative">
              <div className="text-[10px] tracking-[0.3em] text-white/40 mb-4 font-mono uppercase">This is to certify that</div>
              <div className="font-display font-black text-5xl text-white uppercase mb-2">{user.name}</div>
              <div className="text-white/50 mb-6">has successfully completed</div>
              <div className="font-display font-black text-3xl text-[#E44D26] uppercase mb-4">
                {certificates[showCertModal].title}
              </div>
              <div className="text-white/40 text-xs mb-6 font-mono">
                {certificates[showCertModal].issuer} · {certificates[showCertModal].date}
              </div>
              <div className="font-mono text-[10px] text-[#E44D26]">{certificates[showCertModal].id}</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#F7F6F3]">
              <button onClick={() => setShowCertModal(null)} className="text-sm font-semibold text-[#68665F] hover:text-[#0D0D0D]">Close</button>
              <button className="bg-[#E44D26] text-white font-semibold px-5 py-2 rounded-full text-sm hover:bg-[#C93D18] transition-colors">Download PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
