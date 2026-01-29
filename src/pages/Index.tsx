import { useState } from "react";
import { IdeaInput } from "@/components/IdeaInput";
import { LoadingState } from "@/components/LoadingState";
import { ResultsSection } from "@/components/ResultsSection";
import { Header } from "@/components/Header";
import { IdeasHistory } from "@/components/IdeasHistory";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSavedIdeas } from "@/hooks/useSavedIdeas";
import type { IdeaAnalysis, SavedIdea } from "@/types/analysis";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<IdeaAnalysis | null>(null);
  const [originalIdea, setOriginalIdea] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [currentSavedId, setCurrentSavedId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const { savedIdeas, loading: historyLoading, saveIdea, toggleFavorite, deleteIdea } = useSavedIdeas();

  const validateIdea = async (idea: string) => {
    setIsLoading(true);
    setOriginalIdea(idea);
    setCurrentSavedId(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-idea`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ idea }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to validate idea");
      }

      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Validation error:", error);
      toast({
        title: "Validation Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setOriginalIdea("");
    setCurrentSavedId(null);
  };

  const handleSave = async () => {
    if (!analysis) return;
    const saved = await saveIdea(originalIdea, analysis);
    if (saved) {
      setCurrentSavedId(saved.id);
    }
  };

  const handleSelectSavedIdea = (savedIdea: SavedIdea) => {
    setOriginalIdea(savedIdea.idea_text);
    setAnalysis(savedIdea.analysis);
    setCurrentSavedId(savedIdea.id);
  };

  const handleValidateFromBrainstorm = (ideaDescription: string) => {
    handleReset();
    validateIdea(ideaDescription);
  };

  return (
    <div className="min-h-screen gradient-subtle">
      <Header onShowHistory={() => setShowHistory(true)} />
      
      <div className="container py-12 px-4 md:px-8">
        {isLoading ? (
          <LoadingState />
        ) : analysis ? (
          <ResultsSection
            analysis={analysis}
            originalIdea={originalIdea}
            onReset={handleReset}
            onSave={user ? handleSave : undefined}
            onValidateIdea={handleValidateFromBrainstorm}
            isSaved={!!currentSavedId}
          />
        ) : (
          <IdeaInput onSubmit={validateIdea} isLoading={isLoading} />
        )}
      </div>

      {/* Ideas History Sidebar */}
      <IdeasHistory
        open={showHistory}
        onOpenChange={setShowHistory}
        ideas={savedIdeas}
        loading={historyLoading}
        onSelect={handleSelectSavedIdea}
        onToggleFavorite={toggleFavorite}
        onDelete={deleteIdea}
      />

      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Index;
