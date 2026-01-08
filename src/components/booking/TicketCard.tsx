import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, IndianRupee, Star, Zap, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface TicketCardProps {
  id: string;
  type: "bus" | "train" | "flight";
  provider: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  rating?: number;
  tags?: ("cheapest" | "fastest" | "recommended")[];
  onSelect?: (id: string) => void;
}

const typeIcons = {
  bus: "🚌",
  train: "🚆",
  flight: "✈️",
};

const tagConfig = {
  cheapest: { label: "Cheapest", icon: IndianRupee, className: "bg-success/10 text-success border-success/20" },
  fastest: { label: "Fastest", icon: Zap, className: "bg-accent/10 text-accent border-accent/20" },
  recommended: { label: "Recommended", icon: Star, className: "bg-primary/10 text-primary border-primary/20" },
};

export function TicketCard({
  id,
  type,
  provider,
  from,
  to,
  departure,
  arrival,
  duration,
  price,
  rating,
  tags = [],
  onSelect,
}: TicketCardProps) {
  return (
    <div className="glass-card rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex gap-2 mb-4">
          {tags.map((tag) => {
            const config = tagConfig[tag];
            const Icon = config.icon;
            return (
              <Badge key={tag} variant="outline" className={cn("gap-1", config.className)}>
                <Icon className="w-3 h-3" />
                {config.label}
              </Badge>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Provider & Type */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">{typeIcons[type]}</span>
          <div>
            <p className="font-semibold text-foreground">{provider}</p>
            <p className="text-sm text-muted-foreground capitalize">{type}</p>
          </div>
        </div>

        {/* Route & Time */}
        <div className="flex-1 flex items-center justify-center gap-4">
          <div className="text-center">
            <p className="font-bold text-lg">{departure}</p>
            <p className="text-sm text-muted-foreground">{from}</p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{duration}</span>
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full" />
          </div>

          <div className="text-center">
            <p className="font-bold text-lg">{arrival}</p>
            <p className="text-sm text-muted-foreground">{to}</p>
          </div>
        </div>

        {/* Price & Action */}
        <div className="text-right flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            <span className="text-2xl font-bold font-display">{price.toLocaleString()}</span>
          </div>
          {rating && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
          )}
          <Button
            variant="hero"
            size="sm"
            onClick={() => onSelect?.(id)}
            className="mt-2"
          >
            Select
          </Button>
        </div>
      </div>
    </div>
  );
}
