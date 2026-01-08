import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { QuickActions } from "@/components/booking/QuickActions";
import { TicketCard } from "@/components/booking/TicketCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles } from "lucide-react";
import { Message, generateAIResponse, generateMessageId, mockTicketOptions } from "@/lib/mockAI";
import { toast } from "@/hooks/use-toast";

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: `Hello! I'm your AI Ticket Booking Assistant. 🎫

I can help you with:
• **Train tickets** - Find the best routes and classes
• **Bus bookings** - Compare operators and prices
• **Flight reservations** - Search across airlines
• **Event tickets** - Concerts, sports, and more
• **Movie tickets** - Book seats at your favorite theaters

Just tell me what you're looking for, and I'll guide you through the booking process step by step!

**Example:** "I want to book a train from Chennai to Bangalore tomorrow"`,
  timestamp: new Date(),
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTickets, setShowTickets] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: generateMessageId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Check if we should show ticket cards
    const lowerContent = content.toLowerCase();
    if (
      lowerContent.includes("chennai") &&
      lowerContent.includes("bangalore")
    ) {
      setShowTickets(true);
    }

    try {
      const response = await generateAIResponse(content);
      const assistantMessage: Message = {
        id: generateMessageId(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    const prompts: Record<string, string> = {
      train: "I want to book a train ticket",
      bus: "I want to book a bus ticket",
      flight: "I want to book a flight",
      event: "I want to book event tickets",
      movie: "I want to book movie tickets",
    };
    handleSendMessage(prompts[action] || "Help me book a ticket");
  };

  const handleTicketSelect = (id: string) => {
    const ticket = mockTicketOptions.find((t) => t.id === id);
    if (ticket) {
      handleSendMessage(`I want to book the ${ticket.provider} (${ticket.departure} departure)`);
    }
  };

  const handleReset = () => {
    setMessages([welcomeMessage]);
    setShowTickets(false);
    toast({
      title: "Chat Reset",
      description: "Started a new conversation.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold">AI Booking Agent</h1>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Online
                </Badge>
                <span className="text-sm text-muted-foreground">Simulation Mode</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <QuickActions onAction={handleQuickAction} />
        </div>

        {/* Chat Area */}
        <div className="glass-card rounded-2xl p-6 mb-6 min-h-[400px] max-h-[500px] overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Ticket Results */}
        {showTickets && (
          <div className="mb-6 animate-slide-up">
            <h2 className="text-lg font-display font-semibold mb-4">Available Options</h2>
            <div className="space-y-4">
              {mockTicketOptions.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  {...ticket}
                  onSelect={handleTicketSelect}
                />
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="sticky bottom-6">
          <ChatInput
            onSend={handleSendMessage}
            disabled={isTyping}
            placeholder="Type your booking request... (e.g., 'Book a train from Chennai to Bangalore')"
          />
        </div>
      </div>
    </Layout>
  );
}
