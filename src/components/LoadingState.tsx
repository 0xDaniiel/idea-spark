import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-hero shadow-glow mb-6">
          <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Analyzing Your Startup Idea</h2>
        <p className="text-muted-foreground">Our AI is generating comprehensive insights...</p>
      </div>

      <div className="space-y-4">
        {["Generating taglines...", "Identifying target audiences...", "Building value propositions...", "Simulating customer interviews..."].map((step, i) => (
          <div
            key={i}
            className="h-16 rounded-xl bg-muted animate-shimmer"
            style={{
              animationDelay: `${i * 0.2}s`,
              background: "linear-gradient(90deg, hsl(var(--muted)) 25%, hsl(var(--secondary)) 50%, hsl(var(--muted)) 75%)",
              backgroundSize: "200% 100%",
            }}
          />
        ))}
      </div>
    </div>
  );
}
