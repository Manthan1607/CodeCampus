import React, { useState, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";

interface AnalysisResult {
  overallScore: number;
  atsMatch: number;
  keywordScore: number;
  projectQuality: number;
  missingKeywords: string[];
  suggestions: string[];
  estimatedSalary: string;
}

export default function PortfolioAnalyzerPage() {
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; date: string } | null>({
    name: "Manthan_Mandavkar_Software_Engineer_Resume.pdf",
    size: "420 KB",
    date: "Sep 1, 2026",
  });
  const [resumeText, setResumeText] = useState(
    "MANTHAN MANDAVKAR\nComputer Science & Engineering Student\nSkills: C++, Python, JavaScript, React, Node.js, Express, MongoDB, Socket.io, DSA, System Design\nProjects:\n1. CodeCampus Platform - Full-Stack Algorithm Arena with Monaco IDE and Socket.io 1v1 Battles\n2. Mini Redis Clone - Key-value store in Go with RESP protocol implementation"
  );
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    soundFx.playSuccess();
    const sizeKB = `${Math.round(file.size / 1024)} KB`;
    setUploadedFile({
      name: file.name,
      size: sizeKB,
      date: "Just now",
    });
  };

  const handleAnalyze = () => {
    soundFx.playClick();
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      soundFx.playSuccess();
      setAnalyzing(false);
      setResult({
        overallScore: 95,
        atsMatch: 94,
        keywordScore: 96,
        projectQuality: 95,
        missingKeywords: ["Docker", "Kubernetes", "Kafka", "CI/CD Pipeline"],
        suggestions: [
          "Highlight quantitative metrics (e.g. 'Optimized algorithm latency by 45%').",
          "Add Docker containerization experience for backend microservices.",
          "Include link to live deployed demo on AWS/GCP.",
        ],
        estimatedSalary: "$120,000 - $145,000 USD / yr",
      });
    }, 2500);
  };

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">CANDIDATE HIRING INTELLIGENCE</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">AI RESUME PDF & ATS SCANNER</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: PDF Uploader & Text Input */}
          <div className="lg:col-span-6 bg-white border border-[#DDDBD5] rounded-3xl p-6 shadow-xs flex flex-col gap-6">
            
            {/* PDF / DOCX Drag & Drop File Upload Zone */}
            <div>
              <div className="text-xs font-bold text-[#0D0D0D] uppercase font-mono mb-2">UPLOAD RESUME / CV DOCUMENT (PDF or DOCX)</div>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.docx,.doc"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#DDDBD5] hover:border-[#E44D26] rounded-2xl p-6 text-center cursor-pointer bg-[#F7F6F3] hover:bg-white transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0D0D0D] text-white flex items-center justify-center mx-auto mb-3 text-xl group-hover:bg-[#E44D26] transition-colors">
                  📄
                </div>
                <div className="text-xs font-bold text-[#0D0D0D] font-mono uppercase mb-1">
                  CLICK TO BROWSE OR DRAG & DROP PDF RESUME
                </div>
                <div className="text-[10px] font-mono text-[#68665F]">
                  Supports PDF, DOCX (Max size 10MB)
                </div>
              </div>

              {/* Uploaded File Badge */}
              {uploadedFile && (
                <div className="mt-3 bg-[#EDFBF3] border border-[#1E7A4E]/30 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📄</span>
                    <div>
                      <div className="text-xs font-bold font-mono text-[#0D0D0D] truncate max-w-[240px]">{uploadedFile.name}</div>
                      <div className="text-[10px] font-mono text-[#1E7A4E]">{uploadedFile.size} · Uploaded {uploadedFile.date}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-[#1E7A4E] text-white px-2.5 py-1 rounded-full">
                    ✓ READY FOR ATS SCAN
                  </span>
                </div>
              )}
            </div>

            {/* Resume Text Box */}
            <div>
              <div className="text-xs font-bold text-[#0D0D0D] uppercase font-mono mb-2">OR PASTE RESUME CONTENT</div>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume or GitHub portfolio text here..."
                className="w-full h-44 p-4 rounded-2xl border border-[#DDDBD5] text-xs font-mono focus:outline-none focus:border-[#0D0D0D] resize-none bg-[#F7F6F3] leading-relaxed"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full bg-[#E44D26] text-white font-bold py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#0D0D0D] disabled:opacity-50 transition-colors shadow-md font-mono"
            >
              {analyzing ? "ANALYZING RESUME PDF WITH ATS ENGINE..." : "RUN AI ATS SCAN ON UPLOADED DOCUMENT →"}
            </button>
          </div>

          {/* Right Column: ATS Scan Results */}
          <div className="lg:col-span-6">
            {analyzing ? (
              <div className="bg-[#0D0D0D] rounded-3xl p-12 text-white text-center flex flex-col items-center gap-4 shadow-2xl border border-white/10">
                <div className="w-16 h-16 rounded-full border-4 border-[#E44D26]/20 border-t-[#E44D26] animate-spin"></div>
                <div className="font-mono text-xs font-bold text-[#E44D26]">Parsing PDF Document & matching keywords against FAANG ATS algorithms...</div>
              </div>
            ) : result ? (
              <div className="bg-[#0D0D0D] text-white border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <div className="text-[10px] font-mono text-white/50 uppercase">DOCUMENT SCAN COMPLETE</div>
                    <div className="font-display font-black text-2xl uppercase">HIRING READINESS REPORT</div>
                  </div>
                  <div className="text-center bg-[#1E7A4E] text-white px-4 py-2 rounded-2xl shadow-lg">
                    <div className="font-display font-black text-3xl">{result.overallScore}%</div>
                    <div className="text-[9px] font-mono uppercase">ATS SCORE</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white/5 p-3 rounded-2xl text-center border border-white/5">
                    <div className="font-display font-black text-2xl text-[#28C840]">{result.atsMatch}%</div>
                    <div className="text-[9px] text-white/50 font-mono uppercase">ATS Match</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl text-center border border-white/5">
                    <div className="font-display font-black text-2xl text-[#E44D26]">{result.keywordScore}%</div>
                    <div className="text-[9px] text-white/50 font-mono uppercase">Keywords</div>
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl text-center border border-white/5">
                    <div className="font-display font-black text-2xl text-[#82AAFF]">{result.projectQuality}%</div>
                    <div className="text-[9px] text-white/50 font-mono uppercase">Projects</div>
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="mb-6">
                  <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase mb-2">RECOMMENDED MISSING KEYWORDS</div>
                  <div className="flex gap-2 flex-wrap">
                    {result.missingKeywords.map((kw) => (
                      <span key={kw} className="text-[10px] font-mono bg-white/10 text-white/90 px-3 py-1 rounded-full border border-white/10">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-mono font-bold text-white/70 uppercase mb-2">ACTIONABLE IMPROVEMENTS</div>
                  <ul className="flex flex-col gap-2 text-xs font-mono text-white/80">
                    {result.suggestions.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#E44D26]">➔</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#1E7A4E]/20 border border-[#28C840] rounded-2xl p-4 text-center">
                  <div className="text-[10px] font-mono text-[#28C840] uppercase">ESTIMATED FAANG SALARY RANGE</div>
                  <div className="font-display font-black text-2xl text-white mt-0.5">{result.estimatedSalary}</div>
                </div>
              </div>
            ) : (
              <div className="bg-[#F7F6F3] border border-[#DDDBD5] rounded-3xl p-12 text-center text-[#68665F] font-mono text-xs">
                Upload your PDF resume document on the left to get instant ATS hiring score & keyword recommendations!
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
