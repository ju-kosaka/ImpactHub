import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react"; // ★ 変更点: ローディングアイコンをインポート
import { toast } from "sonner"; // ★ 変更点: 通知（トースト）機能をインポート

// ★ 変更点: フォームの初期状態を定義
const initialProjectData = {
  title: "",
  summary: "",
  bizImpact: "",
  devLoad: "",
  releaseWindow: "",
  targetDate: "",
  latestStartDate: "",
  kpi: "",
};

export function ProjectForm({ onProjectCreated }: { onProjectCreated: () => void }) {
  const [projectData, setProjectData] = useState(initialProjectData);
  const [isSubmitting, setIsSubmitting] = useState(false); // ★ 変更点: 送信中の状態を管理

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // ★ 変更点: ボタンが押されたら送信中状態にする

    const endpoint = 'https://am1eyikcm5.execute-api.us-west-2.amazonaws.com/prod/projects';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      // ★ 変更点: 成功を通知し、フォームをリセット
      toast.success("Project created successfully!");
      setProjectData(initialProjectData);
      onProjectCreated(); // ★ 親コンポーネントから渡された関数を実行
      
    } catch (error) {
      console.error('Error submitting project:', error);
      // ★ 変更点: エラーを通知
      toast.error("Failed to create project. Please try again.");

    } finally {
      setIsSubmitting(false); // ★ 変更点: 成功・失敗に関わらず送信中状態を解除
    }
  };

  return (
    <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
      <CardHeader>
        <CardTitle className="text-dashboard-primary">New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ...フォームの入力欄（変更なし）... */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dashboard-primary border-b border-dashboard-border pb-2">
              Basic Information
            </h3>
            {/* ... */}
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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-dashboard-primary border-b border-dashboard-border pb-2">
              Evaluation & Planning Parameters
            </h3>
            {/* ... */}
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
                  <SelectTrigger id="devLoad" className="border-dashboard-border">
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
          
          {/* ★ 変更点: ボタンに送信中の状態を反映 */}
          <Button 
            type="submit" 
            className="w-full bg-dashboard-accent hover:bg-dashboard-accent/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
