import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { PlanBreakdownItem } from "@/lib/api/admin/admin.types";
import { Badge } from "@/components/atoms/badge"; // Only Badge is needed from lucide-react now

const PlanBreakdown = ({
  planBreakdown,
}: {
  planBreakdown: PlanBreakdownItem[];
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Plan Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {planBreakdown.map((item, index) => (
            <div
              key={item.planName}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {item.planName}
                </Badge>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.count.toLocaleString()} users
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanBreakdown;