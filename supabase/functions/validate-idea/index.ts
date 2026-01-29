import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== "string" || idea.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: "Please provide a detailed startup idea (at least 10 characters)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert startup advisor, venture capital analyst, and market researcher. Analyze the given startup idea comprehensively and provide actionable insights.

You MUST respond with valid JSON matching this exact structure:
{
  "taglines": ["string", "string", "string"],
  "targetAudiences": [
    { 
      "name": "string", 
      "description": "string", 
      "painPoints": ["string", "string"],
      "demographics": "string",
      "interests": ["string", "string"]
    }
  ],
  "valuePropositions": [
    { "title": "string", "description": "string" }
  ],
  "customerInterview": {
    "questions": [
      { "question": "string", "expectedAnswer": "string", "insight": "string" }
    ]
  },
  "pitchSummary": "string",
  "marketValidation": {
    "marketSize": "string (e.g., '$50B globally by 2025')",
    "growthTrend": "string (e.g., '15% CAGR')",
    "competitors": [
      {
        "name": "string",
        "description": "string",
        "strengths": ["string"],
        "weaknesses": ["string"],
        "differentiator": "string (how the user's idea is different)"
      }
    ],
    "opportunities": ["string"],
    "threats": ["string"]
  },
  "problemSolutionFit": {
    "problem": "string (clear problem statement)",
    "solution": "string (how the idea solves it)",
    "fitScore": number (1-10),
    "validation": "string (why this fit score)"
  },
  "fundingStrategy": {
    "stage": "string (e.g., 'Pre-seed', 'Seed')",
    "recommendedPath": "string",
    "fundingOptions": [
      {
        "type": "string (e.g., 'Bootstrapping', 'Angel Investment')",
        "description": "string",
        "pros": ["string"],
        "cons": ["string"]
      }
    ],
    "revenueModels": [
      {
        "model": "string (e.g., 'SaaS', 'Marketplace')",
        "description": "string",
        "estimatedRevenue": "string"
      }
    ]
  },
  "ideaScore": {
    "overall": number (1-100),
    "marketSize": number (1-10),
    "competition": number (1-10, higher = less competition),
    "uniqueness": number (1-10),
    "feasibility": number (1-10),
    "scalability": number (1-10)
  },
  "brainstormIdeas": [
    {
      "title": "string",
      "description": "string",
      "improvement": "string (why this is better/different)"
    }
  ]
}

Guidelines:
- Generate exactly 3 punchy, memorable taglines
- Identify 2-3 distinct target audiences with detailed buyer personas
- Provide 3-4 key value propositions
- Create 4-5 realistic customer interview questions with expected answers and insights
- Write a compelling 2-3 sentence pitch summary
- Research and identify 2-3 real or hypothetical competitors with honest analysis
- Provide realistic market sizing with sources when possible
- Score the idea honestly - don't inflate scores
- Suggest 2-3 spin-off or improved versions of the idea
- Recommend appropriate funding strategies based on idea stage`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze this startup idea comprehensively and provide full validation insights including market analysis, scoring, funding strategies, and improvement suggestions:\n\n${idea}` },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON from the response
    let analysis;
    try {
      // Try to extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      analysis = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      console.error("Raw content:", content);
      throw new Error("Failed to parse AI analysis. Please try again.");
    }

    return new Response(JSON.stringify({ success: true, analysis }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("validate-idea error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
