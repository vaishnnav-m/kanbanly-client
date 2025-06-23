import { Avatar, AvatarFallback } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card";

const RecentTransactions = () => {
  const transactions = [
    {
      id: "TX001",
      user: "John Doe",
      amount: 49.99,
      plan: "Pro",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "TX002", 
      user: "Sarah Wilson",
      amount: 19.99,
      plan: "Starter",
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "TX003",
      user: "Mike Johnson",
      amount: 99.99,
      plan: "Enterprise",
      date: "2024-01-14",
      status: "pending"
    },
    {
      id: "TX004",
      user: "Emma Davis",
      amount: 49.99,
      plan: "Pro",
      date: "2024-01-14",
      status: "completed"
    },
    {
      id: "TX005",
      user: "Alex Chen",
      amount: 19.99,
      plan: "Starter",
      date: "2024-01-13",
      status: "failed"
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    };
    return colors[status as keyof typeof colors];
  };

  const getPlanColor = (plan: string) => {
    const colors = {
      Enterprise: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      Pro: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Starter: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    };
    return colors[plan as keyof typeof colors];
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {transaction.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.user}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getPlanColor(transaction.plan)}>
                      {transaction.plan}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${transaction.amount}
                </p>
                <Badge className={getStatusBadge(transaction.status)}>
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;