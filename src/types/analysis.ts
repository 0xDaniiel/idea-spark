export interface TargetAudience {
  name: string;
  description: string;
  painPoints: string[];
  demographics?: string;
  interests?: string[];
}

export interface ValueProposition {
  title: string;
  description: string;
}

export interface InterviewQuestion {
  question: string;
  expectedAnswer: string;
  insight: string;
}

export interface CustomerInterview {
  questions: InterviewQuestion[];
}

export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  differentiator: string;
}

export interface MarketValidation {
  marketSize: string;
  growthTrend: string;
  competitors: Competitor[];
  opportunities: string[];
  threats: string[];
}

export interface ProblemSolutionFit {
  problem: string;
  solution: string;
  fitScore: number;
  validation: string;
}

export interface FundingStrategy {
  stage: string;
  recommendedPath: string;
  fundingOptions: {
    type: string;
    description: string;
    pros: string[];
    cons: string[];
  }[];
  revenueModels: {
    model: string;
    description: string;
    estimatedRevenue: string;
  }[];
}

export interface IdeaScore {
  overall: number;
  marketSize: number;
  competition: number;
  uniqueness: number;
  feasibility: number;
  scalability: number;
}

export interface BrainstormIdea {
  title: string;
  description: string;
  improvement: string;
}

export interface IdeaAnalysis {
  taglines: string[];
  targetAudiences: TargetAudience[];
  valuePropositions: ValueProposition[];
  customerInterview: CustomerInterview;
  pitchSummary: string;
  marketValidation: MarketValidation;
  problemSolutionFit: ProblemSolutionFit;
  fundingStrategy: FundingStrategy;
  ideaScore: IdeaScore;
  brainstormIdeas: BrainstormIdea[];
}

export interface SavedIdea {
  id: string;
  user_id: string;
  idea_text: string;
  analysis: IdeaAnalysis;
  overall_score: number | null;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}
