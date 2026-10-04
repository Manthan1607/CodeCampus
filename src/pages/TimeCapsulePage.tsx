import React, { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";
import { useAuth } from "../context/AuthContext";

interface TimeCapsule {
  id: string;
  creator: string;
  title: string;
  predictionText: string;
  codeSnippet: string;
  unlockYear: number;
  createdDate: string;
  isSealed: boolean;
}

interface PredictionReport {
  horizonYear: number;
  techParadigms: string[];
  aiAgentEvolution: string;
  languagesForecast: string;
  readinessScore: number;
}

export default function TimeCapsulePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"vault" | "predictor" | "certificate">("vault");
  const [capsuleTitle, setCapsuleTitle] = useState("My 2030 Senior Architect Goal");
  const [predictionInput, setPredictionInput] = useState(
    "In 2030, AI agents will write 80% of boilerplate code while human engineers focus on high-level system architecture, distributed consensus, and quantum algorithm optimization."
  );
  const [codeSnippetInput, setCodeSnippetInput] = useState(
    "// Code Sealed in 2024\nfunction futureVision2030() {\n  return 'Autonomous AI Coding Engine';\n}"
  );
  const [unlockYear, setUnlockYear] = useState(2030);
  const [capsulesList, setCapsulesList] = useState<TimeCapsule[]>([
    {
      id: "1",
      creator: user.name,
      title: "My 2030 Senior Architect Goal",
      predictionText: "In 2030, AI agents will write 80% of boilerplate code while human engineers focus on high-level system architecture.",
      codeSnippet: "function futureVision2030() { return 'Autonomous AI Engine'; }",
      unlockYear: 2030,
      createdDate: "Aug 31, 2024",
      isSealed: true,
    },
  ]);

  const [generatingPrediction, setGeneratingPrediction] = useState(false);
  const [predictionReport, setPredictionReport] = useState<PredictionReport | null>(null);

  const handleSealCapsule = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();

    const newCapsule: TimeCapsule = {
      id: Date.now().toString(),
      creator: user.name,
      title: capsuleTitle,
      predictionText: predictionInput,
      codeSnippet: codeSnippetInput,
      unlockYear: unlockYear,
      createdDate: "Today",
      isSealed: true,
    };

    setCapsulesList([newCapsule, ...capsulesList]);
    setCapsuleTitle("");
    setPredictionInput("");
    setCodeSnippetInput("");
  };

  const handleRunPredictor = () => {
    soundFx.playClick();
    setGeneratingPrediction(true);
    setPredictionReport(null);

    setTimeout(() => {
      soundFx.playSuccess();
      setGeneratingPrediction(false);
      setPredictionReport({
        horizonYear: 2030,
        techParadigms: [
          "Autonomous Multi-Agent Swarms for Full-Stack Systems",
          "WebAssembly (Wasm) replacing legacy native binaries in browser",
          "Quantum-Resistant Cryptography & Post-Quantum TLS",
          "Natural Language to AST Compilers",
        ],
        aiAgentEvolution: "AI Pair Programmers will act as autonomous junior engineers capable of executing pull requests, resolving edge-case bugs, and benchmarking load testing.",
        languagesForecast: "Python & TypeScript will dominate orchestration layers, while Rust & C++ remain the foundation for high-performance AI kernel acceleration.",
        readinessScore: 96,
      });
    }, 2500);
  };

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">GLOBAL DEVELOPER TIME VAULT</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">TIME-CAPSULE & 2030 AI PREDICTOR</h1>
          </div>

          <div className="flex gap-1 bg-white border border-[#DDDBD5] rounded-full p-1 shadow-xs">
            {(["vault", "predictor", "certificate"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest font-mono transition-all ${
                  activeTab === tab ? "bg-[#0D0D0D] text-white shadow-md" : "text-[#68665F] hover:text-[#0D0D0D]"
                }`}
              >
                {tab === "vault" ? "⏳ Time Vault" : tab === "predictor" ? "🔮 2030 AI Predictor" : "📜 Certificate"}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: TIME VAULT */}
        {activeTab === "vault" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form to Seal Capsule */}
            <div className="lg:col-span-6 bg-white border border-[#DDDBD5] rounded-3xl p-6 shadow-xs">
              <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase mb-1">ENCRYPT & SEAL CAPSULE</div>
              <h2 className="font-display font-black text-2xl text-[#0D0D0D] uppercase mb-4">SEAL YOUR 2030 VISION</h2>

              <form onSubmit={handleSealCapsule} className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">Capsule Title / Goal</label>
                  <input
                    type="text"
                    required
                    value={capsuleTitle}
                    onChange={(e) => setCapsuleTitle(e.target.value)}
                    placeholder="e.g. My 2030 Principal Architect Vision"
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">Future Tech Prediction</label>
                  <textarea
                    required
                    value={predictionInput}
                    onChange={(e) => setPredictionInput(e.target.value)}
                    placeholder="What do you predict software engineering will look like in 2030?"
                    className="w-full h-24 p-3 rounded-xl border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D] resize-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase block mb-1">Code Snippet to Seal</label>
                  <textarea
                    required
                    value={codeSnippetInput}
                    onChange={(e) => setCodeSnippetInput(e.target.value)}
                    placeholder="// Your current code snippet..."
                    className="w-full h-24 p-3 rounded-xl border border-[#DDDBD5] text-xs font-mono focus:outline-none focus:border-[#0D0D0D] resize-none bg-[#F7F6F3]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-semibold text-[#68665F] uppercase">Unlock Target Year</label>
                  <select
                    value={unlockYear}
                    onChange={(e) => setUnlockYear(parseInt(e.target.value, 10))}
                    className="bg-[#F7F6F3] border border-[#DDDBD5] text-xs font-mono font-bold px-3 py-1.5 rounded-lg"
                  >
                    <option value={2028}>2028 (4 Years)</option>
                    <option value={2030}>2030 (6 Years)</option>
                    <option value={2035}>2035 (11 Years)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#E44D26] text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest hover:bg-[#0D0D0D] transition-colors shadow-md mt-2"
                >
                  🔒 SEAL TIME-CAPSULE IN DIGITAL VAULT
                </button>
              </form>
            </div>

            {/* Sealed Capsules List */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="text-[10px] font-mono font-bold text-[#0D0D0D] uppercase">YOUR SEALED TIME CAPSULES ({capsulesList.length})</div>
              {capsulesList.map((c) => (
                <div key={c.id} className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#E44D26] uppercase">SEALED ON {c.createdDate}</span>
                    <span className="text-xs font-mono font-bold bg-[#E44D26]/20 text-[#E44D26] px-3 py-1 rounded-full">
                      🔒 UNLOCKS IN {c.unlockYear}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl uppercase mb-2">{c.title}</h3>
                  <p className="text-xs text-white/80 font-serif italic mb-4">"{c.predictionText}"</p>

                  <div className="bg-black p-3 rounded-xl border border-white/10 font-mono text-[10px] text-[#82AAFF] overflow-x-auto">
                    <pre>{c.codeSnippet}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: 2030 AI PREDICTOR */}
        {activeTab === "predictor" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0D0D0D] border border-white/10 rounded-3xl p-8 text-white shadow-2xl mb-8">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-[10px] font-mono font-bold text-[#E44D26] uppercase tracking-widest">FUTURE TECH ENGINE</span>
                <h2 className="font-display font-black text-4xl uppercase mt-2 mb-3">AI 2030 TECH HORIZON PREDICTOR</h2>
                <p className="text-white/70 text-xs leading-relaxed">
                  Our AI engine evaluates your developer profile, mastered algorithms, and current stack to project how software engineering paradigms will transform by 2030.
                </p>
              </div>

              <div className="flex justify-center mb-8">
                <button
                  onClick={handleRunPredictor}
                  disabled={generatingPrediction}
                  className="bg-[#E44D26] text-white font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-xl"
                >
                  {generatingPrediction ? "ANALYZING 2030 FUTURE TECH PARADIGMS..." : "🔮 GENERATE 2030 TECH HORIZON REPORT"}
                </button>
              </div>

              {generatingPrediction && (
                <div className="py-12 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-[#E44D26]/20 border-t-[#E44D26] animate-spin"></div>
                  <div className="font-mono text-xs font-bold text-[#E44D26]">Synthesizing 2030 Quantum & AI Agent Forecast...</div>
                </div>
              )}

              {predictionReport && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#28C840] uppercase">2030 FORECAST COMPLETE</span>
                      <h3 className="font-display font-black text-2xl uppercase">2030 TECH HORIZON REPORT</h3>
                    </div>
                    <div className="text-center bg-[#E44D26] text-white px-4 py-2 rounded-xl">
                      <div className="font-display font-black text-2xl">{predictionReport.readinessScore}%</div>
                      <div className="text-[9px] font-mono uppercase">2030 READINESS</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase mb-2">TOP 2030 TECH PARADIGMS</div>
                    <div className="grid md:grid-cols-2 gap-3">
                      {predictionReport.techParadigms.map((p, idx) => (
                        <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 text-xs font-mono text-white/90">
                          ✦ {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-[10px] font-mono font-bold text-[#82AAFF] uppercase mb-1">AI AGENT EVOLUTION FORECAST</div>
                    <p className="text-xs text-white/80 font-mono leading-relaxed bg-black/50 p-3 rounded-xl border border-white/5">
                      {predictionReport.aiAgentEvolution}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono font-bold text-[#28C840] uppercase mb-1">PROGRAMMING LANGUAGES FORECAST</div>
                    <p className="text-xs text-white/80 font-mono leading-relaxed bg-black/50 p-3 rounded-xl border border-white/5">
                      {predictionReport.languagesForecast}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CERTIFICATE */}
        {activeTab === "certificate" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#0D0D0D] border-4 border-white/20 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-4">Official Platform Certification</div>
              <h2 className="font-display font-black text-4xl uppercase mb-2">2030 FUTURE DEVELOPER CERTIFICATE</h2>
              <div className="text-white/60 text-xs mb-6">This certifies that</div>

              <div className="font-display font-black text-5xl text-[#E44D26] uppercase mb-6">{user.name}</div>

              <p className="text-white/80 text-xs leading-relaxed max-w-md mx-auto mb-8 font-serif italic">
                Has successfully sealed an encrypted 2030 Time-Capsule and completed the 2030 AI Tech Horizon Evaluation with a readiness score of 96%.
              </p>

              <div className="font-mono text-[10px] text-white/40 uppercase">CC-2030-TIME-VAULT-{Date.now()}</div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
