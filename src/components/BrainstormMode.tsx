import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BrainstormIdea } from "@/types/analysis";

interface BrainstormModeProps {
  ideas: BrainstormIdea[];
  onSelectIdea?: (idea: string) => void;
}

export function BrainstormMode({ ideas, onSelectIdea }: BrainstormModeProps) {
  return (
    <Card className="gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Brainstorm Mode
        </CardTitle>
        <CardDescription>
          AI-generated spin-offs and improvements to your original idea
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {ideas.map((idea, i) => (
          <div
            key={i}
            className="group p-5 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full gradient-hero flex items-center justify-center shrink-0">
                  <Lightbulb className="h-4 w-4 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-lg">{idea.title}</h4>
              </div>
              {onSelectIdea && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectIdea(idea.description)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  Validate This
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
            
            <p className="text-muted-foreground">{idea.description}</p>
            
            <div className="pt-2 border-t border-border/50">
              <p className="text-sm">
                <span className="font-medium text-primary">Why it's better: </span>
                {idea.improvement}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
