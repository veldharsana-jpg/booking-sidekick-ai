import { Button } from "@/components/ui/button";
import { Train, Bus, Plane, Ticket, Calendar } from "lucide-react";

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const actions = [
  { id: "train", label: "Book Train", icon: Train, color: "from-blue-500 to-blue-600" },
  { id: "bus", label: "Book Bus", icon: Bus, color: "from-green-500 to-green-600" },
  { id: "flight", label: "Book Flight", icon: Plane, color: "from-purple-500 to-purple-600" },
  { id: "event", label: "Event Tickets", icon: Ticket, color: "from-pink-500 to-pink-600" },
  { id: "movie", label: "Movie Tickets", icon: Calendar, color: "from-orange-500 to-orange-600" },
];

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.id}
            variant="outline"
            onClick={() => onAction(action.id)}
            className="h-auto py-4 flex flex-col gap-2 hover:shadow-md transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
