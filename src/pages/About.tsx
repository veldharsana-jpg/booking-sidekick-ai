import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Brain, 
  Zap, 
  Shield, 
  Users, 
  Lightbulb,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const howItWorks = [
  {
    step: 1,
    title: "Describe Your Needs",
    description: "Tell the AI agent what you're looking for in natural language. No complex forms or technical knowledge required.",
    icon: MessageSquare,
  },
  {
    step: 2,
    title: "AI Analyzes Options",
    description: "Our intelligent agent processes your request, searches available options, and identifies the best matches.",
    icon: Brain,
  },
  {
    step: 3,
    title: "Get Smart Recommendations",
    description: "Receive personalized suggestions ranked by price, time, comfort, or your preferred criteria.",
    icon: Lightbulb,
  },
  {
    step: 4,
    title: "Simulate Your Booking",
    description: "Practice the booking process safely with our simulation mode. Learn before you book for real.",
    icon: Shield,
  },
];

const capabilities = [
  "Natural language understanding for travel queries",
  "Multi-modal search (trains, buses, flights, events)",
  "Smart price comparison and recommendations",
  "Step-by-step booking guidance",
  "Error handling with helpful clarifications",
  "Budget-aware suggestions",
  "Seat preference matching",
  "Time optimization recommendations",
];

const faqs = [
  {
    question: "Is this a real booking platform?",
    answer: "No, TicketAI is a demonstration platform. All bookings are simulated and no real payments are processed. It's designed to help users understand and practice the booking process.",
  },
  {
    question: "What types of tickets can I simulate booking?",
    answer: "You can practice booking train tickets, bus tickets, flights, event tickets (concerts, sports), and movie tickets. Each type has realistic mock data to provide an authentic experience.",
  },
  {
    question: "How does the AI understand my requests?",
    answer: "The AI agent uses natural language processing to understand your intent, extract key details like destinations, dates, and preferences, and provide relevant responses and options.",
  },
  {
    question: "Can I customize the AI's behavior?",
    answer: "Yes! Visit the AI Playground to experiment with different prompts and system instructions. You can modify how the AI responds and test various scenarios.",
  },
];

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">About TicketAI</Badge>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Your AI-Powered
            <br />
            <span className="gradient-text">Booking Assistant</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of ticket booking with intelligent automation, 
            natural language understanding, and step-by-step guidance.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.step} className="glass-card relative overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">
                AI Agent Capabilities
              </h2>
              <p className="text-muted-foreground mb-8">
                Our intelligent booking assistant is designed to understand your needs 
                and provide personalized guidance throughout the booking process.
              </p>
              <div className="grid grid-cols-1 gap-3">
                {capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-xl">
                      Smart Recommendations
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Powered by AI analysis
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-success/10">
                    <span className="text-sm font-medium">Cheapest Option</span>
                    <Badge className="bg-success text-success-foreground">Save ₹535</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
                    <span className="text-sm font-medium">Fastest Route</span>
                    <Badge className="bg-accent text-accent-foreground">-45 min</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
                    <span className="text-sm font-medium">Best Rated</span>
                    <Badge className="bg-primary text-primary-foreground">⭐ 4.8</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 px-6 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to Try It Out?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start chatting with our AI agent or experiment in the playground. 
            No registration required for demo mode.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button variant="hero" size="lg" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Chatting
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/playground">
              <Button variant="outline" size="lg">
                Open Playground
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
