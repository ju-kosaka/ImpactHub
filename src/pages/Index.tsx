import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { KPIChart } from "@/components/dashboard/KPIChart";
import { ReleaseItems } from "@/components/dashboard/ReleaseItems";
import { TestingDiagrams } from "@/components/dashboard/TestingDiagrams";
import { UpcomingTasks } from "@/components/dashboard/UpcomingTasks";
import { ReleaseCalendar } from "@/components/dashboard/ReleaseCalendar";

import ceoIcon from "@/assets/ceo-icon.jpg";
import testEngineersIcon from "@/assets/test-engineers-icon.jpg";
import devTeamIcon from "@/assets/dev-team-icon.jpg";

const Index = () => {
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
            <img 
              src={ceoIcon} 
              alt="CEO" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="ml-20">
            <h2 className="text-2xl font-bold text-dashboard-primary mb-6">Executive Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProjectForm />
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
              <ReleaseItems />
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
              <UpcomingTasks />
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