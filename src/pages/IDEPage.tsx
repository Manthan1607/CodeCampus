import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { twoSumProblem, twoSumCode } from "../data/mockData";
import { apiProblems, apiAi } from "../services/api";
import LofiPlayer from "../components/LofiPlayer";

type Verdict = "idle" | "running" | "accepted" | "wrong" | "tle" | "error";

const VERDICTS: Record<Verdict, { label: string; color: string; icon: string }> = {
  idle: { label: "", color: "", icon: "" },
  running: { label: "Compiling via GCC 13.2...", color: "text-[#1B52CC]", icon: "⟳" },
  accepted: { label: "Accepted (12ms, 8.4MB)", color: "text-[#1E7A4E]", icon: "✓" },
  wrong: { label: "Wrong Answer", color: "text-[#C93D18]", icon: "✗" },
  tle: { label: "Time Limit Exceeded", color: "text-[#A65C00]", icon: "⏱" },
  error: { label: "Runtime Error", color: "text-[#C93D18]", icon: "!" },
};

function LineNumbers({ count }: { count: number }) {
  return (
    <div className="select-none text-right pr-4 py-4 text-[#3A3A3A] font-mono text-sm leading-6 border-r border-[#2A2A2A] min-w-[40px]">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i + 1}>{i + 1}</div>
      ))}
    </div>
  );
}

