import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Train, 
  Calendar, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  MapPin,
  Clock,
  Armchair
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BookingDetails {
  from: string;
  to: string;
  date: string;
  passengers: number;
  name: string;
  email: string;
  phone: string;
}

const mockBooking = {
  train: "Shatabdi Express (12007)",
  from: "Chennai Central",
  to: "Bangalore City Junction",
  departure: "06:00 AM",
  arrival: "11:00 AM",
  duration: "5h 00m",
  class: "AC Chair Car",
  price: 985,
  seat: "A2-24",
};

const steps = ["Journey Details", "Passenger Info", "Review & Confirm"];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [booking, setBooking] = useState<BookingDetails>({
    from: "Chennai",
    to: "Bangalore",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: keyof BookingDetails, value: string | number) => {
    setBooking((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete booking simulation
      setIsComplete(true);
      toast({
        title: "Booking Simulated!",
        description: "This is a demo - no real booking was made.",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (isComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <Card className="glass-card">
            <CardContent className="pt-12 pb-8 text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-display font-bold mb-2">Booking Simulated!</h2>
              <p className="text-muted-foreground mb-6">
                This is a demonstration. No real booking was created.
              </p>
              
              <div className="bg-secondary/50 rounded-xl p-6 text-left mb-6">
                <h3 className="font-semibold mb-4">Booking Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Train:</span>
                    <span>{mockBooking.train}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route:</span>
                    <span>{mockBooking.from} → {mockBooking.to}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{mockBooking.departure} - {mockBooking.arrival}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passenger:</span>
                    <span>{booking.name || "Guest User"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total Amount:</span>
                    <span>₹{mockBooking.price * booking.passengers}</span>
                  </div>
                </div>
              </div>

              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 mb-6">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Simulation Mode - No Payment Processed
              </Badge>

              <Button
                variant="hero"
                onClick={() => {
                  setIsComplete(false);
                  setCurrentStep(0);
                  setBooking({
                    from: "Chennai",
                    to: "Bangalore",
                    date: new Date().toISOString().split("T")[0],
                    passengers: 1,
                    name: "",
                    email: "",
                    phone: "",
                  });
                }}
              >
                Start New Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
              <Train className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold">Booking Simulation</h1>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                Demo Mode
              </Badge>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-sm hidden sm:block ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>{steps[currentStep]}</CardTitle>
                <CardDescription>
                  {currentStep === 0 && "Enter your journey details"}
                  {currentStep === 1 && "Provide passenger information"}
                  {currentStep === 2 && "Review your booking details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="from">From</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="from"
                            value={booking.from}
                            onChange={(e) => handleChange("from", e.target.value)}
                            className="pl-10"
                            placeholder="Departure city"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="to">To</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="to"
                            value={booking.to}
                            onChange={(e) => handleChange("to", e.target.value)}
                            className="pl-10"
                            placeholder="Destination city"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Travel Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="date"
                            type="date"
                            value={booking.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Passengers</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="passengers"
                            type="number"
                            min={1}
                            max={6}
                            value={booking.passengers}
                            onChange={(e) => handleChange("passengers", parseInt(e.target.value))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={booking.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Enter passenger name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={booking.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={booking.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Train className="w-4 h-4" />
                        Journey Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">From</p>
                          <p className="font-medium">{booking.from}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">To</p>
                          <p className="font-medium">{booking.to}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Passengers</p>
                          <p className="font-medium">{booking.passengers}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Passenger Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {booking.name || "Not provided"}</p>
                        <p><span className="text-muted-foreground">Email:</span> {booking.email || "Not provided"}</p>
                        <p><span className="text-muted-foreground">Phone:</span> {booking.phone || "Not provided"}</p>
                      </div>
                    </div>

                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      This is a simulation - No real booking will be made
                    </Badge>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  {currentStep > 0 && (
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button onClick={handleNext} className="ml-auto">
                    {currentStep === steps.length - 1 ? "Complete Booking" : "Continue"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Train className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{mockBooking.train}</p>
                    <p className="text-sm text-muted-foreground">{mockBooking.class}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{mockBooking.departure} → {mockBooking.arrival}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{mockBooking.from} → {mockBooking.to}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Armchair className="w-4 h-4 text-muted-foreground" />
                    <span>Seat: {mockBooking.seat}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base fare</span>
                    <span>₹{mockBooking.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Passengers</span>
                    <span>×{booking.passengers}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg">₹{mockBooking.price * booking.passengers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
