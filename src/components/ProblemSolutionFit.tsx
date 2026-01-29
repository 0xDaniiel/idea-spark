import { CheckCircle, Target, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProblemSolutionFit as ProblemSolutionFitType } from "@/types/analysis";

interface ProblemSolutionFitProps {
  data: ProblemSolutionFitType;
}

export function ProblemSolutionFit({ data }: ProblemSolutionFitProps) {
  const getFitColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-amber-500";
    return "text-red-500";
  };

  const getFitLabel = (score: number) => {
    if (score >= 9) return "Excellent Fit";
    if (score >= 7) return "Strong Fit";
    if (score >= 5) return "Moderate Fit";
    if (score >= 3) return "Weak Fit";
    return "Poor Fit";
  };

  return (
    <div className="space-y-6">
      {/* Fit Score */}
      <Card className="gradient-card shadow-card border-0 overflow-hidden">
        <CardContent className="pt-6 pb-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground mb-2">Problem-Solution Fit</p>
            <div className={`text-6xl font-bold ${getFitColor(data.fitScore)}`}>
              {data.fitScore}/10
            </div>
            <p className={`text-lg font-medium mt-2 ${getFitColor(data.fitScore)}`}>
              {getFitLabel(data.fitScore)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="gradient-card shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              The Problem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{data.problem}</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-green-500" />
              The Solution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{data.solution}</p>
          </CardContent>
        </Card>
      </div>

      {/* Validation */}
      <Card className="gradient-card shadow-card border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Validation Analysis
          </CardTitle>
          <CardDescription>Why this score was assigned</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed">{data.validation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
