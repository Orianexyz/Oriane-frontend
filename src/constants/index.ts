import { createContext } from "react";

export const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const calculatePercentageChanges = (data: ChartData[]): ChartData[] => {
  return data.map((item, index) => {
    if (index === 0) return { ...item, percentageChange: 0 };
    const previousValue = data[index - 1].value;
    const percentageChange =
      ((item.value - previousValue) / previousValue) * 100;
    return { ...item, percentageChange };
  });
};

export const metrics: Record<MetricType, MetricConfig> = {
  "detected-value": {
    label: "Detected value",
    color: "rgb(34, 197, 94)",
    formatValue: (value) => `$${(value / 1000000).toFixed(2)}M`,
    data: calculatePercentageChanges([
      { month: "OCT", value: 0.8 * 1000000 },
      { month: "NOV", value: 0.9 * 1000000 },
      { month: "DEC", value: 0.85 * 1000000 },
      { month: "JAN", value: 1.0 * 1000000 },
      { month: "FEB", value: 1.2 * 1000000 },
      { month: "MAR", value: 1.3 * 1000000 },
      { month: "APR", value: 1.4 * 1000000 },
      { month: "MAY", value: 1.5 * 1000000 },
      { month: "JUN", value: 1.6 * 1000000 },
      { month: "JUL", value: 1.7 * 1000000 },
      { month: "AUG", value: 1.8 * 1000000 },
      { month: "SEP", value: 1.98 * 1000000 },
    ]),
  },
  "alerts-accuracy": {
    label: "Alerts accuracy",
    color: "rgb(59, 130, 246)",
    formatValue: (value) => `${value}%`,
    data: calculatePercentageChanges([
      { month: "OCT", value: 45 },
      { month: "NOV", value: 55 },
      { month: "DEC", value: 48 },
      { month: "JAN", value: 58 },
      { month: "FEB", value: 52 },
      { month: "MAR", value: 62 },
      { month: "APR", value: 54 },
      { month: "MAY", value: 68 },
      { month: "JUN", value: 60 },
      { month: "JUL", value: 75 },
      { month: "AUG", value: 78 },
      { month: "SEP", value: 82 },
    ]),
  },
  creators: {
    label: "Creators",
    color: "rgb(168, 85, 247)",
    formatValue: (value) => value.toLocaleString(),
    data: calculatePercentageChanges([
      { month: "OCT", value: 8000 },
      { month: "NOV", value: 9500 },
      { month: "DEC", value: 9000 },
      { month: "JAN", value: 11000 },
      { month: "FEB", value: 12500 },
      { month: "MAR", value: 13800 },
      { month: "APR", value: 15200 },
      { month: "MAY", value: 16800 },
      { month: "JUN", value: 18500 },
      { month: "JUL", value: 20000 },
      { month: "AUG", value: 21200 },
      { month: "SEP", value: 22348 },
    ]),
  },
};

export const ITEMS_PER_PAGE = 10;
