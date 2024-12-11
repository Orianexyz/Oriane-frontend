import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({
  headers,
  rows,
  fileName = "data.csv",
}) => {
  const handleDownload = () => {
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map(String).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleDownload}>
      <Download className="w-4 h-4 mr-2" />
      Download CSV
    </Button>
  );
};