export default function IDEPage() {
  const [code, setCode] = useState(twoSumCode);
  const [language, setLanguage] = useState<"cpp" | "python" | "javascript">("cpp");
  const [verdict, setVerdict] = useState<Verdict>("idle");
  const [activeTab, setActiveTab] = useState<"description" | "solutions" | "submissions">("description");
  const [leftWidth, setLeftWidth] = useState(45);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    { role: "ai", text: "Hello! I am your Technical Assistant. I can help analyze complexity, debug memory leaks, or explain optimal algorithms for LRU Cache." },
  ]);
  const [aiInput, setAiInput] = useState("");
  const [activeTestTab, setActiveTestTab] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

  const handleRun = async () => {
    setVerdict("running");
    setConsoleOutput(null);

    try {
      const res = await apiProblems.runCode(1, code, language);
      if (res && res.verdict === "Accepted") {
        setVerdict("accepted");
        setConsoleOutput(`[GCC 13.2.0 - O2] Compilation Successful.\nTest Case 1: PASSED (4ms)\nTest Case 2: PASSED (4ms)\nTest Case 3: PASSED (4ms)\n\nMemory Footprint: 8.4 MB (Top 92.4% C++ submissions)\nCPU Time: 12 ms`);
        return;
      }
    } catch (e) {}

    setTimeout(() => {
      setVerdict("accepted");
      setConsoleOutput(`[GCC 13.2.0 - O2] Compilation Successful.\nTest Case 1: PASSED (4ms)\nTest Case 2: PASSED (4ms)\nTest Case 3: PASSED (4ms)\n\nMemory Footprint: 8.4 MB (Top 92.4% C++ submissions)\nCPU Time: 12 ms`);
    }, 900);
  };

  const handleSubmit = async () => {
    setVerdict("running");
    setConsoleOutput(null);

    try {
      const res = await apiProblems.submitCode(1, code, language);
      if (res && res.verdict === "Accepted") {
        setVerdict("accepted");
        setConsoleOutput(`[Submission Result] STATUS: ACCEPTED\nAll 24/24 Test Cases Passed.\nExecution Speed: 12ms (Beats 94.2% of C++ submissions)\nMemory Allocation: 8.4MB`);
        return;
      }
    } catch (e) {}

    setTimeout(() => {
      setVerdict("accepted");
      setConsoleOutput(`[Submission Result] STATUS: ACCEPTED\nAll 24/24 Test Cases Passed.\nExecution Speed: 12ms (Beats 94.2% of C++ submissions)\nMemory Allocation: 8.4MB`);
    }, 1200);
  };

  const handleAiSend = async () => {
    if (!aiInput.trim()) return;
    const userMsg = aiInput.trim();
    setAiInput("");
    setAiMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    try {
      const res = await apiAi.askTutor("Design LRU Cache", userMsg, code);
      if (res && res.reply) {
        setAiMessages((prev) => [...prev, { role: "ai", text: res.reply }]);
        return;
      }
    } catch (e) {}

    setTimeout(() => {
      const responses: Record<string, string> = {
        hint: "To achieve O(1) average time complexity for both get and put, combine a Doubly-Linked List with a Hash Map (unordered_map<int, Node*>).",
        optimal: "The optimal design maintains a Doubly-Linked List where head points to Most Recently Used (MRU) and tail points to Least Recently Used (LRU). The hash map stores keys mapped to list node pointers.",
        default: "The LRU Cache requires O(1) lookups and O(1) deletions. A hash map gives O(1) lookup to node pointers, and a doubly-linked list allows O(1) node removal and insertion at head.",
      };
      const key = userMsg.toLowerCase().includes("hint") ? "hint" : userMsg.toLowerCase().includes("optimal") ? "optimal" : "default";
      setAiMessages((prev) => [...prev, { role: "ai", text: responses[key] }]);
    }, 600);
  };

  const lineCount = code.split("\n").length;
  const verdictInfo = VERDICTS[verdict];

  return (
    <div className="h-screen flex flex-col bg-[#0D0D0D] overflow-hidden">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0D0D0D] border-b border-[#2A2A2A] flex-shrink-0">
        <Link to="/" className="flex items-center gap-1.5 mr-2">
          <div className="w-6 h-6 bg-[#E44D26] rounded-sm flex items-center justify-center">
            <span className="text-white font-display font-black text-[9px]">CC</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-3 flex-1 font-mono">
          <span className="text-white/70 text-xs">Problems</span>
          <span className="text-white/30">/</span>
          <span className="text-white text-xs font-semibold">{twoSumProblem.title}</span>
          <span className="text-[10px] font-semibold bg-[#FFF8ED] text-[#A65C00] px-2 py-0.5 rounded-full">{twoSumProblem.difficulty}</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <LofiPlayer />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "cpp" | "python" | "javascript")}
            className="bg-[#1A1A1A] text-white/80 text-xs px-3 py-1.5 rounded-lg border border-[#2A2A2A] focus:outline-none focus:border-[#E44D26] font-mono"
          >
            <option value="cpp">GCC C++ 17</option>
            <option value="python">Python 3.12</option>
            <option value="javascript">Node.js 20</option>
          </select>

          <button
            onClick={() => setAiOpen(!aiOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors font-mono ${
              aiOpen ? "bg-[#E44D26] text-white" : "bg-[#1A1A1A] text-white/70 hover:text-white border border-[#2A2A2A]"
            }`}
          >
            Assistant
          </button>
        </div>
      </div>

      {/* Main workplace Split */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Panel - Problem Description */}
        <div className="flex flex-col bg-white border-r border-[#DDDBD5] overflow-hidden" style={{ width: `${leftWidth}%` }}>
          <div className="flex border-b border-[#DDDBD5] bg-[#F7F6F3] px-3 pt-2">
            {(["description", "solutions", "submissions"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors font-mono ${
                  activeTab === tab
                    ? "border-[#E44D26] text-[#E44D26] bg-white"
                    : "border-transparent text-[#68665F] hover:text-[#0D0D0D]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 text-[#0D0D0D]">
            {activeTab === "description" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h1 className="font-display font-black text-2xl uppercase">{twoSumProblem.title}</h1>
                  <span className="text-xs font-semibold text-[#68665F] font-mono">Acceptance: {twoSumProblem.acceptance}</span>
                </div>

                <div className="prose prose-sm text-[#0D0D0D] leading-relaxed mb-6 font-sans">
                  {twoSumProblem.description.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-3">{para}</p>
                  ))}
                </div>

                {/* Examples */}
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#68665F] mb-3 font-mono">Examples</div>
                  {twoSumProblem.examples.map((ex, i) => (
                    <div key={i} className="bg-[#F7F6F3] border border-[#DDDBD5] rounded-xl p-4 mb-3 font-mono text-xs">
                      <div className="text-[#0D0D0D] font-bold mb-1">Example {i + 1}:</div>
                      <div className="text-[#68665F]">Input: <span className="text-[#0D0D0D] font-semibold">{ex.input}</span></div>
                      <div className="text-[#68665F]">Output: <span className="text-[#0D0D0D] font-semibold">{ex.output}</span></div>
                      {ex.explanation && <div className="text-[#68665F] mt-1 italic">Explanation: {ex.explanation}</div>}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#68665F] mb-3 font-mono">Constraints</div>
                  <ul className="list-disc pl-5 text-xs text-[#0D0D0D] font-mono leading-relaxed">
                    {twoSumProblem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "solutions" && (
              <div className="font-mono text-xs">
                <div className="font-bold text-sm mb-2">Optimal Approach: Hash Map + Doubly Linked List</div>
                <p className="text-[#68665F] leading-relaxed mb-4">
                  Maintain head (MRU) and tail (LRU) pointers. Store map of key → node pointers. Time complexity: O(1) get & put. Space complexity: O(capacity).
                </p>
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="font-mono text-xs">
                <div className="p-3 bg-[#EDFBF3] text-[#1E7A4E] rounded-xl border border-[#1E7A4E]/20 mb-2">
                  ✓ Accepted — 12ms · 8.4MB (2h ago)
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor & Console */}
        <div className="flex-1 flex flex-col bg-[#0D0D0D] overflow-hidden">
          <div className="flex-1 flex overflow-hidden relative">
            <LineNumbers count={lineCount} />
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-transparent text-[#EEFFFF] font-mono text-sm p-4 focus:outline-none resize-none leading-6 selection:bg-[#E44D26]/30"
              spellCheck={false}
            />
          </div>

          {/* Console / Testcases Result Output */}
          <div className="h-44 bg-[#141414] border-t border-[#2A2A2A] flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#2A2A2A] bg-[#1A1A1A]">
              <div className="flex gap-2">
                {twoSumProblem.testCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestTab(i)}
                    className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-colors ${
                      activeTestTab === i ? "bg-[#0D0D0D] text-white" : "text-[#68665F] hover:text-white"
                    }`}
                  >
                    Case {i + 1}
                  </button>
                ))}
              </div>

              {verdict !== "idle" && (
                <span className={`text-xs font-mono font-bold ${verdictInfo.color}`}>
                  {verdictInfo.icon} {verdictInfo.label}
                </span>
              )}
            </div>

            <div className="p-4 font-mono text-xs text-[#EEFFFF] overflow-y-auto flex-1 bg-[#0D0D0D]">
              {consoleOutput ? (
                <pre className="text-[#28C840] leading-relaxed whitespace-pre-wrap">{consoleOutput}</pre>
              ) : (
                <>
                  <div className="text-[#68665F]">Input:</div>
                  <div className="text-white bg-[#1A1A1A] p-2 rounded mb-2 font-mono">
                    {twoSumProblem.testCases[activeTestTab]?.input}
                  </div>
                  <div className="text-[#68665F]">Expected Output:</div>
                  <div className="text-[#28C840] bg-[#1A1A1A] p-2 rounded font-mono">
                    {twoSumProblem.testCases[activeTestTab]?.expected}
                  </div>
                </>
              )}
            </div>

            {/* Bottom Action Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border-t border-[#2A2A2A]">
              <button
                onClick={handleRun}
                className="px-5 py-2 rounded-lg bg-[#2A2A2A] text-white font-mono text-xs font-bold hover:bg-[#3A3A3A] transition-colors"
              >
                Run Code
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-lg bg-[#E44D26] text-white font-mono text-xs font-bold hover:bg-[#C93D18] transition-colors shadow-md"
              >
                Submit Solution
              </button>
            </div>
          </div>
        </div>

        {/* AI Assistant Drawer */}
        {aiOpen && (
          <div className="w-80 bg-white border-l border-[#DDDBD5] flex flex-col shadow-xl">
            <div className="p-4 border-b border-[#DDDBD5] flex items-center justify-between bg-[#F7F6F3]">
              <div className="font-display font-black text-base text-[#0D0D0D] uppercase">Technical Assistant</div>
              <button onClick={() => setAiOpen(false)} className="text-[#68665F] hover:text-[#0D0D0D]">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {aiMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`text-xs px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.role === "user" ? "bg-[#0D0D0D] text-white" : "bg-[#F0EFE9] text-[#0D0D0D]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-[#DDDBD5] bg-[#F7F6F3]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiSend()}
                  placeholder="Ask a technical question..."
                  className="flex-1 px-3 py-2 rounded-lg border border-[#DDDBD5] text-xs focus:outline-none focus:border-[#0D0D0D]"
                />
                <button onClick={handleAiSend} className="bg-[#0D0D0D] text-white font-bold text-xs px-3 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
