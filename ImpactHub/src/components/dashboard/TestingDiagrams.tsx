import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TestingDiagrams() {
  return (
    <div className="space-y-4">
      <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-primary">Agile Testing Quadrants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 h-48">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <div className="text-xs font-semibold text-blue-700 mb-2">Q1: Unit Tests</div>
              <div className="text-xs text-blue-600 text-center">Technology Facing<br/>Supporting Development</div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <div className="text-xs font-semibold text-green-700 mb-2">Q2: Acceptance Tests</div>
              <div className="text-xs text-green-600 text-center">Business Facing<br/>Supporting Development</div>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <div className="text-xs font-semibold text-purple-700 mb-2">Q3: Exploratory Tests</div>
              <div className="text-xs text-purple-600 text-center">Business Facing<br/>Critiquing Product</div>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 flex flex-col justify-center items-center">
              <div className="text-xs font-semibold text-orange-700 mb-2">Q4: Performance Tests</div>
              <div className="text-xs text-orange-600 text-center">Technology Facing<br/>Critiquing Product</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-dashboard-section-bg border-dashboard-border shadow-card">
        <CardHeader>
          <CardTitle className="text-dashboard-primary">Test Pyramid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-12 bg-red-100 border-2 border-red-300 rounded flex items-center justify-center">
              <span className="text-xs font-semibold text-red-700">E2E</span>
            </div>
            <div className="w-32 h-12 bg-yellow-100 border-2 border-yellow-300 rounded flex items-center justify-center">
              <span className="text-xs font-semibold text-yellow-700">Integration</span>
            </div>
            <div className="w-44 h-12 bg-green-100 border-2 border-green-300 rounded flex items-center justify-center">
              <span className="text-xs font-semibold text-green-700">Unit Tests</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-dashboard-gray">
            More tests at the bottom, fewer at the top
          </div>
        </CardContent>
      </Card>
    </div>
  );
}