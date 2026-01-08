import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { 
  MessageSquare, 
  Zap, 
  Shield, 
  Clock, 
  Train, 
  Plane, 
  Bus, 
  Ticket,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language",
    description: "Just describe what you need in plain English. No complex forms to fill.",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    description: "Get personalized suggestions based on price, time, and comfort preferences.",
  },
  {
    icon: Shield,
    title: "Secure Simulation",
    description: "Practice booking without any real payments. Learn the process safely.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description: "Compare multiple options in seconds. Find the best deals quickly.",
  },
];

const ticketTypes = [
  { icon: Train, label: "Trains", color: "from-blue-500 to-indigo-600" },
  { icon: Plane, label: "Flights", color: "from-purple-500 to-pink-600" },
  { icon: Bus, label: "Buses", color: "from-green-500 to-emerald-600" },
  { icon: Ticket, label: "Events", color: "from-orange-500 to-red-500" },
];

const useCases = [
  "Book a train from Chennai to Bangalore tomorrow",
  "Find the cheapest flight to Mumbai this weekend",
  "Compare bus options for an overnight journey",
  "Get movie tickets for the latest release",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Booking Assistant</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 animate-slide-up">
              Book Tickets{" "}
              <span className="gradient-text">Smarter</span>
              <br />
              with AI Guidance
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Your intelligent travel companion that understands natural language, 
              compares options instantly, and guides you through every booking step.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/chat">
                <Button variant="hero" size="xl" className="w-full sm:w-auto gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Start Booking
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/playground">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Try Playground
                </Button>
              </Link>
            </div>
            
            {/* Ticket Types */}
            <div className="flex flex-wrap justify-center gap-4 mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              {ticketTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.label}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">{type.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Why Choose TicketAI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of ticket booking with intelligent automation 
              and personalized guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="glass-card rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Just Ask, We'll Handle It
              </h2>
              <p className="text-lg text-muted-foreground">
                Try these example queries or create your own
              </p>
            </div>
            
            <div className="space-y-4">
              {useCases.map((useCase, index) => (
                <Link to="/chat" key={index} className="block">
                  <div className="glass-card rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-primary" />
                      </div>
                      <p className="flex-1 text-lg">{useCase}</p>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Ready to Experience Smart Booking?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your journey with our AI assistant. No registration required for demo mode.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button variant="hero" size="xl" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                No payment required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Simulation mode
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Learn safely
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 TicketAI. Demo Application - Simulation Mode Only.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/playground" className="hover:text-primary transition-colors">
                Playground
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
