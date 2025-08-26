import { useState, useEffect, useCallback } from "react";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { KPIChart } from "@/components/dashboard/KPIChart";
import { ReleaseItems } from "@/components/dashboard/ReleaseItems";
import { TestingDiagrams } from "@/components/dashboard/TestingDiagrams";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { ReleaseCalendar } from "@/components/dashboard/ReleaseCalendar";
import { toast } from "sonner"; // ★ 通知機能を追加

import ceoIcon from "@/assets/ceo-icon.jpg";
import testEngineersIcon from "@/assets/test-engineers-icon.jpg";
import devTeamIcon from "@/assets/dev-team-icon.jpg";

// プロジェクトデータの型を定義
export type Project = {
  id: string;
  title: string;
  summary: string;
  bizImpact: string;
  devLoad: string;
  releaseWindow: string;
  targetDate: string;
  latestStartDate: string;
  kpi: string;
  createdAt: string;
};

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // APIからプロジェクトを取得する関数
  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = 'https://am1eyikcm5.execute-api.us-west-2.amazonaws.com/prod/projects';
      const response = await fetch(endpoint);

      if (!response.ok) {
        // ★ APIからの応答がエラーだった場合の処理を追加
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch projects');
      }

      const data = await response.json();
      
      // ★ APIの応答が配列であることを確認してから処理する
      if (Array.isArray(data)) {
        data.sort((a: Project, b: Project) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setProjects(data);
      } else {
        console.error("API did not return an array:", data);
        setProjects([]); // データが配列でない場合は空にする
      }

    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`); // ★ エラーを通知
      setProjects([]); // エラー発生時はプロジェクトを空にする
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ページ読み込み時にプロジェクトを取得
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-dashboard border-b border-dashboard-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white">Project Management Dashboard</h1>
          <p className="text-white/80 mt-2">Monitor your projects, releases, and team performance</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Top Section - Executive Overview */}
        <section className="relative">
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full overflow-hidden shadow-card border-4 border-white bg-white">
            <img src={ceoIcon} alt="CEO" className="w-full h-full object-cover" />
          </div>
          <div className="ml-20">
            <h2 className="text-2xl font-bold text-dashboard-primary mb-6">Executive Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProjectForm onProjectCreated={fetchProjects} />
              <KPIChart />
            </div>
          </div>
        </section>

        {/* Middle Section - Testing & Quality */}
        <section className="relative">
           <div className="absolute top-0 left-0 w-16 h-16 rounded-full overflow-hidden shadow-card border-4 border-white bg-white">
            <img 
              src={testEngineersIcon} 
              alt="Test Engineers" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-20">
            <h2 className="text-2xl font-bold text-dashboard-primary mb-6">Quality Assurance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ReleaseItems projects={projects} isLoading={isLoading} />
              <TestingDiagrams />
            </div>
          </div>
        </section>

        {/* Bottom Section - Development Planning */}
        <section className="relative">
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full overflow-hidden shadow-card border-4 border-white bg-white">
            <img 
              src={devTeamIcon} 
              alt="Development Team" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-20">
            <h2 className="text-2xl font-bold text-dashboard-primary mb-6">Development Planning</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <UpcomingTasks projects={projects} isLoading={isLoading} />
              <ReleaseCalendar />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dashboard-primary text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 Project Management Dashboard. Built for efficient team collaboration.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
