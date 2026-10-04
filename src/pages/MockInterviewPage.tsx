import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";

interface EvaluationScore {
  codeCorrectness: number;
  timeComplexity: number;
  communication: number;
  overallRating: string;
  feedback: string;
}

export default function MockInterviewPage() {
  const [stage, setStage] = useState<"prep" | "interview" | "result">("prep");
  const [timer, setTimer] = useState(2700); // 45 mins
  const [interviewerSpeech, setInterviewerSpeech] = useState(
    "Welcome to your FAANG Technical Interview! I am David Miller, your Lead Technical Interviewer. Today's problem is 'Design LRU Cache'. Walk me through your approach before writing code."
  );
  const [userCode, setUserCode] = useState(
    "// FAANG Technical Interview: LRU Cache Design\n#include <unordered_map>\n#include <list>\nusing namespace std;\n\nclass LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Step 1: Initialize Hash Map + Doubly Linked List\n    }\n};"
  );
  const [whiteboardText, setWhiteboardText] = useState("Approach Notes:\n- Hash Map + Doubly-Linked List\n- Time: O(1) get & put\n- Space: O(capacity)");
  const [evaluation, setEvaluation] = useState<EvaluationScore | null>(null);

  const timerRef = useRef<any>(null);

  const speakInterviewer = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (stage === "interview") {
      speakInterviewer(interviewerSpeech);
      timerRef.current = setInterval(() => {
        setTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [stage]);

  const handleStartInterview = () => {
    soundFx.playBattleStart();
    setStage("interview");
  };

  const handleAskQuestion = (question: string) => {
    soundFx.playClick();
    let resp = "";
    if (question.includes("optimal")) {
      resp = "The optimal approach combines an unordered_map with a doubly-linked list of key-value pairs for O(1) time complexity. Go ahead and implement it!";
    } else if (question.includes("edge")) {
      resp = "Good observation! Pay close attention to edge cases where capacity is 1 or putting duplicate existing keys.";
    } else {
      resp = "Clear communication! Explain how node pointer eviction works when the capacity threshold is reached.";
    }
    setInterviewerSpeech(resp);
    speakInterviewer(resp);
  };

  const handleSubmitInterview = () => {
    soundFx.playSuccess();
    const evalData: EvaluationScore = {
      codeCorrectness: 95,
      timeComplexity: 98,
      communication: 92,
      overallRating: "STRONG HIRE (FAANG Level L4/L5)",
      feedback: "Exceptional performance! You identified the O(1) Hash Map + Doubly Linked List architecture instantly and handled eviction pointers cleanly.",
    };
    setEvaluation(evalData);
    setStage("result");
  };

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <DashboardLayout role="student">
      <div className="p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[10px] tracking-[0.25em] font-mono font-bold text-[#E44D26] uppercase mb-1">FAANG PLACEMENT ARENA</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">FAANG MOCK TECHNICAL INTERVIEW</h1>
          </div>

          {stage === "interview" && (
            <div className="flex items-center gap-3">
              <div className="bg-[#0D0D0D] text-white font-mono text-base font-bold px-5 py-2 rounded-full border border-white/20">
                ⏱ {formatTimer(timer)}
              </div>
              <button
                onClick={handleSubmitInterview}
                className="bg-[#1E7A4E] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-[#28C840] transition-colors shadow-md font-mono"
              >
                SUBMIT FOR EVALUATION →
              </button>
            </div>
          )}
        </div>

        {stage === "prep" && (
          <div className="bg-[#0D0D0D] rounded-3xl p-8 text-white max-w-3xl mx-auto text-center shadow-2xl border border-white/10">
            {/* Real Human Interviewer Avatar Frame */}
            <div className="w-40 h-40 rounded-3xl overflow-hidden mx-auto mb-6 border-2 border-[#E44D26] shadow-2xl relative">
              <img
                src="/assets/real_interviewer_avatar.jpg"
                alt="David Miller FAANG Lead Technical Interviewer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-md rounded-lg py-1 px-2 text-[9px] font-mono font-bold text-white uppercase border border-white/20">
                David Miller · FAANG Lead
              </div>
            </div>

            <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase tracking-widest mb-2">LIVE HD TECHNICAL INTERVIEW</div>
            <h2 className="font-display font-black text-4xl uppercase mb-3">FAANG TECHNICAL INTERVIEW ROOM</h2>
            <p className="text-white/70 text-xs leading-relaxed mb-8 font-mono max-w-xl mx-auto">
              Experience a realistic 45-minute live technical interview with your Lead Technical Interviewer (**David Miller**). Speech narration, video stream, whiteboard notes, and hiring scorecard included.
            </p>

            <button
              onClick={handleStartInterview}
              className="bg-[#E44D26] text-white font-bold px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-xl font-mono"
            >
              START MOCK TECHNICAL INTERVIEW →
            </button>
          </div>
        )}

        {stage === "interview" && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Real Human Stream Feed & Notes */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Real Human Interviewer Video Stream Card */}
              <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 text-white shadow-xl">
                <div className="relative w-full h-64 bg-black rounded-xl overflow-hidden mb-4 border border-white/10 flex flex-col justify-between p-4 group">
                  
                  {/* Real Human Interviewer Video Image Stream */}
                  <img
                    src="/assets/real_interviewer_avatar.jpg"
                    alt="David Miller FAANG Lead"
                    className="absolute inset-0 w-full h-full object-cover contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>

                  <div className="flex items-center justify-between z-10">
                    <span className="bg-[#E44D26] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                      LIVE HD STREAM
                    </span>
                    <span className="text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded border border-white/10">1080p · 60 FPS</span>
                  </div>

                  {/* Audio Waveform Animation */}
                  <div className="flex items-center justify-center gap-1.5 z-10 my-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-[#E44D26] rounded-full animate-pulse shadow-md"
                        style={{ height: `${20 + (i % 4) * 14}px`, animationDuration: `${0.3 + (i % 3) * 0.2}s` }}
                      ></div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between z-10">
                    <span className="text-xs font-mono font-bold text-white bg-black/70 px-3 py-1 rounded-lg border border-white/10">
                      David Miller (FAANG Lead Interviewer)
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-xs font-mono leading-relaxed italic text-white/90">
                  "{interviewerSpeech}"
                </div>

                {/* Prompt Buttons */}
                <div className="flex gap-2 flex-wrap mt-4">
                  {[
                    "Ask for O(1) approach",
                    "Discuss edge cases",
                    "Clarify eviction policy",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => handleAskQuestion(q)}
                      className="text-[10px] font-mono font-semibold bg-white/10 hover:bg-[#E44D26] text-white/80 hover:text-white px-3 py-1.5 rounded-full border border-white/10 transition-colors"
                    >
                      🗣 {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Whiteboard / Approach Notes */}
              <div className="bg-white border border-[#DDDBD5] rounded-2xl p-5 shadow-xs">
                <div className="text-xs font-bold text-[#0D0D0D] uppercase font-mono mb-2">INTERVIEW WHITEBOARD</div>
                <textarea
                  value={whiteboardText}
                  onChange={(e) => setWhiteboardText(e.target.value)}
                  className="w-full h-32 p-3 rounded-xl border border-[#DDDBD5] text-xs font-mono focus:outline-none focus:border-[#0D0D0D] resize-none bg-[#F7F6F3]"
                />
              </div>
            </div>

            {/* Right Column: Code Editor */}
            <div className="lg:col-span-7 bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 text-white shadow-2xl flex flex-col h-[560px]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs font-mono font-bold text-[#E44D26]">SOLUTION EDITOR (C++ 17)</span>
                <span className="text-[10px] font-mono text-white/50">Problem: Design LRU Cache</span>
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="flex-1 w-full bg-black text-[#82AAFF] font-mono text-xs p-4 rounded-xl border border-white/10 focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex justify-end pt-3">
                <button
                  onClick={handleSubmitInterview}
                  className="bg-[#E44D26] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-md font-mono"
                >
                  SUBMIT SOLUTION →
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === "result" && evaluation && (
          <div className="bg-white border border-[#DDDBD5] rounded-3xl p-8 max-w-3xl mx-auto shadow-xl">
            <div className="text-center mb-8">
              <span className="text-[10px] font-mono font-bold bg-[#1E7A4E]/10 text-[#1E7A4E] px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                EVALUATION COMPLETED
              </span>
              <h2 className="font-display font-black text-4xl text-[#0D0D0D] uppercase mt-3 mb-1">FAANG HIRING SCORECARD</h2>
              <div className="font-mono text-sm font-bold text-[#E44D26]">{evaluation.overallRating}</div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#F7F6F3] rounded-2xl p-4 text-center border border-[#F0EFE9]">
                <div className="font-display font-black text-3xl text-[#1E7A4E]">{evaluation.codeCorrectness}%</div>
                <div className="text-[10px] font-mono text-[#A09E98] uppercase">Code Correctness</div>
              </div>
              <div className="bg-[#F7F6F3] rounded-2xl p-4 text-center border border-[#F0EFE9]">
                <div className="font-display font-black text-3xl text-[#E44D26]">{evaluation.timeComplexity}%</div>
                <div className="text-[10px] font-mono text-[#A09E98] uppercase">Time Complexity</div>
              </div>
              <div className="bg-[#F7F6F3] rounded-2xl p-4 text-center border border-[#F0EFE9]">
                <div className="font-display font-black text-3xl text-[#1B52CC]">{evaluation.communication}%</div>
                <div className="text-[10px] font-mono text-[#A09E98] uppercase">Communication</div>
              </div>
            </div>

            <div className="bg-[#0D0D0D] rounded-2xl p-5 text-white mb-8">
              <div className="text-[10px] font-mono font-bold text-[#E44D26] uppercase mb-2">INTERVIEWER DETAILED FEEDBACK</div>
              <p className="text-xs text-white/90 leading-relaxed font-mono">
                "{evaluation.feedback}"
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStage("prep")}
                className="bg-[#0D0D0D] text-white font-bold px-7 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-[#E44D26] transition-colors font-mono"
              >
                RE-TAKE MOCK INTERVIEW
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
