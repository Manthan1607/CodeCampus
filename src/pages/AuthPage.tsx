import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiAuth } from "../services/api";

export default function AuthPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const isSignup = params.get("mode") === "signup";
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(isSignup ? "signup" : "login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("IIT Delhi");
  const [role, setRole] = useState<"student" | "mentor" | "recruiter">("student");
  const [submitted, setSubmitted] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "forgot") {
      setSubmitted(true);
      return;
    }
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await apiAuth.register(name || "New Developer", email, password, role, college);
        if (res && res.user) {
          login(
            {
              id: res.user.id,
              name: res.user.name,
              email: res.user.email,
              role,
              college: res.user.college,
              avatar: res.user.avatar,
            },
            res.token
          );
        } else {
          login({ name: name || "New Developer", email, role, college });
        }
        setLoading(false);
        navigate("/onboarding");
        return;
      } else {
        const res = await apiAuth.login(email, password).catch(() => null);
        if (res && res.user) {
          login(
            {
              id: res.user.id,
              name: res.user.name,
              email: res.user.email,
              role: res.user.role as any,
              college: res.user.college,
              avatar: res.user.avatar,
            },
            res.token
          );
        } else {
          const initials = (email.split("@")[0] || "US").slice(0, 2).toUpperCase();
          login({ name: email.split("@")[0].replace(".", " ") || "Developer", email, role, avatar: initials });
        }
        setLoading(false);
        navigate(`/dashboard/${role}`);
        return;
      }
    } catch (err) {
      // Fallback
      login({ name: name || email.split("@")[0] || "Developer", email, role, college });
      setLoading(false);
      navigate(`/dashboard/${role}`);
    }
  };

  const handleGoogleSelect = async (gEmail: string, gName: string) => {
    setShowGoogleModal(false);
    setLoading(true);
    await loginWithGoogle(gEmail, gName);
    setLoading(false);
    navigate(`/dashboard/${role}`);
  };

  const codeSnippets = [
    { lang: "Python", code: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target-n in seen:\n            return [seen[target-n], i]\n        seen[n] = i` },
    { lang: "JavaScript", code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n}` },
  ];
  const [activeSnippet] = useState(0);

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D0D0D] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 font-display font-black text-[180px] leading-none text-white flex items-center justify-end pr-8">
            CC
          </div>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 bg-[#E44D26] rounded-sm flex items-center justify-center">
            <span className="text-white font-display font-black text-sm">CC</span>
          </div>
          <span className="font-display font-black text-white text-xl tracking-tight uppercase">CodeCampus</span>
        </Link>

        {/* Center content */}
        <div className="relative z-10">
          <div className="text-[10px] tracking-[0.2em] font-semibold text-[#E44D26] mb-4 uppercase">Your coding journey starts here</div>
          <h2 className="font-display font-black text-5xl text-white uppercase leading-tight mb-6">
            WRITE CODE.<br/>
            WIN BATTLES.<br/>
            <span className="text-[#E44D26]">GET HIRED.</span>
          </h2>

          {/* Code snippet */}
          <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#2A2A2A]">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#2A2A2A]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
              </div>
              <span className="text-[11px] text-white/40 font-mono">{codeSnippets[activeSnippet].lang}</span>
            </div>
            <pre className="p-4 font-mono text-[12px] text-[#EEFFFF] leading-relaxed overflow-x-auto">
              {codeSnippets[activeSnippet].code}
            </pre>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-8 relative z-10">
          {[
            { label: "STUDENTS", value: "10K+" },
            { label: "PROBLEMS", value: "1K+" },
            { label: "BATTLES TODAY", value: "342" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display font-black text-white text-2xl">{s.value}</div>
              <div className="text-[10px] text-white/30 tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-[#E44D26] rounded-sm flex items-center justify-center">
              <span className="text-white font-display font-black text-xs">CC</span>
            </div>
            <span className="font-display font-black text-[#0D0D0D] text-lg tracking-tight uppercase">CodeCampus</span>
          </Link>

          {mode === "forgot" ? (
            <>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#EDFBF3] flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E7A4E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h2 className="font-display font-black text-2xl text-[#0D0D0D] uppercase mb-2">Check Your Email</h2>
                  <p className="text-[#68665F] text-sm mb-6">We sent a reset link to {email}</p>
                  <button onClick={() => { setMode("login"); setSubmitted(false); }} className="text-sm font-semibold text-[#E44D26] hover:underline">
                    Back to login
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h1 className="font-display font-black text-3xl text-[#0D0D0D] uppercase mb-2">Reset Password</h1>
                    <p className="text-[#68665F] text-sm">Enter your email and we'll send a reset link.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-[11px] tracking-widest font-semibold text-[#68665F] block mb-2 uppercase">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] bg-white text-[#0D0D0D] text-sm focus:outline-none focus:border-[#0D0D0D] transition-colors"
                        placeholder="priya@example.com"
                      />
                    </div>
                    <button type="submit" className="w-full bg-[#0D0D0D] text-white py-3 rounded-xl font-semibold text-sm tracking-wide hover:bg-[#E44D26] transition-colors">
                      SEND RESET LINK
                    </button>
                    <button type="button" onClick={() => setMode("login")} className="text-sm text-[#68665F] hover:text-[#0D0D0D] text-center">
                      ← Back to login
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="font-display font-black text-3xl text-[#0D0D0D] uppercase mb-2">
                  {mode === "login" ? "Welcome Back" : "Join CodeCampus"}
                </h1>
                <p className="text-[#68665F] text-sm">
                  {mode === "login" ? "Continue your coding journey." : "Create your free account today."}
                </p>
              </div>

              {/* OAuth */}
              <div className="flex gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#DDDBD5] rounded-xl text-sm font-medium text-[#0D0D0D] hover:bg-[#F0EFE9] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleGoogleSelect("github.user@github.com", "GitHub Developer")}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#DDDBD5] rounded-xl text-sm font-medium text-[#0D0D0D] hover:bg-[#F0EFE9] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Google OAuth Modal */}
              {showGoogleModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                  <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-[#DDDBD5] shadow-2xl">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0EFE9]">
                      <div className="flex items-center gap-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        <span className="font-semibold text-sm text-[#0D0D0D]">Sign in with Google</span>
                      </div>
                      <button onClick={() => setShowGoogleModal(false)} className="text-[#A09E98] hover:text-[#0D0D0D]">✕</button>
                    </div>

                    <p className="text-xs text-[#68665F] mb-4">Choose an account to continue to CodeCampus</p>

                    <div className="flex flex-col gap-2">
                      {[
                        { name: "Priya Sharma", email: "priya.sharma.dev@gmail.com", avatar: "PS" },
                        { name: "Manthan Mandavkar", email: "manthan.dev@gmail.com", avatar: "MM" },
                        { name: "Alex Chen", email: "alex.chen.coder@gmail.com", avatar: "AC" },
                      ].map((acc) => (
                        <button
                          key={acc.email}
                          onClick={() => handleGoogleSelect(acc.email, acc.name)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-[#F0EFE9] hover:bg-[#F7F6F3] transition-colors text-left"
                        >
                          <div className="w-9 h-9 rounded-full bg-[#E44D26] text-white flex items-center justify-center text-xs font-bold">
                            {acc.avatar}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#0D0D0D]">{acc.name}</div>
                            <div className="text-[10px] text-[#A09E98]">{acc.email}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-[#DDDBD5]"></div>
                <span className="text-[11px] text-[#A09E98] uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-[#DDDBD5]"></div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {mode === "signup" && (
                  <div>
                    <label className="text-[11px] tracking-widest font-semibold text-[#68665F] block mb-2 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] bg-white text-[#0D0D0D] text-sm focus:outline-none focus:border-[#0D0D0D] transition-colors"
                      placeholder="Priya Sharma"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[11px] tracking-widest font-semibold text-[#68665F] block mb-2 uppercase">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] bg-white text-[#0D0D0D] text-sm focus:outline-none focus:border-[#0D0D0D] transition-colors"
                    placeholder="priya@example.com"
                  />
                </div>

                <div>
                  <label className="text-[11px] tracking-widest font-semibold text-[#68665F] block mb-2 uppercase">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#DDDBD5] bg-white text-[#0D0D0D] text-sm focus:outline-none focus:border-[#0D0D0D] transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="text-[11px] tracking-widest font-semibold text-[#68665F] block mb-2 uppercase">I am a</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["student", "mentor", "recruiter"] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`py-2 rounded-xl border text-xs font-semibold capitalize transition-colors ${
                            role === r ? "border-[#0D0D0D] bg-[#0D0D0D] text-white" : "border-[#DDDBD5] text-[#68665F] hover:border-[#0D0D0D]"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mode === "login" && (
                  <button type="button" onClick={() => setMode("forgot")} className="text-right text-xs text-[#68665F] hover:text-[#E44D26] transition-colors -mt-2">
                    Forgot password?
                  </button>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E44D26] text-white py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:bg-[#C93D18] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round"/>
                      </svg>
                      {mode === "login" ? "SIGNING IN..." : "CREATING ACCOUNT..."}
                    </>
                  ) : (
                    mode === "login" ? "SIGN IN" : "CREATE ACCOUNT"
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-[#68665F] mt-6">
                {mode === "login" ? (
                  <>Don't have an account?{" "}
                    <button onClick={() => setMode("signup")} className="font-semibold text-[#0D0D0D] hover:text-[#E44D26]">Sign up free</button>
                  </>
                ) : (
                  <>Already have an account?{" "}
                    <button onClick={() => setMode("login")} className="font-semibold text-[#0D0D0D] hover:text-[#E44D26]">Sign in</button>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
