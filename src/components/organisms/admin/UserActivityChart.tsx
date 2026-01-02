import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { UserAnalytics } from "@/lib/api/admin/admin.types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const UserActivity = ({
  userAnalytics,
}: {
  userAnalytics: UserAnalytics[];
}) => {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">
            {new Date(label).toLocaleDateString()}
          </p>
          <p className="text-blue-600 dark:text-blue-400">
            Users: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          User Activity
        </CardTitle>
        {/* Removed the detailed legend as there's only one metric now */}
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={userAnalytics}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="date"
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                className="text-gray-600 dark:text-gray-400"
                fontSize={12}
                domain={[0, "auto"]}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#blueGradient)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivity;
