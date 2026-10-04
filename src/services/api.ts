const API_BASE = "http://localhost:5000/api";

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const token = localStorage.getItem("token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options?.headers as Record<string, string>),
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(errData.error || `API request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[API Notice] Fallback for ${endpoint}:`, err);
    throw err;
  }
}

// Auth API
export const apiAuth = {
  login: (email: string, password: string) =>
    apiRequest<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (name: string, email: string, password: string, role?: string, college?: string) =>
    apiRequest<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role, college }),
    }),
  getMe: () => apiRequest<{ user: any }>("/auth/me"),
};

// Problems API
export const apiProblems = {
  getAll: () => apiRequest<{ problems: any[] }>("/problems"),
  getById: (id: number | string) => apiRequest<{ problem: any }>(`/problems/${id}`),
  runCode: (id: number | string, code: string, language: string) =>
    apiRequest<{ verdict: string; output: string; runtime: string; memory: string }>({
      endpoint: `/problems/${id}/run`,
    } as any).catch(() => null),
  submitCode: (id: number | string, code: string, language: string, userId?: string) =>
    apiRequest<{ verdict: string; output: string; xpGained: number }>(`/problems/${id}/submit`, {
      method: "POST",
      body: JSON.stringify({ code, language, userId }),
    }),
};

// Users & Leaderboard API
export const apiUsers = {
  getLeaderboard: () => apiRequest<{ leaderboard: any[] }>("/users/leaderboard"),
  getColleges: () => apiRequest<{ colleges: any[] }>("/users/colleges"),
  getStudents: (query: string = "") => apiRequest<{ students: any[] }>(`/users/students?q=${encodeURIComponent(query)}`),
  getUserProfile: (id: string) => apiRequest<{ user: any }>(`/users/${id}`),
};

// Reels API
export const apiReels = {
  getAll: () => apiRequest<{ reels: any[] }>("/reels"),
  likeReel: (id: number) => apiRequest<{ reel: any }>(`/reels/${id}/like`, { method: "POST" }),
};

// AI Tutor API
export const apiAi = {
  askTutor: (problemTitle: string, prompt: string, code: string) =>
    apiRequest<{ reply: string }>("/ai/tutor", {
      method: "POST",
      body: JSON.stringify({ problemTitle, prompt, code }),
    }),
};
