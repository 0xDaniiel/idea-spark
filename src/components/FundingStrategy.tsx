import { DollarSign, TrendingUp, Rocket, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { FundingStrategy as FundingStrategyType } from "@/types/analysis";

interface FundingStrategyProps {
  data: FundingStrategyType;
}

export function FundingStrategy({ data }: FundingStrategyProps) {
  return (
    <div className="space-y-6">
      {/* Stage & Path */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="gradient-card shadow-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Current Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="gradient-hero text-primary-foreground text-lg px-4 py-1">
              {data.stage}
            </Badge>
          </CardContent>
        </Card>

        <Card className="gradient-card shadow-card border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Recommended Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium">{data.recommendedPath}</p>
          </CardContent>
        </Card>
      </div>

      {/* Funding Options */}
      {data.fundingOptions && data.fundingOptions.length > 0 && (
        <Card className="gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Funding Options
            </CardTitle>
            <CardDescription>Different paths to fund your startup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.fundingOptions.map((option, i) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/30 space-y-3">
                <div>
                  <h4 className="font-semibold text-lg">{option.type}</h4>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Pros</p>
                    <ul className="space-y-1">
                      {option.pros.map((pro, j) => (
                        <li key={j} className="text-sm flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Cons</p>
                    <ul className="space-y-1">
                      {option.cons.map((con, j) => (
                        <li key={j} className="text-sm flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Revenue Models */}
      {data.revenueModels && data.revenueModels.length > 0 && (
        <Card className="gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Revenue Models
            </CardTitle>
            <CardDescription>How to monetize your startup</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.revenueModels.map((model, i) => (
                <div key={i} className="p-4 rounded-xl bg-secondary/30 space-y-2">
                  <Badge variant="outline" className="mb-1">{model.model}</Badge>
                  <p className="text-sm text-muted-foreground">{model.description}</p>
                  <p className="text-lg font-bold text-primary">{model.estimatedRevenue}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
