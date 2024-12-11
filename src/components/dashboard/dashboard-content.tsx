import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardChart from "./dashboard-chart";

const DashboardContent = () => {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-6 text-black">Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Creators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">22,348</div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-2xl font-semibold">1,234</div>
                <div className="text-sm text-muted-foreground">Protected</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">21,398</div>
                <div className="text-sm text-muted-foreground">Watched</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">4,509</div>
                <div className="text-sm text-muted-foreground">
                  Protected content
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12,309</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-2xl font-semibold">82%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-semibold">$1.98M</div>
                <div className="text-sm text-muted-foreground">
                  Detected value
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DashboardChart />
    </main>
  );
};

export default DashboardContent;
