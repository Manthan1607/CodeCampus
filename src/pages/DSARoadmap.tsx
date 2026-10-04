import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { dsaTopics } from "../data/mockData";
import AlgorithmVisualizer from "../components/AlgorithmVisualizer";

const statusConfig = {
  mastered: { color: "#1E7A4E", bg: "#EDFBF3", border: "#1E7A4E", label: "Mastered" },
  completed: { color: "#1B52CC", bg: "#EEF3FF", border: "#1B52CC", label: "Completed" },
  active: { color: "#E44D26", bg: "#FFF1EE", border: "#E44D26", label: "In Progress" },
  locked: { color: "#A09E98", bg: "#F0EFE9", border: "#DDDBD5", label: "Locked" },
};

const topicDetails: Record<string, { description: string; problems: { title: string; difficulty: string }[]; theory: string }> = {
  arrays: {
    description: "Foundation of all data structures. Master array operations, in-place algorithms, and the critical two-pointer/sliding-window techniques.",
    theory: "An array is a contiguous block of memory. Accessing elements is O(1), but inserting/deleting in the middle is O(n). Most problems can be solved with a combination of sorting and binary search.",
    problems: [
      { title: "Two Sum", difficulty: "Easy" },
      { title: "Best Time to Buy Stock", difficulty: "Easy" },
      { title: "Maximum Subarray", difficulty: "Medium" },
      { title: "Product Except Self", difficulty: "Medium" },
      { title: "Trapping Rain Water", difficulty: "Hard" },
    ],
  },
  "binary-search": {
    description: "Divide and conquer for sorted arrays. Not just for searching — apply to any monotonic condition.",
    theory: "Binary search finds an element in O(log n). The key insight is that it works on any monotonic function, not just sorted arrays. Ask: 'Can I binary search on the answer?'",
    problems: [
      { title: "Binary Search", difficulty: "Easy" },
      { title: "Search in Rotated Array", difficulty: "Medium" },
      { title: "Find Peak Element", difficulty: "Medium" },
      { title: "Median of Two Arrays", difficulty: "Hard" },
    ],
  },
  dp: {
    description: "The final boss of DSA. Break problems into overlapping subproblems, memoize, and conquer.",
    theory: "DP is about identifying states and transitions. Every DP problem asks: what do I need to know to make an optimal decision at this step? Memoization (top-down) vs tabulation (bottom-up) are two approaches.",
    problems: [
      { title: "Climbing Stairs", difficulty: "Easy" },
      { title: "Coin Change", difficulty: "Medium" },
      { title: "Longest Increasing Subsequence", difficulty: "Medium" },
      { title: "Edit Distance", difficulty: "Hard" },
      { title: "Burst Balloons", difficulty: "Hard" },
    ],
  },
};

function TopicNode({ topic, onClick, selected }: {
  topic: typeof dsaTopics[0];
  onClick: () => void;
  selected: boolean;
}) {
  const config = statusConfig[topic.status as keyof typeof statusConfig];
  return (
    <g>
      <foreignObject x={topic.x - 52} y={topic.y - 20} width={104} height={40}>
        <button
          onClick={onClick}
          style={{
            width: "100%",
            height: "100%",
            background: selected ? "#0D0D0D" : config.bg,
            border: `2px solid ${selected ? "#0D0D0D" : config.border}`,
            borderRadius: "8px",
            cursor: topic.status === "locked" ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: "700",
            color: selected ? "white" : config.color,
            fontFamily: "Inter, sans-serif",
            transition: "all 200ms",
            opacity: topic.status === "locked" ? 0.6 : 1,
          }}
        >
          {topic.status === "mastered" ? "✓ " : topic.status === "active" ? "▸ " : topic.status === "locked" ? "🔒 " : "○ "}
          {topic.label}
        </button>
      </foreignObject>
    </g>
  );
}

function ConnectionLine({ from, to }: { from: typeof dsaTopics[0]; to: typeof dsaTopics[0] }) {
  const fx = from.x, fy = from.y + 20;
  const tx = to.x, ty = to.y - 20;
  const mx = (fx + tx) / 2, my = (fy + ty) / 2;
  return (
    <path
      d={`M ${fx} ${fy} C ${fx} ${my}, ${tx} ${my}, ${tx} ${ty}`}
      stroke="#DDDBD5"
      strokeWidth={1.5}
      fill="none"
      strokeDasharray={to.status === "locked" ? "4 3" : "none"}
    />
  );
}

