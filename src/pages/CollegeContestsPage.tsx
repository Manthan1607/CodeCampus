import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { colleges as defaultColleges } from "../data/mockData";
import { soundFx } from "../utils/audio";

interface ContestRegistration {
  collegeName: string;
  repName: string;
  repEmail: string;
  studentCount: number;
  track: string;
  preferredDate: string;
}

export default function CollegeContestsPage() {
  const [collegesList, setCollegesList] = useState(defaultColleges);
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [formData, setFormData] = useState<ContestRegistration>({
    collegeName: "",
    repName: "",
    repEmail: "",
    studentCount: 150,
    track: "DSA & Algorithms League",
    preferredDate: "2024-10-15",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    setSubmittedSuccess(true);

    const newCollege = {
      rank: collegesList.length + 1,
      name: formData.collegeName || "State University",
      students: formData.studentCount,
      avgRating: 1750,
      topSolver: formData.repName || "Team Captain",
      solved: 12400,
    };

    setCollegesList((prev) => [newCollege, ...prev]);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setModalOpen(false);
      setFormData({
        collegeName: "",
        repName: "",
        repEmail: "",
        studentCount: 150,
        track: "DSA & Algorithms League",
        preferredDate: "2024-10-15",
      });
    }, 2200);
  };

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header Banner with College Competition Image */}
        <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 text-white mb-10 relative overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-2">
                INTER-COLLEGE CODING LEAGUE
              </div>
              <h1 className="font-display font-black text-3xl lg:text-5xl uppercase leading-tight mb-4">
                COLLEGE CODING CONTESTS & ARENA
              </h1>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-mono">
                Register your university or student developer club to compete in national coding leagues, battle for the college leaderboard cup, and showcase your campus talent to top tech recruiters.
              </p>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setModalOpen(true);
                }}
                className="bg-[#E44D26] text-white font-mono font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-[#0D0D0D] transition-colors shadow-lg"
              >
                REGISTER YOUR COLLEGE NOW →
              </button>
            </div>

            {/* College Campus Arena Image Frame */}
            <div className="lg:col-span-5 relative h-64 rounded-2xl overflow-hidden border border-white/15 shadow-xl group">
              <img
                src="/assets/college_banner_image.jpg"
                alt="College Hackathon Coding Arena"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-[10px] font-mono font-bold text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                🏆 NATIONAL INTER-COLLEGE CHAMPIONSHIP
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming National Contests */}
        <div className="mb-10">
          <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase tracking-widest mb-1">
            SCHEDULED LEAGUES
          </div>
          <h2 className="font-display font-black text-2xl text-[#0D0D0D] uppercase mb-6">
            UPCOMING NATIONAL CONTESTS
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "National Inter-IIT Coding Clash",
                date: "Oct 12, 2024 · 18:00 IST",
                prize: "$10,000 Prize Pool",
                teams: "142 Colleges Enrolled",
                tag: "DSA & Speedrun",
              },
              {
                title: "University System Design Hackathon",
                date: "Nov 04, 2024 · 10:00 IST",
                prize: "Direct FAANG Interviews",
                teams: "98 Colleges Enrolled",
                tag: "Backend & Systems",
              },
              {
                title: "Bits & Bytes Rookie Championship",
                date: "Dec 01, 2024 · 14:00 IST",
                prize: "Prizes & Swag Boxes",
                teams: "210 Colleges Enrolled",
                tag: "Beginner Friendly",
              },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-[#DDDBD5] rounded-2xl p-6 hover:border-[#0D0D0D] transition-colors shadow-xs">
                <span className="text-[10px] font-mono font-bold bg-[#E44D26]/10 text-[#E44D26] px-2.5 py-1 rounded-full inline-block mb-3">
                  {c.tag}
                </span>
                <h3 className="font-display font-black text-xl text-[#0D0D0D] uppercase leading-tight mb-2">
                  {c.title}
                </h3>
                <div className="text-xs text-[#68665F] font-mono mb-4">{c.date}</div>
                <div className="flex items-center justify-between pt-4 border-t border-[#F0EFE9] text-xs font-semibold">
                  <span className="text-[#1E7A4E]">{c.prize}</span>
                  <span className="text-[#A09E98]">{c.teams}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* National College Leaderboard */}
        <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-hidden shadow-xs">
          <div className="px-6 py-5 border-b border-[#F0EFE9] flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono font-bold text-[#A09E98] uppercase">National Rankings</div>
              <h3 className="font-display font-black text-2xl text-[#0D0D0D] uppercase">COLLEGE LEADERBOARD CUP</h3>
            </div>
            <button
              onClick={() => {
                soundFx.playClick();
                setModalOpen(true);
              }}
              className="text-xs font-bold text-[#E44D26] hover:underline"
            >
              + Add Your College
            </button>
          </div>

          <div className="divide-y divide-[#F7F6F3]">
            {collegesList.map((col) => (
              <div key={col.rank} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F7F6F3] transition-colors">
                <span className="font-display font-black text-2xl text-[#E44D26] w-8 flex-shrink-0">
                  #{col.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-[#0D0D0D] truncate">{col.name}</div>
                  <div className="text-xs text-[#A09E98] font-mono">
                    {col.students} student coders · Top solver: <span className="text-[#0D0D0D] font-semibold">{col.topSolver}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 font-mono text-xs text-right">
                  <div>
                    <div className="text-[#0D0D0D] font-bold">{col.avgRating}</div>
                    <div className="text-[10px] text-[#A09E98]">Avg Rating</div>
                  </div>
                  <div>
                    <div className="text-[#E44D26] font-bold">{col.solved.toLocaleString()}</div>
                    <div className="text-[10px] text-[#A09E98]">Solved</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#DDDBD5] shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0EFE9]">
              <h3 className="font-display font-black text-2xl text-[#0D0D0D] uppercase">COLLEGE REGISTRATION</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#A09E98] hover:text-[#0D0D0D]">✕</button>
            </div>

            {submittedSuccess ? (
              <div className="py-10 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#EDFBF3] text-[#1E7A4E] font-bold text-xl flex items-center justify-center">
                  ✓
                </div>
                <h4 className="font-display font-black text-xl text-[#0D0D0D] uppercase">REGISTRATION SUCCESSFUL!</h4>
                <p className="text-xs text-[#68665F]">Your college has been enrolled in the national leaderboard cup.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">College / University Name</label>
                  <input
                    type="text"
                    required
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    placeholder="e.g. Stanford University / IIT Kharagpur"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">Representative Name</label>
                    <input
                      type="text"
                      required
                      value={formData.repName}
                      onChange={(e) => setFormData({ ...formData, repName: e.target.value })}
                      placeholder="Manthan Mandavkar"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">Representative Email</label>
                    <input
                      type="email"
                      required
                      value={formData.repEmail}
                      onChange={(e) => setFormData({ ...formData, repEmail: e.target.value })}
                      placeholder="manthan@college.edu"
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">Estimated Coders</label>
                    <input
                      type="number"
                      required
                      value={formData.studentCount}
                      onChange={(e) => setFormData({ ...formData, studentCount: parseInt(e.target.value, 10) || 100 })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E44D26] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#C93D18] transition-colors shadow-md mt-2"
                >
                  SUBMIT COLLEGE REGISTRATION
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
