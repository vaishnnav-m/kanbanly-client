import { Button } from "@/components/atoms/button"
import { Card } from "@/components/atoms/card"

const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const dates = [22, 23, 24, 25, 26, 27, 28]

const activities = [
  {
    id: 1,
    type: "bug",
    message: "You have a bug that needs to be fixed.",
    time: "29 minutes ago",
    avatar: "🐛"
  },
  {
    id: 2,
    type: "release",
    message: "Released a new version",
    time: "29 minutes ago",
    avatar: "🚀"
  },
  {
    id: 3,
    type: "bug",
    message: "Submitted a bug",
    time: "12 hours ago",
    avatar: "🐛"
  },
  {
    id: 4,
    type: "data",
    message: "Modified A data in Page X",
    time: "Today, 11:59 AM",
    avatar: "📝"
  },
  {
    id: 5,
    type: "delete",
    message: "Deleted a page in Project X",
    time: "Feb 2, 2025",
    avatar: "🗑️"
  }
]

export function Calendar() {
  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-lg font-semibold mb-6">What's on the road?</h3>
      
      {/* Calendar */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground font-medium p-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {dates.map((date, index) => (
            <Button
              key={date}
              variant={date === 23 ? "default" : "ghost"}
              size="sm"
              className={`h-10 w-10 p-0 font-medium transition-all duration-200 animate-scale-in ${
                date === 23 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "hover:bg-muted hover:scale-105"
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {date}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Activities */}
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}