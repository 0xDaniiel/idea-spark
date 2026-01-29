import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { IdeaAnalysis, SavedIdea } from '@/types/analysis';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';

export function useSavedIdeas() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedIdeas();
    } else {
      setSavedIdeas([]);
    }
  }, [user]);

  const fetchSavedIdeas = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setSavedIdeas((data || []) as unknown as SavedIdea[]);
    } catch (error) {
      console.error('Error fetching saved ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveIdea = async (ideaText: string, analysis: IdeaAnalysis) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save your ideas.",
        variant: "destructive",
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('saved_ideas')
        .insert([{
          user_id: user.id,
          idea_text: ideaText,
          analysis: analysis as unknown as Json,
          overall_score: analysis.ideaScore?.overall || null,
        }])
        .select()
        .single();

      if (error) throw error;

      const newIdea = data as unknown as SavedIdea;
      setSavedIdeas((prev) => [newIdea, ...prev]);
      
      toast({
        title: "Idea saved!",
        description: "Your idea has been saved to your history.",
      });
      
      return newIdea;
    } catch (error) {
      console.error('Error saving idea:', error);
      toast({
        title: "Failed to save",
        description: "There was an error saving your idea.",
        variant: "destructive",
      });
      return null;
    }
  };

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const { error } = await supabase
        .from('saved_ideas')
        .update({ is_favorite: !isFavorite })
        .eq('id', id);

      if (error) throw error;

      setSavedIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id ? { ...idea, is_favorite: !isFavorite } : idea
        )
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const deleteIdea = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_ideas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setSavedIdeas((prev) => prev.filter((idea) => idea.id !== id));
      
      toast({
        title: "Idea deleted",
        description: "Your idea has been removed.",
      });
    } catch (error) {
      console.error('Error deleting idea:', error);
    }
  };

  return {
    savedIdeas,
    loading,
    saveIdea,
    toggleFavorite,
    deleteIdea,
    refetch: fetchSavedIdeas,
  };
}
