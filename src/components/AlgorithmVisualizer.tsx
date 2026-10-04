import React, { useState, useEffect, useRef } from "react";

type AlgoType = "two-pointers" | "binary-search" | "sorting";

interface StepState {
  array: number[];
  pointers: { [key: string]: number };
  activeIndices: number[];
  sortedIndices: number[];
  explanation: string;
}

export default function AlgorithmVisualizer({ defaultAlgo = "two-pointers" }: { defaultAlgo?: AlgoType }) {
  const [algo, setAlgo] = useState<AlgoType>(defaultAlgo);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [steps, setSteps] = useState<StepState[]>([]);

  // Generate steps based on chosen algorithm
  useEffect(() => {
    if (algo === "two-pointers") {
      const arr = [2, 3, 5, 7, 11, 15];
      const target = 9;
      const generated: StepState[] = [];

      let left = 0;
      let right = arr.length - 1;

      generated.push({
        array: [...arr],
        pointers: { Left: left, Right: right },
        activeIndices: [left, right],
        sortedIndices: [],
        explanation: `Initial array. Target sum = ${target}. Left pointer at index ${left} (${arr[left]}), Right pointer at index ${right} (${arr[right]}).`,
      });

      while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === target) {
          generated.push({
            array: [...arr],
            pointers: { Left: left, Right: right },
            activeIndices: [left, right],
            sortedIndices: [left, right],
            explanation: `FOUND MATCH! ${arr[left]} + ${arr[right]} = ${target}. Target achieved in O(N) time!`,
          });
          break;
        } else if (sum > target) {
          generated.push({
            array: [...arr],
            pointers: { Left: left, Right: right },
            activeIndices: [left, right],
            sortedIndices: [],
            explanation: `Sum (${arr[left]} + ${arr[right]} = ${sum}) > ${target}. Decrement Right pointer to decrease sum.`,
          });
          right--;
        } else {
          generated.push({
            array: [...arr],
            pointers: { Left: left, Right: right },
            activeIndices: [left, right],
            sortedIndices: [],
            explanation: `Sum (${arr[left]} + ${arr[right]} = ${sum}) < ${target}. Increment Left pointer to increase sum.`,
          });
          left++;
        }
      }

      setSteps(generated);
      setStepIndex(0);
    } else if (algo === "binary-search") {
      const arr = [4, 8, 15, 16, 23, 42, 60, 75];
      const target = 42;
      const generated: StepState[] = [];

      let low = 0;
      let high = arr.length - 1;

      generated.push({
        array: [...arr],
        pointers: { Low: low, High: high },
        activeIndices: [],
        sortedIndices: [],
        explanation: `Search target ${target} in sorted array of ${arr.length} elements.`,
      });

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const val = arr[mid];

        if (val === target) {
          generated.push({
            array: [...arr],
            pointers: { Low: low, Mid: mid, High: high },
            activeIndices: [mid],
            sortedIndices: [mid],
            explanation: `MATCH FOUND! Target ${target} located at index ${mid} in log₂(N) steps!`,
          });
          break;
        } else if (val < target) {
          generated.push({
            array: [...arr],
            pointers: { Low: low, Mid: mid, High: high },
            activeIndices: [mid],
            sortedIndices: [],
            explanation: `arr[Mid] = ${val} < ${target}. Eliminate left half [${low}..${mid}]. Move Low to ${mid + 1}.`,
          });
          low = mid + 1;
        } else {
          generated.push({
            array: [...arr],
            pointers: { Low: low, Mid: mid, High: high },
            activeIndices: [mid],
            sortedIndices: [],
            explanation: `arr[Mid] = ${val} > ${target}. Eliminate right half [${mid}..${high}]. Move High to ${mid - 1}.`,
          });
          high = mid - 1;
        }
      }
      setSteps(generated);
      setStepIndex(0);
    } else if (algo === "sorting") {
      const arr = [45, 12, 89, 34, 67, 23];
      const generated: StepState[] = [];
      const temp = [...arr];

      generated.push({
        array: [...temp],
        pointers: {},
        activeIndices: [],
        sortedIndices: [],
        explanation: "Unsorted initial array. Preparing Bubble Sort pass.",
      });

      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < temp.length - i - 1; j++) {
          const swapNeeded = temp[j] > temp[j + 1];
          generated.push({
            array: [...temp],
            pointers: { J: j, J1: j + 1 },
            activeIndices: [j, j + 1],
            sortedIndices: Array.from({ length: i }, (_, idx) => temp.length - 1 - idx),
            explanation: `Comparing arr[${j}] (${temp[j]}) with arr[${j + 1}] (${temp[j + 1]}). ${
              swapNeeded ? "Swap needed!" : "Already in order."
            }`,
          });

          if (swapNeeded) {
            const t = temp[j];
            temp[j] = temp[j + 1];
            temp[j + 1] = t;

            generated.push({
              array: [...temp],
              pointers: { J: j, J1: j + 1 },
              activeIndices: [j, j + 1],
              sortedIndices: Array.from({ length: i }, (_, idx) => temp.length - 1 - idx),
              explanation: `Swapped! ${temp[j + 1]} moved right.`,
            });
          }
        }
      }

      generated.push({
        array: [...temp],
        pointers: {},
        activeIndices: [],
        sortedIndices: temp.map((_, idx) => idx),
        explanation: "Sorting complete! All elements are in non-decreasing order.",
      });

      setSteps(generated);
      setStepIndex(0);
    }
  }, [algo]);

  // Autoplay timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && steps.length > 0) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps, speed]);

  const currentStep = steps[stepIndex] || {
    array: [1, 2, 3],
    pointers: {},
    activeIndices: [],
    sortedIndices: [],
    explanation: "Loading...",
  };

  const maxVal = Math.max(...currentStep.array, 100);

  return (
    <div className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl p-5 text-white shadow-2xl">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[#2A2A2A] pb-4">
        <div>
          <div className="text-[10px] font-bold text-[#E44D26] uppercase tracking-[0.2em] mb-1">Interactive Learning Engine</div>
          <div className="font-display font-black text-xl text-white uppercase">ALGORITHM VISUALIZER</div>
        </div>

        {/* Algo Selector */}
        <div className="flex gap-1.5 bg-[#1A1A1A] p-1 rounded-xl border border-[#2A2A2A]">
          {(
            [
              { id: "two-pointers", label: "Two Pointers" },
              { id: "binary-search", label: "Binary Search" },
              { id: "sorting", label: "Bubble Sort" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setAlgo(item.id);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                algo === item.id ? "bg-[#E44D26] text-white shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Array Bars Visualization Canvas */}
      <div className="bg-[#141414] rounded-xl p-6 mb-4 min-h-[220px] flex flex-col justify-end items-center relative overflow-hidden border border-[#2A2A2A]">
        {/* Step indicator tag */}
        <div className="absolute top-3 left-4 flex items-center gap-2 text-[11px] font-mono text-white/50">
          <span>
            Step {stepIndex + 1} of {steps.length}
          </span>
        </div>

        {/* Animated Bar Chart */}
        <div className="flex items-end justify-center gap-3 w-full h-40 pt-6">
          {currentStep.array.map((val, idx) => {
            const isActive = currentStep.activeIndices.includes(idx);
            const isSorted = currentStep.sortedIndices.includes(idx);

            let barBg = "bg-[#2A2A2A]";
            let textColor = "text-white/60";

            if (isSorted) {
              barBg = "bg-[#1E7A4E]";
              textColor = "text-[#28C840]";
            } else if (isActive) {
              barBg = "bg-[#E44D26]";
              textColor = "text-[#E44D26]";
            }

            // Height percentage
            const heightPct = Math.max(25, (val / maxVal) * 100);

            return (
              <div key={idx} className="flex flex-col items-center flex-1 max-w-[50px] transition-all duration-300">
                {/* Pointer tags overhead */}
                <div className="h-6 flex flex-col justify-end text-[10px] font-mono font-bold text-center mb-1">
                  {Object.entries(currentStep.pointers)
                    .filter(([_, ptrIdx]) => ptrIdx === idx)
                    .map(([ptrName]) => (
                      <span key={ptrName} className="text-[#FFCB6B] animate-pulse">
                        ↓ {ptrName}
                      </span>
                    ))}
                </div>

                {/* Animated bar element */}
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${barBg} flex items-center justify-center font-mono text-xs font-bold text-white shadow-lg`}
                  style={{ height: `${heightPct}%` }}
                >
                  {val}
                </div>

                <span className={`text-[10px] font-mono mt-2 ${textColor}`}>[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Explanation Banner */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#E44D26] uppercase tracking-widest mb-1">
          <span className="w-2 h-2 rounded-full bg-[#E44D26] animate-ping"></span>
          Execution State
        </div>
        <p className="font-mono text-xs text-white/90 leading-relaxed">{currentStep.explanation}</p>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(0);
            }}
            className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-xs font-semibold text-white/80 hover:text-white hover:border-[#3A3A3A] transition-colors"
          >
            Reset ↺
          </button>

          <button
            onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
            disabled={stepIndex === 0}
            className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-xs font-semibold text-white/80 hover:text-white disabled:opacity-30 transition-colors"
          >
            ← Prev
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-1.5 bg-[#E44D26] text-white rounded-lg text-xs font-bold hover:bg-[#C93D18] transition-colors flex items-center gap-1.5 shadow-md"
          >
            {isPlaying ? "Pause ⏸" : "Play ▶"}
          </button>

          <button
            onClick={() => setStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
            disabled={stepIndex >= steps.length - 1}
            className="px-3 py-1.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-xs font-semibold text-white/80 hover:text-white disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Speed Slider */}
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span>Speed:</span>
          {[
            { label: "0.5x", val: 1500 },
            { label: "1x", val: 1000 },
            { label: "2x", val: 500 },
          ].map((s) => (
            <button
              key={s.label}
              onClick={() => setSpeed(s.val)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                speed === s.val ? "bg-[#E44D26] text-white font-bold" : "bg-[#1A1A1A] text-white/60 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
