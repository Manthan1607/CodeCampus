import React, { useState, useEffect } from "react";
import { soundFx } from "../utils/audio";

interface AIVoiceAssistantProps {
  onRunCode?: () => void;
  onExplainCode?: () => void;
  onGiveHint?: () => void;
}

export default function AIVoiceAssistant({ onRunCode, onExplainCode, onGiveHint }: AIVoiceAssistantProps) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiSpeechText, setAiSpeechText] = useState("Click the mic and say 'Run Code' or 'Explain Problem'!");
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    const SpeechFunc = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechFunc) {
      setSpeechSupported(false);
    }
  }, []);

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleListen = () => {
    soundFx.playClick();
    const SpeechFunc = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechFunc) {
      setAiSpeechText("Voice recognition not supported in this browser. Try Chrome/Edge!");
      return;
    }

    if (listening) {
      setListening(false);
      return;
    }

    try {
      const recognition = new SpeechFunc();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setListening(true);
        setTranscript("Listening for command...");
      };

      recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript.toLowerCase();
        setTranscript(`You said: "${spoken}"`);
        setListening(false);

        if (spoken.includes("run") || spoken.includes("execute")) {
          const resp = "Executing code and running test cases now!";
          setAiSpeechText(resp);
          speakResponse(resp);
          if (onRunCode) onRunCode();
        } else if (spoken.includes("explain") || spoken.includes("solution")) {
          const resp = "The optimal solution uses a hash map to achieve linear O(N) time complexity!";
          setAiSpeechText(resp);
          speakResponse(resp);
          if (onExplainCode) onExplainCode();
        } else if (spoken.includes("hint") || spoken.includes("help")) {
          const resp = "Hint: Store elements in a hash map as you iterate through the array!";
          setAiSpeechText(resp);
          speakResponse(resp);
          if (onGiveHint) onGiveHint();
        } else {
          const resp = `Command recognized: "${spoken}". Ready for next voice instruction!`;
          setAiSpeechText(resp);
          speakResponse(resp);
        }
      };

      recognition.onerror = () => {
        setListening(false);
        setTranscript("Speech recognition ended. Try again!");
      };

      recognition.start();
    } catch (e) {
      setListening(false);
    }
  };

  return (
    <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-4 text-white shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E44D26] animate-ping"></span>
          <span className="text-xs font-mono font-bold uppercase text-[#E44D26]">AI VOICE CODING ASSISTANT</span>
        </div>
        <span className="text-[10px] font-mono text-white/50">HANDS-FREE IDE</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={handleToggleListen}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all shadow-lg flex-shrink-0 ${
            listening
              ? "bg-[#E44D26] text-white animate-bounce ring-4 ring-[#E44D26]/40"
              : "bg-white/10 text-white hover:bg-[#E44D26]"
          }`}
        >
          🎙️
        </button>

        <div className="flex-1 min-w-0">
          <div className="text-xs text-white/90 font-mono font-semibold truncate">
            {listening ? "🎙️ Listening to your voice..." : aiSpeechText}
          </div>
          <div className="text-[10px] text-white/40 font-mono truncate mt-0.5">
            {transcript || "Try saying: 'Run Code', 'Explain Solution', 'Give Hint'"}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {[
          { label: "🎙️ Run Code", action: () => { speakResponse("Running test cases"); if (onRunCode) onRunCode(); } },
          { label: "💡 Give Hint", action: () => { speakResponse("Here is a hint for Two Sum"); if (onGiveHint) onGiveHint(); } },
          { label: "📖 Explain Solution", action: () => { speakResponse("Explaining linear hash map solution"); if (onExplainCode) onExplainCode(); } },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={() => {
              soundFx.playClick();
              btn.action();
            }}
            className="text-[10px] font-mono font-semibold bg-white/5 hover:bg-white/15 text-white/80 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
