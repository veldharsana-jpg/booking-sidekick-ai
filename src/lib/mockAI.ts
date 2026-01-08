export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface TicketOption {
  id: string;
  type: "bus" | "train" | "flight";
  provider: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  rating: number;
  tags: ("cheapest" | "fastest" | "recommended")[];
}

const mockResponses: Record<string, string> = {
  train: `I'd be happy to help you book a train ticket! 🚆

To find the best options, I'll need a few details:
1. **From:** Which city are you departing from?
2. **To:** Where would you like to go?
3. **Date:** When do you want to travel?
4. **Class:** Do you prefer Sleeper, AC, or General?

Once you provide these details, I'll show you the best available trains with prices and timings!`,
  
  bus: `Great choice! Bus travel is often the most economical option. 🚌

Please share:
1. **Source city**
2. **Destination city**
3. **Travel date**
4. **Preference:** AC/Non-AC, Sleeper/Seater?

I'll find you the best routes with comfort and price comparisons!`,
  
  flight: `Let's find you the perfect flight! ✈️

I'll need to know:
1. **From:** Departure airport/city
2. **To:** Destination airport/city
3. **Date:** Travel date (one-way or round-trip?)
4. **Class:** Economy, Premium Economy, or Business?
5. **Budget:** Any price range in mind?

I'll search across airlines to get you the best deals!`,
  
  default: `Hello! I'm your AI Ticket Booking Assistant. 🎫

I can help you with:
• **Train tickets** - Find the best routes and classes
• **Bus bookings** - Compare operators and prices
• **Flight reservations** - Search across airlines
• **Event tickets** - Concerts, sports, and more
• **Movie tickets** - Book seats at your favorite theaters

Just tell me what you're looking for, and I'll guide you through the booking process step by step!

**Example:** "I want to book a train from Chennai to Bangalore tomorrow"`,
};

export const mockTicketOptions: TicketOption[] = [
  {
    id: "1",
    type: "train",
    provider: "Shatabdi Express",
    from: "Chennai",
    to: "Bangalore",
    departure: "06:00",
    arrival: "11:00",
    duration: "5h 00m",
    price: 985,
    rating: 4.8,
    tags: ["fastest", "recommended"],
  },
  {
    id: "2",
    type: "train",
    provider: "Brindavan Express",
    from: "Chennai",
    to: "Bangalore",
    departure: "07:30",
    arrival: "13:15",
    duration: "5h 45m",
    price: 450,
    rating: 4.5,
    tags: ["cheapest"],
  },
  {
    id: "3",
    type: "train",
    provider: "Lalbagh Express",
    from: "Chennai",
    to: "Bangalore",
    departure: "14:30",
    arrival: "20:00",
    duration: "5h 30m",
    price: 520,
    rating: 4.6,
    tags: [],
  },
];

export function generateAIResponse(userMessage: string, systemPrompt?: string): Promise<string> {
  return new Promise((resolve) => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = mockResponses.default;
    
    if (lowerMessage.includes("train")) {
      response = mockResponses.train;
    } else if (lowerMessage.includes("bus")) {
      response = mockResponses.bus;
    } else if (lowerMessage.includes("flight")) {
      response = mockResponses.flight;
    } else if (lowerMessage.includes("chennai") && lowerMessage.includes("bangalore")) {
      response = `Perfect! I found several options for your Chennai → Bangalore journey. 🎯

**Best Options Available:**

1. **🏆 Shatabdi Express** (Fastest & Recommended)
   - Departure: 06:00 AM → Arrival: 11:00 AM
   - Duration: 5 hours | Price: ₹985
   - Rating: ⭐ 4.8/5

2. **💰 Brindavan Express** (Cheapest)
   - Departure: 07:30 AM → Arrival: 01:15 PM
   - Duration: 5h 45m | Price: ₹450
   - Rating: ⭐ 4.5/5

3. **Lalbagh Express**
   - Departure: 02:30 PM → Arrival: 08:00 PM
   - Duration: 5h 30m | Price: ₹520
   - Rating: ⭐ 4.6/5

**My Recommendation:** Shatabdi Express offers the best comfort-to-time ratio with premium AC coaches and complimentary meals.

Would you like me to proceed with booking any of these options?`;
    } else if (lowerMessage.includes("book") || lowerMessage.includes("select")) {
      response = `Excellent choice! 🎉

Here's a summary of your booking:

📍 **Route:** Chennai Central → Bangalore City Junction
🚆 **Train:** Shatabdi Express (12007)
📅 **Date:** Tomorrow
💺 **Class:** AC Chair Car
💰 **Price:** ₹985 per person

**⚠️ Simulation Mode:** This is a demo booking preview.

To complete a real booking, you would:
1. Select your seats from the available layout
2. Enter passenger details (Name, Age, ID proof)
3. Review the total amount
4. Proceed to secure payment

**Pro Tips:**
• Book early morning trains for better punctuality
• Carry a valid photo ID matching your ticket
• Arrive 30 minutes before departure

Would you like me to simulate the seat selection step?`;
    } else if (lowerMessage.includes("cheapest") || lowerMessage.includes("budget")) {
      response = `Looking for budget-friendly options! 💰

Here are my recommendations:

**🚌 Bus (Most Economical)**
- Non-AC Sleeper buses start from ₹350
- Travel time: 6-7 hours
- Overnight options available

**🚆 Train (Best Value)**
- Brindavan Express: ₹450 (Second Sitting)
- Lalbagh Express: ₹520 (Second Sitting)
- Travel time: 5-6 hours

**Pro Tips for Saving Money:**
1. Book 2-3 days in advance for best prices
2. Consider non-AC options for short routes
3. Check for Tatkal availability (extra ₹100-200)
4. Overnight buses save hotel costs

Which option would you like to explore?`;
    }
    
    // Add system prompt context if provided
    if (systemPrompt && systemPrompt.includes("verbose")) {
      response += "\n\n---\n*[Verbose mode enabled - showing detailed response]*";
    }
    
    // Simulate API delay
    setTimeout(() => resolve(response), 1000 + Math.random() * 1000);
  });
}

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
