import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import OnboardingPage from "./pages/OnboardingPage";
import StudentDashboard from "./pages/StudentDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import IDEPage from "./pages/IDEPage";
import DSARoadmap from "./pages/DSARoadmap";
import BattlesPage from "./pages/BattlesPage";
import ReelsPage from "./pages/ReelsPage";
import ProfilePage from "./pages/ProfilePage";
import RecruiterSearch from "./pages/RecruiterSearch";
import NotificationsPage from "./pages/NotificationsPage";
import LearnAnimatedPage from "./pages/LearnAnimatedPage";
import CollegeContestsPage from "./pages/CollegeContestsPage";
import MockInterviewPage from "./pages/MockInterviewPage";
import CollaboratePage from "./pages/CollaboratePage";
import PortfolioAnalyzerPage from "./pages/PortfolioAnalyzerPage";
import PodcastPage from "./pages/PodcastPage";
import LeaguesPage from "./pages/LeaguesPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/mentor" element={<MentorDashboard />} />
        <Route path="/dashboard/recruiter" element={<RecruiterDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/ide/:problemId" element={<IDEPage />} />
        <Route path="/dsa" element={<DSARoadmap />} />
        <Route path="/learn-animated" element={<LearnAnimatedPage />} />
        <Route path="/colleges/contests" element={<CollegeContestsPage />} />
        <Route path="/interview/mock" element={<MockInterviewPage />} />
        <Route path="/collaborate" element={<CollaboratePage />} />
        <Route path="/portfolio/analyzer" element={<PortfolioAnalyzerPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/leaderboard/leagues" element={<LeaguesPage />} />
        <Route path="/battles" element={<BattlesPage />} />
        <Route path="/reels" element={<ReelsPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/recruiter/search" element={<RecruiterSearch />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
