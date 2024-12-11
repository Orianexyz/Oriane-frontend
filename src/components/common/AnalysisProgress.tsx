import { Progress } from "@/components/ui/progress";

export function AnalysisProgress({ status, progress }: AnalysisProgressProps) {
  return (
    <div className="w-full">
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-gray-500 mt-1">
        {status === "complete"
          ? "Analysis complete"
          : `Analyzing... ${progress}%`}
      </p>
    </div>
  );
}
