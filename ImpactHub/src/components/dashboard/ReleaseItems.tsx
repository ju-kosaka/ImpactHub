import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const releaseItems = [
  { id: 1, name: "User Authentication System", status: "completed", priority: "high", date: "2024-01-15" },
  { id: 2, name: "Payment Integration", status: "in-progress", priority: "high", date: "2024-01-22" },
  { id: 3, name: "Dashboard Analytics", status: "pending", priority: "medium", date: "2024-01-30" },
  { id: 4, name: "Mobile Responsive Design", status: "in-progress", priority: "medium", date: "2024-02-05" },
  { id: 5, name: "API Documentation", status: "pending", priority: "low", date: "2024-02-12" },
  { id: 6, name: "Performance Optimization", status: "pending", priority: "high", date: "2024-02-18" },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-dashboard-accent" />;
    default:
      return <AlertCircle className="h-4 w-4 text-dashboard-gray" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function ReleaseItems() {
  return (
    <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
      <CardHeader>
        <CardTitle className="text-dashboard-primary">Planned Release Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {releaseItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg border border-dashboard-border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <div>
                  <div className="font-medium text-dashboard-primary">{item.name}</div>
                  <div className="text-sm text-dashboard-gray">{item.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getPriorityColor(item.priority)}>
                  {item.priority}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {item.status.replace("-", " ")}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}