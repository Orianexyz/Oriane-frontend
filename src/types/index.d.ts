interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface ChartData {
  month: string;
  value: number;
  percentageChange?: number;
}

type MetricType = "detected-value" | "alerts-accuracy" | "creators";

interface MetricConfig {
  label: string;
  color: string;
  formatValue: (value: number) => string;
  data: ChartData[];
}

interface AnalysisProgressProps {
  status: "pending" | "complete";
  progress: number;
}

interface DownloadCSVButtonProps {
  headers: string[];
  rows: (string | number)[][];
  fileName?: string;
}

interface Creator {
  id: string;
  username: string;
  contentCount: number;
  alerts: number;
  createdDate: string;
  status: string;
}

interface CustomBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

type Content = {
  id: string;
  thumbnail: string;
  caption: string;
  engagement: {
    views: number;
    comments: number;
    shares: number;
    likes: number;
  };
  createdAt: string;
  creator: string;
  status: string;
};

interface NavItem {
  label: string;
  href: string;
  visible: boolean;
  protected: boolean;
  component: React.FC;
  bottom?: boolean;
  icon: React.ReactNode | null;
}
