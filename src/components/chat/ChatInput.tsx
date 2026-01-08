import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSend, disabled, placeholder = "Type your booking request..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-3 items-end">
      <div className="flex-1 relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[52px] max-h-[200px] resize-none pr-12 rounded-xl border-2 border-border focus:border-primary transition-colors"
          rows={1}
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 bottom-2 text-muted-foreground hover:text-foreground"
          disabled={disabled}
        >
          <Mic className="w-5 h-5" />
        </Button>
      </div>
      <Button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        size="lg"
        className="rounded-xl h-[52px] px-6"
      >
        <Send className="w-5 h-5" />
      </Button>
    </div>
  );
}
