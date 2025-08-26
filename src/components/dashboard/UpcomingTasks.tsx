import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, TrendingUp } from "lucide-react"; // ★ TrendingUpアイコンを追加
import { Project } from "@/pages/Index";
import { Skeleton } from "@/components/ui/skeleton";

// ★ propsを受け取るように変更
export function UpcomingTasks({ projects, isLoading, totalImpactScore }: { projects: Project[]; isLoading: boolean; totalImpactScore: number; }) {
  return (
    <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-dashboard-primary">Upcoming Tasks</CardTitle>
          {/* ★ 合計Impact Scoreを表示 */}
          {!isLoading && projects.length > 0 && (
            <div className="flex items-center text-sm font-bold text-dashboard-accent">
              <TrendingUp className="h-4 w-4 mr-1" />
              Total Impact: {totalImpactScore.toFixed(1)}
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
            // ★ Impact Score順にソートされたデータを表示
            projects.map((task) => (
              <div
                key={task.id}
                className="p-4 border border-dashboard-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-dashboard-primary">{task.title}</h4>
                  {/* ★ Impact Scoreをバッジで表示 */}
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
  );
}
