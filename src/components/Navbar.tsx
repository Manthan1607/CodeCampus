import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import { soundFx } from "../utils/audio";

type NavbarVariant = "landing" | "app";

interface NavbarProps {
  variant?: NavbarVariant;
  role?: "student" | "mentor" | "recruiter" | "admin";
}

export default function Navbar({ variant = "landing", role = "student" }: NavbarProps) {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const dashboardPath = role === "student" ? "/dashboard/student"
    : role === "mentor" ? "/dashboard/mentor"
    : role === "recruiter" ? "/dashboard/recruiter"
    : "/dashboard/admin";

  const handleNavClick = () => {
    soundFx.playClick();
  };

  if (variant === "app") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#F7F6F3]/90 backdrop-blur-md border-b border-[#DDDBD5] shadow-xs">
        <div className="flex items-center justify-between px-6 h-15">
          <Link to="/" onClick={handleNavClick}>
            <Logo size="md" variant="light" />
          </Link>

          {/* Animated Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 border border-[#DDDBD5] rounded-full p-1 shadow-xs backdrop-blur-sm">
            {[
              { label: "Dashboard", path: dashboardPath },
              { label: "Story Learning", path: "/learn-animated" },
              { label: "Mock Interview", path: "/interview/mock" },
              { label: "ATS Scanner", path: "/portfolio/analyzer" },
              { label: "AI Podcast", path: "/podcast" },
              { label: "Leagues", path: "/leaderboard/leagues" },
              { label: "Pair Code", path: "/collaborate" },
              { label: "College League", path: "/colleges/contests" },
              { label: "Battles", path: "/battles" },
              { label: "Reels", path: "/reels" },
            ].map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={handleNavClick}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-[#0D0D0D] text-white shadow-md scale-[1.02]"
                      : "text-[#68665F] hover:text-[#0D0D0D] hover:bg-[#F0EFE9]"
                  }`}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-[#E44D26] rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/notifications"
              onClick={handleNavClick}
              className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#DDDBD5] hover:bg-[#F0EFE9] transition-colors shadow-xs"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D0D0D]">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E44D26] rounded-full animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E44D26] rounded-full"></span>
            </Link>

            <Link
              to="/profile/1"
              onClick={handleNavClick}
              title={user.name}
              className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white border border-[#DDDBD5] hover:border-[#0D0D0D] transition-all shadow-xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#0D0D0D] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {user.avatar || "MM"}
              </div>
              <span className="text-xs font-bold text-[#0D0D0D] hidden lg:block">{user.name.split(" ")[0]}</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D0D0D]/95 backdrop-blur-md shadow-xl border-b border-white/10 py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
          <Link to="/" onClick={handleNavClick}>
            <Logo size="lg" variant="dark" />
          </Link>

          {/* Landing Header Navigation (Crisp High-Contrast White Text) */}
          <nav className="hidden md:flex items-center gap-8 bg-white/90 border border-white/20 px-7 py-2.5 rounded-full shadow-lg backdrop-blur-md">
            {[
              { label: "LEARN", path: "/learn-animated" },
              { label: "COLLEGES", path: "/colleges/contests" },
              { label: "COMPETE", path: "/battles" },
              { label: "REELS", path: "/reels" },
            ].map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                onClick={handleNavClick}
                className="text-xs tracking-[0.15em] font-black text-[#0D0D0D] hover:text-[#E44D26] transition-colors uppercase font-mono"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/auth"
              onClick={handleNavClick}
              className="hidden md:block text-xs font-mono font-bold text-white hover:text-[#E44D26] transition-colors tracking-wider uppercase px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md"
            >
              LOG IN
            </Link>
            <Link
              to="/auth?mode=signup"
              onClick={handleNavClick}
              className="bg-[#E44D26] text-white text-xs font-mono font-bold px-6 py-2.5 rounded-full hover:bg-white hover:text-[#0D0D0D] transition-all tracking-wider uppercase shadow-xl border border-white/20"
            >
              GET STARTED
            </Link>
            <button
              onClick={() => {
                handleNavClick();
                setMobileOpen(!mobileOpen);
              }}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 bg-white/10 border border-white/20 rounded-xl"
            >
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-1" : ""}`}></span>
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`}></span>
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-lg transition-transform duration-500 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-white p-6">
          <Logo size="lg" variant="dark" className="mb-4" />
          {[
            { label: "LEARN", path: "/learn-animated" },
            { label: "COLLEGES", path: "/colleges/contests" },
            { label: "COMPETE", path: "/battles" },
            { label: "REELS", path: "/reels" },
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => {
                handleNavClick();
                setMobileOpen(false);
              }}
              className="text-2xl font-black font-display tracking-widest text-white hover:text-[#E44D26] uppercase"
            >
              {label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 w-full max-w-xs pt-4">
            <Link
              to="/auth"
              onClick={() => {
                handleNavClick();
                setMobileOpen(false);
              }}
              className="w-full text-center bg-white/10 text-white font-mono font-bold py-3 rounded-full border border-white/20 uppercase"
            >
              LOG IN
            </Link>
            <Link
              to="/auth?mode=signup"
              onClick={() => {
                handleNavClick();
                setMobileOpen(false);
              }}
              className="w-full text-center bg-[#E44D26] text-white font-mono font-bold py-3 rounded-full uppercase"
            >
              GET STARTED
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
