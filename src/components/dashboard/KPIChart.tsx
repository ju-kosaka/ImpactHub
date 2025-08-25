import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: 'Jan', revenue: 45000, projects: 12, satisfaction: 85 },
  { month: 'Feb', revenue: 52000, projects: 15, satisfaction: 88 },
  { month: 'Mar', revenue: 48000, projects: 13, satisfaction: 82 },
  { month: 'Apr', revenue: 61000, projects: 18, satisfaction: 90 },
  { month: 'May', revenue: 55000, projects: 16, satisfaction: 87 },
  { month: 'Jun', revenue: 67000, projects: 20, satisfaction: 92 },
  { month: 'Jul', revenue: 59000, projects: 17, satisfaction: 89 },
  { month: 'Aug', revenue: 71000, projects: 22, satisfaction: 94 },
  { month: 'Sep', revenue: 65000, projects: 19, satisfaction: 91 },
  { month: 'Oct', revenue: 73000, projects: 24, satisfaction: 95 },
  { month: 'Nov', revenue: 68000, projects: 21, satisfaction: 93 },
  { month: 'Dec', revenue: 75000, projects: 25, satisfaction: 96 },
];

export function KPIChart() {
  return (
    <div className="space-y-4">
      <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-primary">Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--dashboard-border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--dashboard-gray))"
                />
                <YAxis stroke="hsl(var(--dashboard-gray))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--dashboard-section-bg))',
                    border: '1px solid hsl(var(--dashboard-border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--dashboard-accent))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--dashboard-accent))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projects" 
                  stroke="hsl(var(--dashboard-primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--dashboard-primary))', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-dashboard-accent">$68,500</div>
              <div className="text-sm text-dashboard-gray">Monthly Virtual Cost</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-dashboard-primary">94.2</div>
              <div className="text-sm text-dashboard-gray">Previous Month Impact Score</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}