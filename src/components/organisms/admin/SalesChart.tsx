import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { SalesAnalytics } from "@/lib/api/admin/admin.types";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const SalesChart = ({ sales }: { sales: SalesAnalytics[] }) => {
  // const [timeRange, setTimeRange] = useState("6months");

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
            Sales: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Sales Analytics
          </CardTitle>
          {/* <div className="flex gap-2">
            {["3months", "6months", "1year"].map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="text-xs transition-all duration-200"
              >
                {range === "3months" ? "3M" : range === "6months" ? "6M" : "1Y"}
              </Button>
            ))}
          </div> */}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sales}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              <Line
                type="monotone"
                dataKey="count"
                stroke="url(#gradient)"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: "#1d4ed8" }}
                className="animate-fade-in"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
