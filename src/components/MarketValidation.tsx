import { TrendingUp, TrendingDown, Target, AlertTriangle, Lightbulb, Building2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { MarketValidation as MarketValidationType, Competitor } from "@/types/analysis";

interface MarketValidationProps {
  data: MarketValidationType;
}

export function MarketValidation({ data }: MarketValidationProps) {
  return (
    <div className="space-y-6">
      {/* Market Overview */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="gradient-card shadow-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Market Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold gradient-text">{data.marketSize}</p>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Growth Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">{data.growthTrend}</p>
          </CardContent>
        </Card>
      </div>

      {/* Competitors */}
      {data.competitors && data.competitors.length > 0 && (
        <Card className="gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Competitive Landscape
            </CardTitle>
            <CardDescription>How your idea compares to existing players</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.competitors.map((competitor, i) => (
              <CompetitorCard key={i} competitor={competitor} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Opportunities & Threats */}
      <div className="grid md:grid-cols-2 gap-4">
        {data.opportunities && data.opportunities.length > 0 && (
          <Card className="gradient-card shadow-card border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-green-500" />
                Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.opportunities.map((opp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{opp}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {data.threats && data.threats.length > 0 && (
          <Card className="gradient-card shadow-card border-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.threats.map((threat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <TrendingDown className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{threat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function CompetitorCard({ competitor }: { competitor: Competitor }) {
  return (
    <div className="p-4 rounded-xl bg-secondary/30 space-y-3">
      <div>
        <h4 className="font-semibold text-lg">{competitor.name}</h4>
        <p className="text-sm text-muted-foreground">{competitor.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Strengths</p>
          <div className="flex flex-wrap gap-1">
            {competitor.strengths.map((s, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-green-500/10 text-green-600">
                {s}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Weaknesses</p>
          <div className="flex flex-wrap gap-1">
            {competitor.weaknesses.map((w, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-red-500/10 text-red-600">
                {w}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-border/50">
        <p className="text-xs font-medium text-muted-foreground mb-1">Your Differentiator</p>
        <p className="text-sm text-primary font-medium">{competitor.differentiator}</p>
      </div>
    </div>
  );
}