export default function DSARoadmap() {
  const [selectedTopic, setSelectedTopic] = useState<string>("arrays");
  const [activeDetailTab, setActiveDetailTab] = useState<"theory" | "problems" | "quiz">("theory");

  const svgWidth = 480;
  const svgHeight = 760;

  const connections: [string, string][] = [
    ["arrays", "sorting"], ["strings", "sorting"], ["sorting", "binary-search"], ["sorting", "two-pointers"],
    ["arrays", "two-pointers"], ["strings", "two-pointers"], ["arrays", "sliding-window"], ["strings", "sliding-window"],
    ["binary-search", "linked-list"], ["two-pointers", "stack"], ["linked-list", "tree"], ["stack", "tree"],
    ["sliding-window", "heap"], ["tree", "graph"], ["stack", "dp"], ["heap", "dp"], ["graph", "backtracking"], ["dp", "trie"],
  ];

  const selected = dsaTopics.find((t) => t.id === selectedTopic);
  const detail = topicDetails[selectedTopic];

  return (
    <DashboardLayout role="student">
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        {/* Roadmap SVG */}
        <div className="flex-1 overflow-auto bg-[#F7F6F3] p-6">
          <div className="mb-6">
            <div className="text-[10px] tracking-[0.2em] font-bold text-[#E44D26] uppercase mb-1">Learning Path</div>
            <h1 className="font-display font-black text-4xl text-[#0D0D0D] uppercase">DSA ROADMAP</h1>
          </div>

          <div className="flex gap-3 mb-6 flex-wrap">
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-1.5 text-[11px]" style={{ color: cfg.color }}>
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}` }}></div>
                {cfg.label}
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#DDDBD5] rounded-2xl overflow-auto p-4 inline-block min-w-full">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ minWidth: svgWidth }}>
              {connections.map(([fromId, toId]) => {
                const from = dsaTopics.find((t) => t.id === fromId);
                const to = dsaTopics.find((t) => t.id === toId);
                if (!from || !to) return null;
                return <ConnectionLine key={`${fromId}-${toId}`} from={from} to={to} />;
              })}
              {dsaTopics.map((topic) => (
                <TopicNode
                  key={topic.id}
                  topic={topic}
                  selected={selectedTopic === topic.id}
                  onClick={() => topic.status !== "locked" && setSelectedTopic(topic.id)}
                />
              ))}
            </svg>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-[#A09E98]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Click any unlocked topic to explore its content
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-96 flex-shrink-0 bg-white border-l border-[#DDDBD5] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-[#F0EFE9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: statusConfig[selected.status as keyof typeof statusConfig].color }}>
                  {statusConfig[selected.status as keyof typeof statusConfig].label}
                </span>
              </div>
              <h2 className="font-display font-black text-3xl text-[#0D0D0D] uppercase">{selected.label}</h2>
              {detail && <p className="text-sm text-[#68665F] mt-2 leading-relaxed">{detail.description}</p>}
            </div>

            {detail && (
              <>
                <div className="flex border-b border-[#F0EFE9]">
                  {(["theory", "problems", "quiz"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveDetailTab(tab)}
                      className={`flex-1 py-3 text-xs font-semibold uppercase tracking-widets transition-colors ${
                        activeDetailTab === tab
                          ? "text-[#E44D26] border-b-2 border-[#E44D26]"
                          : "text-[#A09E98] hover:text-[#0D0D0D]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                  {activeDetailTab === "theory" && (
                    <div className="space-y-4">
                      <p className="text-sm text-[#0D0D0D] leading-relaxed">{detail.theory}</p>
                      
                      {/* Animated Learning Visualizer */}
                      <AlgorithmVisualizer
                        defaultAlgo={
                          selectedTopic === "binary-search"
                            ? "binary-search"
                            : selectedTopic === "sorting"
                            ? "sorting"
                            : "two-pointers"
                        }
                      />

                      <div className="mt-4 bg-[#F7F6F3] rounded-xl p-4">
                        <div className="text-[10px] font-bold text-[#A09E98] uppercase tracking-widest mb-2">Key Complexity</div>
                        <div className="font-mono text-sm space-y-1 text-[#0D0D0D]">
                          <div>Access: <span className="text-[#1E7A4E] font-bold">O(1)</span></div>
                          <div>Search: <span className="text-[#1B52CC] font-bold">O(n)</span></div>
                          <div>Insert/Delete: <span className="text-[#A65C00] font-bold">O(n)</span></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDetailTab === "problems" && (
                    <div className="flex flex-col gap-2">
                      {detail.problems.map((p, i) => {
                        const dc: Record<string, string> = { Easy: "text-[#1E7A4E] bg-[#EDFBF3]", Medium: "text-[#A65C00] bg-[#FFF8ED]", Hard: "text-[#C93D18] bg-[#FFF1EE]" };
                        return (
                          <Link
                            key={i}
                            to="/ide/1"
                            className="flex items-center gap-3 p-3 bg-[#F7F6F3] rounded-xl hover:bg-[#F0EFE9] transition-colors"
                          >
                            <span className="text-[#A09E98] text-xs font-mono w-5">{i + 1}.</span>
                            <span className="flex-1 text-sm font-medium text-[#0D0D0D]">{p.title}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${dc[p.difficulty]}`}>{p.difficulty}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {activeDetailTab === "quiz" && (
                    <div>
                      <div className="bg-[#F7F6F3] rounded-2xl p-5">
                        <div className="text-[11px] font-bold text-[#A09E98] uppercase tracking-widets mb-3">Quick Check</div>
                        <p className="text-sm font-semibold text-[#0D0D0D] mb-4">
                          What is the time complexity of accessing an element at index i in an array?
                        </p>
                        <div className="flex flex-col gap-2">
                          {["O(1)", "O(log n)", "O(n)", "O(n²)"].map((option) => (
                            <button
                              key={option}
                              className="text-left px-4 py-2.5 rounded-xl border border-[#DDDBD5] text-sm hover:border-[#0D0D0D] hover:bg-white transition-colors font-mono"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 border-t border-[#F0EFE9]">
                  <Link to="/ide/1" className="w-full bg-[#E44D26] text-white font-semibold py-3 rounded-full text-sm text-center block hover:bg-[#C93D18] transition-colors">
                    PRACTICE PROBLEMS →
                  </Link>
                </div>
              </>
            )}

            {!detail && (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <div className="text-4xl mb-3">🔒</div>
                  <p className="text-[#68665F] text-sm">Complete prerequisite topics to unlock this content.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
