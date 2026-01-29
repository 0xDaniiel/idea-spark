import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { IdeaScore as IdeaScoreType } from "@/types/analysis";

interface IdeaScoreProps {
  score: IdeaScoreType;
}

export function IdeaScore({ score }: IdeaScoreProps) {
  const radarData = [
    { metric: "Market Size", value: score.marketSize * 10, fullMark: 100 },
    { metric: "Competition", value: score.competition * 10, fullMark: 100 },
    { metric: "Uniqueness", value: score.uniqueness * 10, fullMark: 100 },
    { metric: "Feasibility", value: score.feasibility * 10, fullMark: 100 },
    { metric: "Scalability", value: score.scalability * 10, fullMark: 100 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Very Good";
    if (score >= 60) return "Good";
    if (score >= 50) return "Fair";
    if (score >= 40) return "Needs Work";
    return "Challenging";
  };

  const getProgressColor = (value: number) => {
    if (value >= 7) return "bg-green-500";
    if (value >= 5) return "bg-amber-500";
    return "bg-red-500";
  };

  const metrics = [
    { label: "Market Size", value: score.marketSize, description: "Potential market opportunity" },
    { label: "Competition", value: score.competition, description: "Lower competition = higher score" },
    { label: "Uniqueness", value: score.uniqueness, description: "How differentiated is your idea" },
    { label: "Feasibility", value: score.feasibility, description: "How realistic to build" },
    { label: "Scalability", value: score.scalability, description: "Growth potential" },
  ];

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="gradient-card shadow-card border-0 overflow-hidden">
        <CardContent className="pt-6 pb-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground mb-2">Overall Score</p>
            <div className={`text-7xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall}
            </div>
            <p className={`text-lg font-medium mt-2 ${getScoreColor(score.overall)}`}>
              {getScoreLabel(score.overall)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card className="gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg">Performance Breakdown</CardTitle>
          <CardDescription>Visual representation of your idea's strengths</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card className="gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="text-lg">Detailed Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{metric.label}</span>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
                <span className={`font-bold text-lg ${metric.value >= 7 ? "text-green-500" : metric.value >= 5 ? "text-amber-500" : "text-red-500"}`}>
                  {metric.value}/10
                </span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getProgressColor(metric.value)}`}
                  style={{ width: `${metric.value * 10}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
