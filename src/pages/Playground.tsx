import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, Copy, Sparkles, Settings2, MessageSquare } from "lucide-react";
import { generateAIResponse } from "@/lib/mockAI";
import { toast } from "@/hooks/use-toast";

const examplePrompts = [
  {
    title: "Train Booking",
    prompt: "Book a train ticket from Chennai to Bangalore tomorrow",
    description: "Simple train booking query",
  },
  {
    title: "Budget Flight",
    prompt: "Find the cheapest flight from Delhi to Mumbai this weekend",
    description: "Budget-focused search",
  },
  {
    title: "Bus Compare",
    prompt: "Compare overnight bus options from Hyderabad to Goa",
    description: "Multi-option comparison",
  },
  {
    title: "Event Tickets",
    prompt: "Get tickets for the upcoming IPL match in Chennai",
    description: "Event booking query",
  },
];

const defaultSystemPrompt = `You are an intelligent ticket booking assistant. Your role is to:
1. Understand user's travel or event requirements
2. Ask clarifying questions if needed
3. Provide relevant options with prices and timings
4. Guide users through the booking process
5. Offer helpful tips and recommendations

Be friendly, professional, and concise in your responses.`;

export default function Playground() {
  const [userPrompt, setUserPrompt] = useState("");
  const [systemPrompt, setSystemPrompt] = useState(defaultSystemPrompt);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verboseMode, setVerboseMode] = useState(false);

  const handleRun = async () => {
    if (!userPrompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a prompt to test.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const aiResponse = await generateAIResponse(
        userPrompt,
        verboseMode ? systemPrompt + "\n\nProvide verbose, detailed responses." : systemPrompt
      );
      setResponse(aiResponse);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate response.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUserPrompt("");
    setSystemPrompt(defaultSystemPrompt);
    setResponse("");
    setVerboseMode(false);
    toast({
      title: "Reset Complete",
      description: "Playground has been reset to defaults.",
    });
  };

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(response);
    toast({
      title: "Copied",
      description: "Response copied to clipboard.",
    });
  };

  const handleExampleClick = (prompt: string) => {
    setUserPrompt(prompt);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">AI Playground</h1>
            <p className="text-muted-foreground">
              Experiment with different prompts and system instructions
            </p>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Experimental
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Prompts */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="user" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="user" className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  User Prompt
                </TabsTrigger>
                <TabsTrigger value="system" className="gap-2">
                  <Settings2 className="w-4 h-4" />
                  System Instructions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Test Prompt</CardTitle>
                    <CardDescription>
                      Enter a booking-related query to test the AI agent
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={userPrompt}
                      onChange={(e) => setUserPrompt(e.target.value)}
                      placeholder="e.g., Book a train ticket from Chennai to Bangalore tomorrow"
                      className="min-h-[120px] resize-none"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Instructions</CardTitle>
                    <CardDescription>
                      Modify the AI agent's behavior and personality
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      className="min-h-[200px] resize-none font-mono text-sm"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                onClick={handleRun}
                disabled={isLoading}
                variant="hero"
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Run Prompt
                  </>
                )}
              </Button>

              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                <Switch
                  id="verbose"
                  checked={verboseMode}
                  onCheckedChange={setVerboseMode}
                />
                <Label htmlFor="verbose" className="text-sm">
                  Verbose Mode
                </Label>
              </div>
            </div>

            {/* Response */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Response
                  </CardTitle>
                  <CardDescription>
                    {response ? "Generated response from the AI agent" : "Response will appear here"}
                  </CardDescription>
                </div>
                {response && (
                  <Button variant="ghost" size="sm" onClick={handleCopyResponse}>
                    <Copy className="w-4 h-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {response ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap bg-muted p-4 rounded-lg text-sm">
                      {response}
                    </pre>
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center text-muted-foreground">
                    Click "Run Prompt" to see the AI response
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Examples */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Example Prompts</CardTitle>
                <CardDescription>
                  Click to load an example
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {examplePrompts.map((example, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(example.prompt)}
                    className="w-full text-left p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <p className="font-medium text-sm">{example.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {example.description}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  • Try specific queries with locations and dates for best results
                </p>
                <p>
                  • Modify system instructions to change agent personality
                </p>
                <p>
                  • Enable verbose mode for detailed explanations
                </p>
                <p>
                  • Compare responses between concise and verbose modes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
