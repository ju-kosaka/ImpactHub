import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const releaseSchedule = [
  {
    month: "January 2024",
    releases: [
      { name: "Authentication v2.0", date: "Jan 15", type: "major" },
      { name: "Bug fixes", date: "Jan 28", type: "patch" },
    ]
  },
  {
    month: "February 2024",
    releases: [
      { name: "Payment Integration", date: "Feb 10", type: "major" },
      { name: "Mobile UI Update", date: "Feb 22", type: "minor" },
    ]
  },
  {
    month: "March 2024",
    releases: [
      { name: "Analytics Dashboard", date: "Mar 5", type: "major" },
      { name: "Performance Improvements", date: "Mar 18", type: "minor" },
      { name: "Security Patches", date: "Mar 30", type: "patch" },
    ]
  }
];

const getReleaseTypeColor = (type: string) => {
  switch (type) {
    case "major":
      return "bg-dashboard-accent text-white";
    case "minor":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function ReleaseCalendar() {
  return (
    <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
      <CardHeader>
        <CardTitle className="text-dashboard-primary">3-Month Release Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {releaseSchedule.map((monthData, index) => (
            <div key={index}>
              <h3 className="font-semibold text-dashboard-primary mb-3 border-b border-dashboard-border pb-2">
                {monthData.month}
              </h3>
              <div className="space-y-2">
                {monthData.releases.map((release, releaseIndex) => (
                  <div
                    key={releaseIndex}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-dashboard-border"
                  >
                    <div>
                      <div className="font-medium text-dashboard-primary">{release.name}</div>
                      <div className="text-sm text-dashboard-gray">{release.date}</div>
                    </div>
                    <Badge className={getReleaseTypeColor(release.type)}>
                      {release.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}