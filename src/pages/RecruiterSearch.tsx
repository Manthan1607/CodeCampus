import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { students } from "../data/mockData";

type SortKey = "rating" | "xp" | "solved" | "streak";

const SKILL_FILTERS = ["Arrays", "Trees", "DP", "Graphs", "System Design", "Strings", "Heaps", "Sorting"];

export default function RecruiterSearch() {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [shortlisted, setShortlisted] = useState<Set<number>>(new Set());

  const toggleSkill = (s: string) => {
    setSelectedSkills((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  };

  const toggleShortlist = (id: number) => {
    setShortlisted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = students
    .filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.college.toLowerCase().includes(search.toLowerCase())) return false;
      if (availableOnly && !s.available) return false;
      if (minRating > 0 && s.rating < minRating) return false;
      if (selectedSkills.length > 0 && !selectedSkills.some((sk) => s.skills.includes(sk))) return false;
      return true;
    })
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <DashboardLayout role="recruiter">
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        {/* Filters sidebar */}
        <div className="w-64 flex-shrink-0 bg-white border-r border-[#DDDBD5] overflow-y-auto p-5">
          <div className="font-display font-black text-xl text-[#0D0D0D] uppercase mb-6">FILTERS</div>

          {/* Search */}
          <div className="mb-5">
            <label className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase block mb-2">Search</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09E98]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#DDDBD5] text-sm focus:outline-none focus:border-[#0D0D0D] transition-colors"
                placeholder="Name or college..."
              />
            </div>
          </div>

          {/* Availability */}
          <div className="mb-5">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5 ${availableOnly ? "bg-[#E44D26]" : "bg-[#DDDBD5]"}`}
                onClick={() => setAvailableOnly(!availableOnly)}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${availableOnly ? "translate-x-4" : "translate-x-0"}`}></div>
              </div>
              <span className="text-sm text-[#0D0D0D] font-medium">Available only</span>
            </label>
          </div>

          {/* Min Rating */}
          <div className="mb-5">
            <label className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase block mb-2">
              Min Rating: <span className="text-[#0D0D0D]">{minRating || "Any"}</span>
            </label>
            <input
              type="range"
              min={0}
              max={2500}
              step={100}
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full accent-[#E44D26]"
            />
            <div className="flex justify-between text-[9px] text-[#A09E98] mt-1">
              <span>Any</span>
              <span>2500</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-5">
            <label className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase block mb-2">Skills</label>
            <div className="flex flex-wrap gap-1.5">
              {SKILL_FILTERS.map((skill) => (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                    selectedSkills.includes(skill)
                      ? "bg-[#0D0D0D] border-[#0D0D0D] text-white"
                      : "border-[#DDDBD5] text-[#68665F] hover:border-[#0D0D0D]"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="text-[10px] tracking-widets font-semibold text-[#A09E98] uppercase block mb-2">Sort By</label>
            <div className="flex flex-col gap-1">
              {(["rating", "xp", "solved", "streak"] as SortKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`text-left text-sm px-3 py-2 rounded-lg transition-colors capitalize ${
                    sortBy === key ? "bg-[#F0EFE9] text-[#0D0D0D] font-semibold" : "text-[#68665F] hover:bg-[#F7F6F3]"
                  }`}
                >
                  {key === "xp" ? "XP" : key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {(selectedSkills.length > 0 || availableOnly || minRating > 0 || search) && (
            <button
              onClick={() => { setSelectedSkills([]); setAvailableOnly(false); setMinRating(0); setSearch(""); }}
              className="w-full mt-4 text-xs font-semibold text-[#E44D26] border border-[#E44D26]/30 py-2 rounded-full hover:bg-[#FFF1EE] transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-[#DDDBD5] px-5 py-3 flex items-center justify-between z-10">
            <div className="text-sm font-semibold text-[#0D0D0D]">
              {filtered.length} candidate{filtered.length !== 1 ? "s" : ""} found
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#A09E98]">Shortlisted: {shortlisted.size}</span>
            </div>
          </div>

          <div className="divide-y divide-[#F7F6F3]">
            {filtered.map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-[#F7F6F3] cursor-pointer transition-colors ${selectedStudent?.id === s.id ? "bg-[#F7F6F3]" : ""}`}
                onClick={() => setSelectedStudent(selectedStudent?.id === s.id ? null : s)}
              >
                <div className="w-10 h-10 rounded-full bg-[#0D0D0D] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-[#0D0D0D]">{s.name}</span>
                    {s.available && (
                      <span className="text-[10px] font-semibold bg-[#EDFBF3] text-[#1E7A4E] px-2 py-0.5 rounded-full">OPEN</span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#68665F]">{s.college}</div>
                  <div className="flex gap-1.5 mt-1.5 flex-wrap">
                    {s.skills.map((sk) => (
                      <span key={sk} className="text-[9px] font-semibold bg-[#F0EFE9] text-[#68665F] px-2 py-0.5 rounded-full">{sk}</span>
                    ))}
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-5 text-[11px] flex-shrink-0">
                  <div className="text-center">
                    <div className="font-bold text-[#0D0D0D]">{s.rating}</div>
                    <div className="text-[#A09E98]">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#0D0D0D]">{s.solved}</div>
                    <div className="text-[#A09E98]">Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-[#0D0D0D]">{s.streak}🔥</div>
                    <div className="text-[#A09E98]">Streak</div>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleShortlist(s.id); }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                    shortlisted.has(s.id) ? "bg-[#E44D26] text-white" : "bg-[#F0EFE9] text-[#A09E98] hover:bg-[#DDDBD5]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={shortlisted.has(s.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <div className="font-display font-black text-2xl text-[#0D0D0D] uppercase mb-2">No Results</div>
                <p className="text-[#68665F] text-sm">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        {selectedStudent && (
          <div className="w-80 flex-shrink-0 bg-white border-l border-[#DDDBD5] overflow-y-auto">
            <div className="p-5 border-b border-[#F0EFE9]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0D0D0D] text-white flex items-center justify-center font-bold text-lg">
                  {selectedStudent.avatar}
                </div>
                <div>
                  <div className="font-display font-black text-xl text-[#0D0D0D] uppercase">{selectedStudent.name}</div>
                  <div className="text-[11px] text-[#68665F]">{selectedStudent.college}</div>
                </div>
              </div>

              {selectedStudent.available && (
                <div className="bg-[#EDFBF3] text-[#1E7A4E] text-[11px] font-semibold px-3 py-2 rounded-xl mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#1E7A4E] rounded-full pulse-dot"></span>
                  Open to opportunities
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Rating", value: selectedStudent.rating },
                  { label: "Global Rank", value: `#${selectedStudent.rank}` },
                  { label: "Problems Solved", value: selectedStudent.solved },
                  { label: "Streak", value: `${selectedStudent.streak}🔥` },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#F7F6F3] rounded-xl p-3 text-center">
                    <div className="font-display font-black text-xl text-[#0D0D0D]">{stat.value}</div>
                    <div className="text-[9px] text-[#A09E98] uppercase tracking-widets">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {selectedStudent.skills.map((sk) => (
                  <span key={sk} className="text-[10px] font-semibold bg-[#F0EFE9] text-[#68665F] px-2.5 py-1 rounded-full">{sk}</span>
                ))}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3">
              <Link
                to="/profile/1"
                className="w-full flex items-center justify-center gap-2 bg-[#0D0D0D] text-white font-semibold py-3 rounded-full text-xs hover:bg-[#E44D26] transition-colors"
              >
                VIEW FULL PROFILE
              </Link>
              <button
                onClick={() => toggleShortlist(selectedStudent.id)}
                className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-full text-xs transition-colors border ${
                  shortlisted.has(selectedStudent.id)
                    ? "bg-[#E44D26] text-white border-[#E44D26]"
                    : "border-[#DDDBD5] text-[#68665F] hover:border-[#0D0D0D]"
                }`}
              >
                {shortlisted.has(selectedStudent.id) ? "✓ SHORTLISTED" : "+ SHORTLIST"}
              </button>
              <button className="w-full border border-[#DDDBD5] text-[#68665F] font-semibold py-3 rounded-full text-xs hover:border-[#0D0D0D] hover:text-[#0D0D0D] transition-colors">
                SEND MESSAGE
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
