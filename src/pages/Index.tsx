import { useState, useEffect, useCallback } from "react";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { KPIChart } from "@/components/dashboard/KPIChart";
import { ReleaseItems } from "@/components/dashboard/ReleaseItems";
import { TestingDiagrams } from "@/components/dashboard/TestingDiagrams";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { ReleaseCalendar } from "@/components/dashboard/ReleaseCalendar";
import { toast } from "sonner";
import { getDevLoadValue } from "@/lib/utils"; // ★ 作成したヘルパー関数をインポート

import ceoIcon from "@/assets/ceo-icon.jpg";
import testEngineersIcon from "@/assets/test-engineers-icon.jpg";
import devTeamIcon from "@/assets/dev-team-icon.jpg";

// ★ プロジェクトデータの型にimpactScoreを追加
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
  impactScore?: number; // Impact Scoreプロパティを追加
};

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalImpactScore, setTotalImpactScore] = useState(0); // ★ 合計スコア用の状態

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const endpoint = 'https://am1eyikcm5.execute-api.us-west-2.amazonaws.com/prod/projects';
      const response = await fetch(endpoint);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch projects');
      }
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // ★ ここからが計算とソートのロジック
        const projectsWithScores = data.map(project => {
          const bizImpact = parseFloat(project.bizImpact) || 0;
          const devLoad = getDevLoadValue(project.devLoad);
          const impactScore = devLoad > 0 ? bizImpact / devLoad : 0;
          return { ...project, impactScore };
        });

        // Impact Scoreの降順（大きい順）でソート
        projectsWithScores.sort((a, b) => (b.impactScore ?? 0) - (a.impactScore ?? 0));
        
        // 合計Impact Scoreを計算
        const totalScore = projectsWithScores.reduce((sum, project) => sum + (project.impactScore ?? 0), 0);

        setProjects(projectsWithScores);
        setTotalImpactScore(totalScore);
        // ★ ここまで
      } else {
        console.error("API did not return an array:", data);
        setProjects([]);
        setTotalImpactScore(0);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error(`Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setProjects([]);
      setTotalImpactScore(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="min-h-screen bg-background">
      {/* ... Header, Top Section, Middle Sectionは変更なし ... */}
      <header className="bg-gradient-primary shadow-dashboard border-b border-dashboard-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-white">Project Management Dashboard</h1>
          <p className="text-white/80 mt-2">Monitor your projects, releases, and team performance</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
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
              {/* ★ 合計スコアをコンポーネントに渡す */}
              <UpcomingTasks 
                projects={projects} 
                isLoading={isLoading}
                totalImpactScore={totalImpactScore}
              />
              <ReleaseCalendar />
            </div>
          </div>
        </section>
      </main>

      {/* ... Footerは変更なし ... */}
       <footer className="bg-dashboard-primary text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 Project Management Dashboard. Built for efficient team collaboration.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
