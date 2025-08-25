import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";

const upcomingTasks = [
  { id: 1, title: "Code Review - Payment Module", assignee: "John Doe", dueDate: "2024-01-20", priority: "high", estimated: "2h" },
  { id: 2, title: "Database Migration Script", assignee: "Jane Smith", dueDate: "2024-01-21", priority: "medium", estimated: "4h" },
  { id: 3, title: "UI Testing - Dashboard", assignee: "Mike Johnson", dueDate: "2024-01-22", priority: "medium", estimated: "3h" },
  { id: 4, title: "API Endpoint Documentation", assignee: "Sarah Wilson", dueDate: "2024-01-23", priority: "low", estimated: "1h" },
  { id: 5, title: "Performance Optimization", assignee: "Alex Brown", dueDate: "2024-01-24", priority: "high", estimated: "6h" },
  { id: 6, title: "Security Audit", assignee: "Emily Davis", dueDate: "2024-01-25", priority: "high", estimated: "8h" },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export function UpcomingTasks() {
  return (
    <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
      <CardHeader>
        <CardTitle className="text-dashboard-primary">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border border-dashboard-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-dashboard-primary">{task.title}</h4>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-dashboard-gray">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{task.assignee}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{task.estimated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}