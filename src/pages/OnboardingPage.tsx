import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { soundFx } from "../utils/audio";

const INTERESTS = [
  "Arrays & Pointers", "Trees & Graphs", "Dynamic Programming", "System Architecture",
  "Distributed Databases", "OS Kernels", "Computer Networks", "Math & Logic",
  "Bit Manipulation", "Greedy Algorithms", "Backtracking", "LLM Fine-Tuning"
];

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner", desc: "Just starting your DSA & coding journey", tag: "LEVEL 1" },
  { value: "intermediate", label: "Intermediate", desc: "Solved 50–200 LeetCode / CodeChef problems", tag: "LEVEL 2" },
  { value: "advanced", label: "Advanced", desc: "Mastered Hard DSA, targeting FAANG L5 roles", tag: "LEVEL 3" },
];

const GOALS = [
  { value: "placement", label: "Campus Placement", desc: "Land Tier-1 Tech Offers" },
  { value: "faang", label: "FAANG Technical Interview", desc: "Clear FAANG System Design" },
  { value: "competitive", label: "Competitive Programming", desc: "Climb League Division Ranks" },
  { value: "learn", label: "Full Stack Mastery", desc: "Build Enterprise Systems" },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState<string>("");
  const [skill, setSkill] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [goal, setGoal] = useState<string>("");
  const [college, setCollege] = useState("");
  const [completing, setCompleting] = useState(false);

  const steps = ["Role", "Skill Level", "Interests", "Your Goal", "College"];
  const totalSteps = steps.length;

  const toggleInterest = (i: string) => {
    soundFx.playClick();
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const canNext = () => {
    if (step === 0) return role !== "";
    if (step === 1) return skill !== "";
    if (step === 2) return interests.length > 0;
    if (step === 3) return goal !== "";
    return true;
  };

  const handleNext = () => {
    soundFx.playClick();
    if (step < totalSteps - 1) {
      setStep((s) => s + 1);
    } else {
      soundFx.playSuccess();
      setCompleting(true);
      setTimeout(() => navigate("/dashboard/student"), 1600);
    }
  };

  if (completing) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-[#E44D26] flex items-center justify-center text-white text-3xl font-display font-black shadow-2xl animate-bounce">
            CC
          </div>
          <div className="absolute inset-0 bg-[#E44D26] rounded-3xl opacity-50 blur-xl animate-pulse"></div>
        </div>

        <h1 className="font-display font-black text-4xl lg:text-6xl uppercase tracking-tight mb-3">
          GENERATING YOUR ROADMAP
        </h1>
        <p className="text-white/70 font-mono text-sm max-w-md">
          Configuring personalized DSA modules, 3D AI mentors, and inter-college leaderboard standings...
        </p>

        <div className="flex items-center gap-2 mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-[#E44D26]"
              style={{ animation: `ping 1s ease-in-out ${i * 0.2}s infinite` }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col justify-between selection:bg-[#E44D26] selection:text-white">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E44D26] flex items-center justify-center text-white font-display font-black text-xs shadow-md">
            CC
          </div>
          <span className="font-display font-black text-xl tracking-tight uppercase">CodeCampus</span>
        </div>

        <div className="text-xs font-mono font-bold text-[#E44D26] tracking-widest uppercase bg-[#E44D26]/20 border border-[#E44D26]/40 px-3.5 py-1 rounded-full">
          STEP {step + 1} OF {totalSteps} · {steps[step].toUpperCase()}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10 relative">
        <div
          className="h-full bg-[#E44D26] transition-all duration-500 shadow-[0_0_12px_#E44D26]"
          style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* 5 Stepper Tabs Bar */}
      <div className="hidden md:flex items-center justify-center gap-2 py-4 bg-black/40 border-b border-white/10">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => {
              if (i < step) {
                soundFx.playClick();
                setStep(i);
              }
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all ${
              i === step
                ? "bg-[#E44D26] text-white shadow-lg"
                : i < step
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-white/5 text-white/30 cursor-not-allowed"
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
              i < step ? "bg-white text-black font-bold" : "bg-black/40 text-white"
            }`}>
              {i < step ? "✓" : i + 1}
            </span>
            {s}
          </button>
        ))}
      </div>

      {/* Main Content Viewport */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-xl animate-fadeIn">

          {/* STEP 1: ROLE (WITH REAL IMAGES & NO EMOJIS) */}
          {step === 0 && (
            <div>
              <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] mb-2 uppercase">
                WHO ARE YOU?
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl uppercase mb-6">
                CHOOSE YOUR ROLE
              </h2>

              <div className="flex flex-col gap-4">
                {[
                  {
                    value: "student",
                    label: "Student Developer",
                    desc: "Learning DSA, competing in league battles, preparing for campus placements",
                    image: "/assets/user_photo_manthan.jpg",
                    tag: "CANDIDATE",
                  },
                  {
                    value: "mentor",
                    label: "FAANG Mentor",
                    desc: "Senior Engineer conducting 3D AI technical mock interviews & reviews",
                    image: "/assets/real_interviewer_avatar.jpg",
                    tag: "INSTRUCTOR",
                  },
                  {
                    value: "recruiter",
                    label: "Tech Recruiter",
                    desc: "Hiring manager sourcing verified top 1% programmers via ATS scanners",
                    image: "/assets/story_scene_4.jpg",
                    tag: "TALENT SCOUT",
                  },
                ].map((r) => (
                  <button
                    key={r.value}
                    onClick={() => {
                      soundFx.playClick();
                      setRole(r.value);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${
                      role === r.value
                        ? "border-[#E44D26] bg-[#E44D26]/15 shadow-2xl"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    {/* Real Image Portrait */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/20 shadow-md">
                      <img src={r.image} alt={r.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-display font-black text-xl uppercase text-white">{r.label}</div>
                        <span className="text-[9px] font-mono font-bold bg-white/10 text-white/70 px-2 py-0.5 rounded">{r.tag}</span>
                      </div>
                      <div className="text-xs font-mono text-white/70 mt-1 leading-relaxed">{r.desc}</div>
                    </div>

                    {role === r.value && (
                      <div className="w-7 h-7 rounded-full bg-[#E44D26] text-white flex items-center justify-center font-bold text-xs shadow-md">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SKILL LEVEL */}
          {step === 1 && (
            <div>
              <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] mb-2 uppercase">
                EXPERIENCE LEVEL
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl uppercase mb-6">
                SELECT YOUR LEVEL
              </h2>

              <div className="flex flex-col gap-4">
                {SKILL_LEVELS.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => {
                      soundFx.playClick();
                      setSkill(s.value);
                    }}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                      skill === s.value
                        ? "border-[#E44D26] bg-[#E44D26]/15 shadow-xl"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold bg-[#E44D26]/20 text-[#E44D26] px-2.5 py-0.5 rounded-full border border-[#E44D26]/40">
                          {s.tag}
                        </span>
                        <span className="font-display font-black text-xl uppercase text-white">{s.label}</span>
                      </div>
                      <div className="text-xs font-mono text-white/70 mt-1">{s.desc}</div>
                    </div>

                    {skill === s.value && (
                      <div className="w-7 h-7 rounded-full bg-[#E44D26] text-white flex items-center justify-center font-bold text-xs shadow-md">
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: FOCUS AREAS */}
          {step === 2 && (
            <div>
              <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] mb-2 uppercase">
                CURRICULUM TOPICS
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl uppercase mb-2">
                WHAT TO MASTER?
              </h2>
              <p className="text-white/70 text-xs font-mono mb-6">Select topics you want to prioritize in your roadmap.</p>

              <div className="flex flex-wrap gap-2.5">
                {INTERESTS.map((i) => (
                  <button
                    key={i}
                    onClick={() => toggleInterest(i)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                      interests.includes(i)
                        ? "bg-[#E44D26] text-white border-[#E44D26] shadow-lg scale-105"
                        : "bg-white/5 border-white/15 text-white/80 hover:border-white/40"
                    }`}
                  >
                    {interests.includes(i) ? `✓ ${i}` : i}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: YOUR GOAL */}
          {step === 3 && (
            <div>
              <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] mb-2 uppercase">
                TARGET MISSION
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl uppercase mb-6">
                WHAT'S THE GOAL?
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {GOALS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => {
                      soundFx.playClick();
                      setGoal(g.value);
                    }}
                    className={`flex flex-col justify-between p-5 rounded-2xl border-2 text-left min-h-[120px] transition-all ${
                      goal === g.value
                        ? "border-[#E44D26] bg-[#E44D26]/15 shadow-xl"
                        : "border-white/10 bg-white/5 hover:border-white/30"
                    }`}
                  >
                    <div className="font-display font-black text-lg uppercase text-white leading-tight">{g.label}</div>
                    <div className="text-[10px] font-mono text-white/60 mt-2">{g.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: COLLEGE */}
          {step === 4 && (
            <div>
              <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] mb-2 uppercase">
                CAMPUS AFFILIATION
              </div>
              <h2 className="font-display font-black text-4xl lg:text-5xl uppercase mb-3">
                YOUR COLLEGE
              </h2>
              <p className="text-white/70 text-xs font-mono mb-6">Connect with your campus team on national leaderboards.</p>

              <div className="mb-6">
                <label className="text-[10px] font-mono font-bold text-white/60 block mb-2 uppercase">College / University Name</label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-white/20 bg-black text-white font-mono text-xs focus:outline-none focus:border-[#E44D26] transition-colors"
                  placeholder="e.g. IIT Bombay, BITS Pilani, Stanford..."
                />
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl font-mono">
                <div className="text-[10px] font-bold text-[#E44D26] uppercase mb-2">ROADMAP PROFILE SUMMARY</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  {role && <span className="px-3 py-1 bg-white/10 text-white rounded-lg border border-white/10 uppercase">Role: {role}</span>}
                  {skill && <span className="px-3 py-1 bg-white/10 text-white rounded-lg border border-white/10 uppercase">Level: {skill}</span>}
                  {interests.slice(0, 3).map((i) => (
                    <span key={i} className="px-3 py-1 bg-[#E44D26]/20 text-[#E44D26] rounded-lg border border-[#E44D26]/30">{i}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Navigation */}
          <div className="flex items-center justify-between mt-10 pt-4 border-t border-white/10">
            <button
              onClick={() => {
                soundFx.playClick();
                step > 0 && setStep((s) => s - 1);
              }}
              disabled={step === 0}
              className="text-xs font-mono font-bold text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              ← BACK
            </button>
            <button
              onClick={handleNext}
              disabled={!canNext()}
              className="bg-[#E44D26] text-white font-mono font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xl"
            >
              {step === totalSteps - 1 ? "FINISH & START ROADMAP →" : "NEXT STEP →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
