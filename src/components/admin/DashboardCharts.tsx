import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface DashboardChartsProps {
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalNews: number;
    totalGallery: number;
  };
}

export function DashboardCharts({ stats }: DashboardChartsProps) {
  const pieData = [
    { name: "Students", value: stats.totalStudents, color: "hsl(0, 75%, 45%)" },
    { name: "Teachers", value: stats.totalTeachers, color: "hsl(145, 65%, 42%)" },
    { name: "News", value: stats.totalNews, color: "hsl(45, 90%, 50%)" },
    { name: "Gallery", value: stats.totalGallery, color: "hsl(200, 70%, 50%)" },
  ];

  const monthlyData = [
    { month: "Jan", students: 45, teachers: 8 },
    { month: "Feb", students: 52, teachers: 9 },
    { month: "Mar", students: 58, teachers: 10 },
    { month: "Apr", students: 65, teachers: 10 },
    { month: "May", students: 72, teachers: 11 },
    { month: "Jun", students: 78, teachers: 12 },
  ];

  const activityData = [
    { day: "Mon", uploads: 12 },
    { day: "Tue", uploads: 19 },
    { day: "Wed", uploads: 8 },
    { day: "Thu", uploads: 25 },
    { day: "Fri", uploads: 32 },
    { day: "Sat", uploads: 15 },
    { day: "Sun", uploads: 5 },
  ];

  const chartConfig = {
    students: { label: "Students", color: "hsl(0, 75%, 45%)" },
    teachers: { label: "Teachers", color: "hsl(145, 65%, 42%)" },
    uploads: { label: "Uploads", color: "hsl(45, 90%, 50%)" },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Distribution Pie Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/30 h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resource Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Growth Line Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/30 h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="gradientStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(0, 75%, 45%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(0, 75%, 45%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradientTeachers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(145, 65%, 42%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="hsl(0, 75%, 45%)"
                    strokeWidth={2}
                    fill="url(#gradientStudents)"
                  />
                  <Area
                    type="monotone"
                    dataKey="teachers"
                    stroke="hsl(145, 65%, 42%)"
                    strokeWidth={2}
                    fill="url(#gradientTeachers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weekly Activity Bar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-muted/30 h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="uploads"
                    fill="hsl(45, 90%, 50%)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
