import { useState, useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { metrics } from "@/constants";

export default function DashboardChart() {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("creators");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const currentMetric = useMemo(
    () => metrics[selectedMetric],
    [selectedMetric]
  );

  const totalValue = useMemo(() => {
    return currentMetric.data[currentMetric.data.length - 1].value;
  }, [currentMetric]);

  const selectedData = useMemo(() => {
    if (hoveredBarIndex === null) {
      return { month: "Total", value: totalValue, percentageChange: null };
    }
    const currentData = currentMetric.data[hoveredBarIndex];
    const previousData =
      hoveredBarIndex > 0 ? currentMetric.data[hoveredBarIndex - 1] : null;
    const percentageChange = previousData
      ? ((currentData.value - previousData.value) / previousData.value) * 100
      : null;
    return { ...currentData, percentageChange };
  }, [currentMetric, hoveredBarIndex, totalValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomBar = (props: any) => {
    const { fill, x, y, width, height, index } = props;
    const radius = 8;
    const isHovered = index === hoveredBarIndex;
    const isOtherBar = hoveredBarIndex !== null && index !== hoveredBarIndex;

    return (
      <g>
        <defs>
          <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={fill}
              stopOpacity={isHovered ? 1 : isOtherBar ? 0.3 : 0.7}
            />
            <stop
              offset="100%"
              stopColor={fill}
              stopOpacity={isHovered ? 0.8 : isOtherBar ? 0.1 : 0.3}
            />
          </linearGradient>
        </defs>
        <path
          d={`M ${x},${y + height} L ${x},${y + radius} Q ${x},${y} ${
            x + radius
          },${y} L ${x + width - radius},${y} Q ${x + width},${y} ${
            x + width
          },${y + radius} L ${x + width},${y + height} Z`}
          fill={`url(#gradient-${index})`}
          onMouseEnter={() => setHoveredBarIndex(index)}
          onMouseLeave={() => setHoveredBarIndex(null)}
          style={{ cursor: "pointer" }}
        />
      </g>
    );
  };

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-normal text-muted-foreground">
            {selectedData.month === "Total"
              ? "Total"
              : `${selectedData.month} 2024`}
          </CardTitle>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold">
              {currentMetric.formatValue(selectedData.value)}
            </span>
            {selectedData.percentageChange !== null && (
              <span
                className={`text-sm ${
                  selectedData.percentageChange > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }`}
              >
                {selectedData.percentageChange > 0 ? "+" : ""}
                {selectedData.percentageChange.toFixed(0)}% from previous month
              </span>
            )}
          </div>
        </div>
        <Select
          value={selectedMetric}
          onValueChange={(value: MetricType) =>
            setSelectedMetric(value as MetricType)
          }
        >
          <SelectTrigger className="w-[140px] border-gray-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="creators">Creators</SelectItem>
            <SelectItem value="detected-value">Detected value</SelectItem>
            <SelectItem value="alerts-accuracy">Alerts accuracy</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentMetric.data} barSize={30}>
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => currentMetric.formatValue(value)}
              />
              <Bar
                dataKey="value"
                shape={<CustomBar />}
                fill={currentMetric.color}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
