import { useState } from "react";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface IdeaInputProps {
  onSubmit: (idea: string) => void;
  isLoading: boolean;
}

export function IdeaInput({ onSubmit, isLoading }: IdeaInputProps) {
  const [idea, setIdea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim().length >= 10) {
      onSubmit(idea);
    }
  };

  const exampleIdeas = [
    "An app that connects local farmers directly with urban consumers for fresh produce delivery",
    "A platform that uses AI to generate personalized workout plans based on home equipment",
    "A subscription service for curated vintage clothing matched to your style preferences",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-hero shadow-glow mb-6">
          <Lightbulb className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Validate Your <span className="text-gradient">Startup Idea</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Enter your startup concept and get AI-powered insights: taglines, target audiences, value propositions, and simulated customer interviews.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea in detail... What problem does it solve? Who is it for? What makes it unique?"
            className="min-h-[160px] resize-none text-base p-5 rounded-xl border-2 border-border bg-card shadow-card transition-all duration-300 focus:border-primary focus:shadow-soft focus:ring-2 focus:ring-primary/20"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-sm text-muted-foreground">
            {idea.length} characters
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={idea.trim().length < 10 || isLoading}
          className="w-full h-14 text-lg font-semibold rounded-xl gradient-hero hover:opacity-90 transition-all duration-300 shadow-soft hover:shadow-glow disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Your Idea...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Validate My Idea
            </>
          )}
        </Button>
      </form>

      <div className="mt-8">
        <p className="text-sm text-muted-foreground text-center mb-3">Try an example:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {exampleIdeas.map((example, i) => (
            <button
              key={i}
              onClick={() => setIdea(example)}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-secondary hover:bg-accent text-secondary-foreground rounded-lg transition-colors duration-200 text-left max-w-xs truncate disabled:opacity-50"
            >
              {example.slice(0, 50)}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
