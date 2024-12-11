import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DemoConfig } from "@/lib/onboardingUtils";

interface DemoConfigDialogProps {
  contentId: string;
  initialConfig?: DemoConfig;
  onSave: (contentId: string, config: DemoConfig) => void;
}

export function DemoConfigDialog({
  contentId,
  initialConfig,
  onSave,
}: DemoConfigDialogProps) {
  const [config, setConfig] = useState<DemoConfig>(
    initialConfig || {
      shouldMatch: false,
      matchDelay: 30,
      matchType: "visual",
    }
  );

  const handleSave = () => {
    onSave(contentId, config);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Demo Config</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Demo Configuration</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <label htmlFor="shouldMatch">Should Match:</label>
            <input
              id="shouldMatch"
              type="checkbox"
              checked={config.shouldMatch}
              onChange={(e) =>
                setConfig({ ...config, shouldMatch: e.target.checked })
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="matchDelay">Match Delay (seconds):</label>
            <Input
              id="matchDelay"
              type="number"
              value={config.matchDelay}
              onChange={(e) =>
                setConfig({ ...config, matchDelay: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="matchType">Match Type:</label>
            <Select
              value={config.matchType}
              onValueChange={(value: "visual" | "audio" | "general") =>
                setConfig({ ...config, matchType: value })
              }
            >
              <SelectTrigger id="matchType">
                <SelectValue placeholder="Select match type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="visual">Visual</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSave}>Save Configuration</Button>
      </DialogContent>
    </Dialog>
  );
}
