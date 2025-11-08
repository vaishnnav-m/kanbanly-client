import { Card } from "@/components/atoms/card";
import { Progress } from "@/components/atoms/progress";

export const PerformanceWidget = () => {
  return (
    <Card className="overflow-hidden p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Team Performance
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">
              Completion Rate
            </span>
            <span className="text-lg font-bold text-primary">87%</span>
          </div>
          <Progress value={87} className="h-2.5" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">
              On-time Delivery
            </span>
            <span className="text-lg font-bold text-emerald-500">92%</span>
          </div>
          <Progress value={92} className="h-2.5" />
        </div>

        <div className="relative mt-6 overflow-hidden rounded-xl bg-gradient-to-br from-success/10 to-success/5 p-4 border border-success/20 shadow-sm">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-success/10 blur-2xl" />
          <p className="relative text-sm text-foreground font-semibold leading-relaxed">
            Your team is performing exceptionally well this month!
          </p>
        </div>
      </div>
    </Card>
  );
};
