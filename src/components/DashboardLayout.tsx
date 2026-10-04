import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  badge?: number;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "student" | "mentor" | "recruiter" | "admin";
}

const icons = {
  home: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  code: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  swords: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/></svg>,
  video: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>,
  user: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  chart: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  search: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  bell: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  map: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
};

const roleNavItems: Record<string, NavItem[]> = {
  student: [
    { icon: icons.home, label: "Dashboard", path: "/dashboard/student" },
    { icon: icons.map, label: "DSA Roadmap", path: "/dsa" },
    { icon: icons.code, label: "Problems", path: "/ide/1" },
    { icon: icons.swords, label: "Battles", path: "/battles" },
    { icon: icons.video, label: "Reels", path: "/reels" },
    { icon: icons.user, label: "Profile", path: "/profile/1" },
    { icon: icons.bell, label: "Notifications", path: "/notifications", badge: 3 },
  ],
  mentor: [
    { icon: icons.home, label: "Dashboard", path: "/dashboard/mentor" },
    { icon: icons.users, label: "Mentees", path: "/dashboard/mentor" },
    { icon: icons.chart, label: "Analytics", path: "/notifications" },
    { icon: icons.bell, label: "Notifications", path: "/notifications", badge: 2 },
  ],
  recruiter: [
    { icon: icons.home, label: "Dashboard", path: "/dashboard/recruiter" },
    { icon: icons.search, label: "Talent Search", path: "/recruiter/search" },
    { icon: icons.chart, label: "Analytics", path: "/notifications" },
    { icon: icons.bell, label: "Notifications", path: "/notifications" },
  ],
  admin: [
    { icon: icons.home, label: "Dashboard", path: "/dashboard/admin" },
    { icon: icons.users, label: "Users", path: "/dashboard/admin" },
    { icon: icons.chart, label: "Analytics", path: "/notifications" },
    { icon: icons.settings, label: "Settings", path: "/dashboard/admin" },
  ],
};

export default function DashboardLayout({ children, role = "student" }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navItems = roleNavItems[role];

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      <Navbar variant="app" role={role} />

      <div className="flex flex-1 pt-14">
        {/* Sidebar */}
        <aside
          className={`hidden md:flex flex-col fixed left-0 top-14 bottom-0 bg-white border-r border-[#DDDBD5] transition-all duration-300 z-30 ${
            collapsed ? "w-14" : "w-56"
          }`}
        >
          <nav className="flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg mb-0.5 transition-colors relative group ${
                    active
                      ? "bg-[#0D0D0D] text-white"
                      : "text-[#68665F] hover:bg-[#F0EFE9] hover:text-[#0D0D0D]"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium truncate">{item.label}</span>
                  )}
                  {item.badge && !collapsed && (
                    <span className="ml-auto bg-[#E44D26] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                  {collapsed && (
                    <span className="absolute left-full ml-2 bg-[#0D0D0D] text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-[#DDDBD5]">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center p-2 rounded-lg text-[#A09E98] hover:text-[#0D0D0D] hover:bg-[#F0EFE9] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {collapsed
                  ? <><polyline points="9 18 15 12 9 6"/></>
                  : <><polyline points="15 18 9 12 15 6"/></>
                }
              </svg>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            collapsed ? "md:ml-14" : "md:ml-56"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
