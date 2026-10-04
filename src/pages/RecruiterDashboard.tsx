import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { students, colleges } from "../data/mockData";

const shortlists = [
  { ...students[3], status: "contacted", note: "Sent InMail 2d ago" },
  { ...students[0], status: "reviewing", note: "Phone screen scheduled" },
  { ...students[2], status: "shortlisted", note: "Added to shortlist" },
];

const statusColors: Record<string, string> = {
  contacted: "bg-[#EEF3FF] text-[#1B52CC]",
  reviewing: "bg-[#FFF8ED] text-[#A65C00]",
  shortlisted: "bg-[#EDFBF3] text-[#1E7A4E]",
};

export default function RecruiterDashboard() {
  return (
    <DashboardLayout role="recruiter">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#E44D26] uppercase mb-1">Recruiter Dashboard</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">
              Good morning,<br/><span className="text-[#E44D26]">Kavita.</span>
            </h1>
          </div>
          <Link to="/recruiter/search" className="bg-[#E44D26] text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-[#C93D18] transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            SEARCH TALENT
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Profiles Viewed", value: "148", sub: "This month", accent: true },
            { label: "Shortlisted", value: "23", sub: "Active candidates" },
            { label: "Contacted", value: "11", sub: "Awaiting reply: 4" },
            { label: "Hired", value: "6", sub: "Through CodeCampus" },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl p-5 ${s.accent ? "bg-[#0D0D0D] text-white" : "bg-white border border-[#DDDBD5]"}`}>
              <div className={`text-[10px] tracking-[0.18em] font-semibold uppercase mb-1 ${s.accent ? "text-white/50" : "text-[#A09E98]"}`}>{s.label}</div>
              <div className={`font-display font-black text-4xl leading-none mb-1 ${s.accent ? "text-white" : "text-[#0D0D0D]"}`}>{s.value}</div>
              <div className={`text-[11px] ${s.accent ? "text-white/60" : "text-[#68665F]"}`}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Shortlisted candidates */}
          <div className="lg:col-span-2 bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EFE9]">
              <div>
                <div className="text-[10px] tracking-widest font-semibold text-[#A09E98] uppercase mb-1">Pipeline</div>
                <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">SHORTLISTED CANDIDATES</div>
              </div>
              <Link to="/recruiter/search" className="text-[11px] font-semibold text-[#E44D26] hover:underline">View all →</Link>
            </div>
            <div className="divide-y divide-[#F7F6F3]">
              {shortlists.map((s) => (
                <div key={s.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#F7F6F3] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {s.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold text-[#0D0D0D]">{s.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusColors[s.status]}`}>
                        {s.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#68665F]">{s.college} · Rating {s.rating} · {s.skills.join(", ")}</div>
                    <div className="text-[10px] text-[#A09E98] mt-0.5">{s.note}</div>
                  </div>
                  <button className="flex-shrink-0 text-[11px] font-semibold text-[#0D0D0D] border border-[#DDDBD5] px-3 py-1.5 rounded-full hover:bg-[#F0EFE9] transition-colors">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* College rankings */}
          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F0EFE9]">
              <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">Rankings</div>
              <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">TOP COLLEGES</div>
            </div>
            <div className="divide-y divide-[#F7F6F3]">
              {colleges.map((c) => (
                <div key={c.rank} className="flex items-center gap-3 px-5 py-3">
                  <span className="font-display font-black text-2xl text-[#DDDBD5] w-7 flex-shrink-0">{c.rank}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#0D0D0D] truncate">{c.name}</div>
                    <div className="text-[10px] text-[#A09E98]">{c.students} students</div>
                  </div>
                  <div className="text-[11px] font-bold text-[#0D0D0D]">{c.avgRating}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top talent */}
        <div className="mt-6 bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0EFE9]">
            <div>
              <div className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase mb-1">Discover</div>
              <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">TOP AVAILABLE TALENT</div>
            </div>
            <Link to="/recruiter/search" className="text-[11px] font-semibold text-[#E44D26] hover:underline">Full search →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#F7F6F3]">
            {students.filter((s) => s.available).map((s) => (
              <Link key={s.id} to="/profile/1" className="flex flex-col gap-3 p-5 hover:bg-[#F7F6F3] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center font-bold text-sm">
                    {s.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0D0D0D]">{s.name}</div>
                    <div className="text-[11px] text-[#A09E98]">{s.college}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-semibold bg-[#EDFBF3] text-[#1E7A4E] px-2 py-0.5 rounded-full">OPEN</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {s.skills.map((sk) => (
                    <span key={sk} className="text-[10px] bg-[#F0EFE9] text-[#68665F] px-2 py-0.5 rounded-full">{sk}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#A09E98]">Rating <span className="font-bold text-[#0D0D0D]">{s.rating}</span></span>
                  <span className="text-[#A09E98]">Solved <span className="font-bold text-[#0D0D0D]">{s.solved}</span></span>
                  <span className="text-[#A09E98]">🔥 {s.streak}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
