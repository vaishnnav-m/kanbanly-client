import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";
import { Badge, TrendingDown, TrendingUp } from "lucide-react";

const PlanBreakdown = () => {
  const plans = [
    {
      name: "Free",
      users: 1240,
      revenue: 0,
      growth: 0,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    },
    {
      name: "Starter",
      users: 428,
      revenue: 4280,
      growth: 12.5,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    },
    {
      name: "Pro",
      users: 156,
      revenue: 7800,
      growth: 8.3,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    },
    {
      name: "Enterprise",
      users: 23,
      revenue: 11500,
      growth: -2.1,
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    }
  ];

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Plan Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <Badge className={plan.color}>
                  {plan.name}
                </Badge>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {plan.users.toLocaleString()} users
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ${plan.revenue.toLocaleString()} revenue
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {plan.growth !== 0 && (
                  <>
                    {plan.growth > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      plan.growth > 0 ? "text-green-500" : "text-red-500"
                    }`}>
                      {plan.growth > 0 ? "+" : ""}{plan.growth}%
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanBreakdown;
