import { useState } from "react";
import { Quote, Users, Zap, MessageCircle, ArrowLeft, Copy, Check, TrendingUp, BarChart3, DollarSign, Lightbulb, CheckCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketValidation } from "@/components/MarketValidation";
import { IdeaScore } from "@/components/IdeaScore";
import { FundingStrategy } from "@/components/FundingStrategy";
import { BrainstormMode } from "@/components/BrainstormMode";
import { ProblemSolutionFit } from "@/components/ProblemSolutionFit";
import type { IdeaAnalysis } from "@/types/analysis";

interface ResultsSectionProps {
  analysis: IdeaAnalysis;
  originalIdea: string;
  onReset: () => void;
  onSave?: () => void;
  onValidateIdea?: (idea: string) => void;
  isSaved?: boolean;
}

export function ResultsSection({ 
  analysis, 
  originalIdea, 
  onReset, 
  onSave, 
  onValidateIdea,
  isSaved = false 
}: ResultsSectionProps) {
  const [copiedTagline, setCopiedTagline] = useState<number | null>(null);

  const copyTagline = async (tagline: string, index: number) => {
    await navigator.clipboard.writeText(tagline);
    setCopiedTagline(index);
    setTimeout(() => setCopiedTagline(null), 2000);
  };

  const getScoreColor = (score: number | undefined) => {
    if (!score) return "text-muted-foreground";
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-up">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <Button
          variant="ghost"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Validate Another Idea
        </Button>
        
        <div className="flex items-center gap-3">
          {analysis.ideaScore && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
              <span className="text-sm text-muted-foreground">Score:</span>
              <span className={`text-xl font-bold ${getScoreColor(analysis.ideaScore.overall)}`}>
                {analysis.ideaScore.overall}
              </span>
            </div>
          )}
          
          {onSave && (
            <Button 
              onClick={onSave} 
              disabled={isSaved}
              className="gradient-hero"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Idea
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Pitch Summary */}
      <Card className="mb-8 gradient-card shadow-card border-0 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <Quote className="w-5 h-5 text-primary" />
            Elevator Pitch
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{analysis.pitchSummary}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="score" className="space-y-6">
        <TabsList className="w-full h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {analysis.ideaScore && (
            <TabsTrigger
              value="score"
              className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Score
            </TabsTrigger>
          )}
          {analysis.problemSolutionFit && (
            <TabsTrigger
              value="fit"
              className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Problem-Fit
            </TabsTrigger>
          )}
          {analysis.marketValidation && (
            <TabsTrigger
              value="market"
              className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Market
            </TabsTrigger>
          )}
          <TabsTrigger
            value="taglines"
            className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
          >
            <Quote className="w-4 h-4 mr-2" />
            Taglines
          </TabsTrigger>
          <TabsTrigger
            value="audiences"
            className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
          >
            <Users className="w-4 h-4 mr-2" />
            Audiences
          </TabsTrigger>
          <TabsTrigger
            value="value"
            className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
          >
            <Zap className="w-4 h-4 mr-2" />
            Value Props
          </TabsTrigger>
          <TabsTrigger
            value="interview"
            className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Interview
          </TabsTrigger>
          {analysis.fundingStrategy && (
            <TabsTrigger
              value="funding"
              className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Funding
            </TabsTrigger>
          )}
          {analysis.brainstormIdeas && analysis.brainstormIdeas.length > 0 && (
            <TabsTrigger
              value="brainstorm"
              className="data-[state=active]:gradient-hero data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft rounded-lg px-4 py-2"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Brainstorm
            </TabsTrigger>
          )}
        </TabsList>

        {/* Score Tab */}
        {analysis.ideaScore && (
          <TabsContent value="score">
            <IdeaScore score={analysis.ideaScore} />
          </TabsContent>
        )}

        {/* Problem-Solution Fit Tab */}
        {analysis.problemSolutionFit && (
          <TabsContent value="fit">
            <ProblemSolutionFit data={analysis.problemSolutionFit} />
          </TabsContent>
        )}

        {/* Market Tab */}
        {analysis.marketValidation && (
          <TabsContent value="market">
            <MarketValidation data={analysis.marketValidation} />
          </TabsContent>
        )}

        {/* Taglines Tab */}
        <TabsContent value="taglines" className="space-y-4">
          {analysis.taglines.map((tagline, i) => (
            <Card
              key={i}
              className="group gradient-card shadow-card border-0 hover:shadow-soft transition-all duration-300"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <p className="text-xl font-medium">"{tagline}"</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyTagline(tagline, i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedTagline === i ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Audiences Tab */}
        <TabsContent value="audiences" className="grid md:grid-cols-2 gap-4">
          {analysis.targetAudiences.map((audience, i) => (
            <Card key={i} className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg">{audience.name}</CardTitle>
                <CardDescription>{audience.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {audience.demographics && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Demographics</p>
                    <p className="text-sm">{audience.demographics}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Pain Points</p>
                  <div className="flex flex-wrap gap-2">
                    {audience.painPoints.map((point, j) => (
                      <Badge key={j} variant="secondary" className="text-xs">
                        {point}
                      </Badge>
                    ))}
                  </div>
                </div>
                {audience.interests && audience.interests.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {audience.interests.map((interest, j) => (
                        <Badge key={j} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Value Props Tab */}
        <TabsContent value="value" className="grid md:grid-cols-2 gap-4">
          {analysis.valuePropositions.map((prop, i) => (
            <Card key={i} className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  {prop.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{prop.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Interview Tab */}
        <TabsContent value="interview" className="space-y-6">
          <Card className="gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Simulated Customer Interview
              </CardTitle>
              <CardDescription>
                Use these questions to validate your idea with real potential customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {analysis.customerInterview.questions.map((q, i) => (
                <div key={i} className="space-y-3 p-4 bg-secondary/50 rounded-xl">
                  <div>
                    <Badge className="mb-2 gradient-hero text-primary-foreground">Question {i + 1}</Badge>
                    <p className="font-medium text-lg">{q.question}</p>
                  </div>
                  <div className="pl-4 border-l-2 border-primary/30">
                    <p className="text-sm text-muted-foreground mb-1">Expected Answer:</p>
                    <p className="text-secondary-foreground italic">"{q.expectedAnswer}"</p>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-accent-foreground">💡 Insight: {q.insight}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Funding Tab */}
        {analysis.fundingStrategy && (
          <TabsContent value="funding">
            <FundingStrategy data={analysis.fundingStrategy} />
          </TabsContent>
        )}

        {/* Brainstorm Tab */}
        {analysis.brainstormIdeas && analysis.brainstormIdeas.length > 0 && (
          <TabsContent value="brainstorm">
            <BrainstormMode 
              ideas={analysis.brainstormIdeas} 
              onSelectIdea={onValidateIdea}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
