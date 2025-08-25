import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProjectForm() {
  const [projectData, setProjectData] = useState({
    title: "",
    summary: "",
    bizImpact: "",
    devLoad: "",
    releaseWindow: "",
    targetDate: "",
    latestStartDate: "",
    kpi: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Project submitted:", projectData);
  };

  return (
    <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
      <CardHeader>
        <CardTitle className="text-dashboard-primary">New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dashboard-primary border-b border-dashboard-border pb-2">
              Basic Information
            </h3>
            <p className="text-sm text-dashboard-muted">
              This is the fundamental information to identify the project item.
            </p>
            
            <div>
              <Label htmlFor="title" className="text-dashboard-primary">Title</Label>
              <Input
                id="title"
                value={projectData.title}
                onChange={(e) => setProjectData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="The name of the project item"
                className="border-dashboard-border focus:ring-dashboard-accent"
              />
            </div>
            
            <div>
              <Label htmlFor="summary" className="text-dashboard-primary">Summary</Label>
              <Textarea
                id="summary"
                value={projectData.summary}
                onChange={(e) => setProjectData(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="A description of the project item's purpose and content"
                className="border-dashboard-border focus:ring-dashboard-accent h-20"
              />
            </div>
          </div>

          {/* Evaluation & Planning Parameters Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dashboard-primary border-b border-dashboard-border pb-2">
              Evaluation & Planning Parameters
            </h3>
            <p className="text-sm text-dashboard-muted">
              This information is used for calculating priority and for schedule management.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bizImpact" className="text-dashboard-primary">Biz Impact (Business Impact)</Label>
                <Input
                  id="bizImpact"
                  type="number"
                  value={projectData.bizImpact}
                  onChange={(e) => setProjectData(prev => ({ ...prev, bizImpact: e.target.value }))}
                  placeholder="Enter numerical value"
                  className="border-dashboard-border focus:ring-dashboard-accent"
                />
              </div>
              
              <div>
                <Label htmlFor="devLoad" className="text-dashboard-primary">Dev Load (Development Effort)</Label>
                <Select value={projectData.devLoad} onValueChange={(value) => setProjectData(prev => ({ ...prev, devLoad: value }))}>
                  <SelectTrigger className="border-dashboard-border">
                    <SelectValue placeholder="Select effort scale" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="XXL">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="releaseWindow" className="text-dashboard-primary">Release Window</Label>
                <Input
                  id="releaseWindow"
                  value={projectData.releaseWindow}
                  onChange={(e) => setProjectData(prev => ({ ...prev, releaseWindow: e.target.value }))}
                  placeholder="e.g., Q4 2025"
                  className="border-dashboard-border focus:ring-dashboard-accent"
                />
              </div>
              
              <div>
                <Label htmlFor="targetDate" className="text-dashboard-primary">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={projectData.targetDate}
                  onChange={(e) => setProjectData(prev => ({ ...prev, targetDate: e.target.value }))}
                  className="border-dashboard-border focus:ring-dashboard-accent"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="latestStartDate" className="text-dashboard-primary">Latest Start Date</Label>
              <Input
                id="latestStartDate"
                type="date"
                value={projectData.latestStartDate}
                onChange={(e) => setProjectData(prev => ({ ...prev, latestStartDate: e.target.value }))}
                className="border-dashboard-border focus:ring-dashboard-accent"
              />
            </div>
            
            <div>
              <Label htmlFor="kpi" className="text-dashboard-primary">KPI</Label>
              <Textarea
                id="kpi"
                value={projectData.kpi}
                onChange={(e) => setProjectData(prev => ({ ...prev, kpi: e.target.value }))}
                placeholder="Enter the metrics that will be used to measure the success of the project item"
                className="border-dashboard-border focus:ring-dashboard-accent h-16"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 text-white"
          >
            Create Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}