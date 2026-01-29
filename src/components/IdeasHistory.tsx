import { format } from "date-fns";
import { Star, Trash2, ChevronRight, StarOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { SavedIdea, IdeaAnalysis } from "@/types/analysis";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface IdeasHistoryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ideas: SavedIdea[];
  loading: boolean;
  onSelect: (idea: SavedIdea) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onDelete: (id: string) => void;
}

export function IdeasHistory({
  open,
  onOpenChange,
  ideas,
  loading,
  onSelect,
  onToggleFavorite,
  onDelete,
}: IdeasHistoryProps) {
  const favorites = ideas.filter((idea) => idea.is_favorite);
  const others = ideas.filter((idea) => !idea.is_favorite);

  const getScore = (analysis: IdeaAnalysis) => {
    return analysis?.ideaScore?.overall || null;
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 70) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  };

  const IdeaItem = ({ idea }: { idea: SavedIdea }) => {
    const score = getScore(idea.analysis);
    
    return (
      <div
        className="group p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-accent/30 transition-all cursor-pointer"
        onClick={() => {
          onSelect(idea);
          onOpenChange(false);
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium line-clamp-2 mb-1">
              {idea.idea_text.slice(0, 100)}...
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{format(new Date(idea.created_at), "MMM d, yyyy")}</span>
              {score && (
                <span className={`font-semibold ${getScoreColor(score)}`}>
                  Score: {score}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(idea.id, idea.is_favorite);
              }}
            >
              {idea.is_favorite ? (
                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              ) : (
                <StarOff className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(idea.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="gradient-text">Saved Ideas</SheetTitle>
        </SheetHeader>

        {loading ? (
          <div className="space-y-4 mt-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No saved ideas yet.</p>
            <p className="text-sm mt-1">Validate an idea to get started!</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
            <div className="space-y-6">
              {favorites.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-amber-500" />
                    Favorites
                  </h3>
                  <div className="space-y-2">
                    {favorites.map((idea) => (
                      <IdeaItem key={idea.id} idea={idea} />
                    ))}
                  </div>
                </div>
              )}

              {others.length > 0 && (
                <div>
                  {favorites.length > 0 && (
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                      All Ideas
                    </h3>
                  )}
                  <div className="space-y-2">
                    {others.map((idea) => (
                      <IdeaItem key={idea.id} idea={idea} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
