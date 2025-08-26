import { useState } from "react"; // ★ useStateをインポート
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp, Zap, BrainCircuit } from "lucide-react"; // ★ BrainCircuitアイコンを追加
import { Project } from "@/pages/Index";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // ★ Buttonをインポート
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"; // ★ Dialog関連をインポート
import { toast } from "sonner"; // ★ toastをインポート

// ★ propsの型に全プロジェクトリストを追加
export function UpcomingTasks({ allProjects, projects, isLoading, totalImpactScore, totalDevLoad }: { allProjects: Project[]; projects: Project[]; isLoading: boolean; totalImpactScore: number; totalDevLoad: number; }) {

  // ★ AI提案用の状態管理
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ★ AIに提案を依頼する関数
  const handleSuggestionClick = async (targetItemId: string) => {
    setIsModalOpen(true);
    setIsSuggestionLoading(true);
    setSuggestion(null);

    try {
      const endpoint = `https://am1eyikcm5.execute-api.us-west-2.amazonaws.com/prod/projects/${targetItemId}/suggest-split`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projects: allProjects, // 現在の全プロジェクトリストを送信
          targetItemId: targetItemId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get suggestion from AI coach.");
      }

      const result = await response.json();
      setSuggestion(result.suggestion);

    } catch (error) {
      console.error("Error getting suggestion:", error);
      toast.error(error instanceof Error ? error.message : "An unknown error occurred.");
      setSuggestion("提案の取得中にエラーが発生しました。しばらくしてから再度お試しください。");
    } finally {
      setIsSuggestionLoading(false);
    }
  };


  return (
    <>
      <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-dashboard-primary">Upcoming Tasks</CardTitle>
            {!isLoading && projects.length > 0 && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm font-bold text-dashboard-primary">
                  <Zap className="h-4 w-4 mr-1" />
                  Total Dev Load: {totalDevLoad}
                </div>
                <div className="flex items-center text-sm font-bold text-dashboard-accent">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Total Impact: {totalImpactScore.toFixed(1)}
                </div>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="p-4 border border-dashboard-border rounded-lg space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <div className="flex space-x-4">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))
            ) : projects.length > 0 ? (
              projects.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "p-4 border border-dashboard-border rounded-lg transition-colors relative", // ★ relativeを追加
                    task.isBeyondVelocity 
                      ? "bg-gray-200 text-gray-500"
                      : "hover:bg-gray-50"
                  )}
                >
                  {/* ★ Velocity超過時にAI提案ボタンを表示 */}
                  {task.isBeyondVelocity && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/50 hover:bg-white"
                      onClick={() => handleSuggestionClick(task.id)}
                    >
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      AIに分割案を相談
                    </Button>
                  )}

                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-dashboard-primary">{task.title}</h4>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Impact: {task.impactScore?.toFixed(1) ?? 'N/A'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-dashboard-gray">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>DevLoad: {task.devLoad}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-dashboard-gray text-center py-4">No upcoming tasks.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ★ AI提案表示用モーダル */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <BrainCircuit className="h-6 w-6 mr-2 text-dashboard-accent"/>
              AIアジャイルコーチからの提案
            </DialogTitle>
            <DialogDescription>
              ベロシティを超過するアイテムについて、価値を最大化するための分割案です。
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm max-w-none max-h-[60vh] overflow-y-auto">
            {isSuggestionLoading ? (
              <div className="flex items-center justify-center p-8">
                <p>分析中です...</p>
              </div>
            ) : (
              // 改行を<br>に変換して表示
              suggestion && suggestion.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)}>閉じる</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
