import { useState, useCallback } from 'react';

/**
 * Custom React hook that integrates with Chrome's on-device Gemini Nano AI APIs.
 * Falls back to mock responses when APIs are unavailable.
 */
const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastResponse, setLastResponse] = useState(null);

  // Utility function to detect API availability
  const isChromeAIAvailable = () =>
    typeof window !== 'undefined' && !!window.ai?.createTextSession;

  // --- 1️⃣ Expand Ideas ---
  const expandIdeas = useCallback(async (prompt) => {
    setIsLoading(true);
    setError(null);

    try {
      // ✅ Use Chrome's built-in on-device Prompt API if available
      if (isChromeAIAvailable()) {
        const session = await window.ai.createTextSession();
        const result = await session.prompt(`Generate 7 creative brainstorming ideas about: ${prompt}`);
        setLastResponse({ type: 'expand', data: [result] });
        return [result];
      }

      // 🔄 Mock fallback
      const ideas = [
        'Core Concept',
        'Implementation Strategy',
        'Target Audience',
        'Success Metrics',
        'Risk Management',
        'Resource Requirements',
        'Timeline Planning'
      ];
      setLastResponse({ type: 'expand', data: ideas });
      return ideas;
    } catch (err) {
      console.error('AI Error (expandIdeas):', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- 2️⃣ Refine Idea ---
  const refineIdea = useCallback(async (text) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isChromeAIAvailable()) {
        const session = await window.ai.createTextSession();
        const result = await session.prompt(`Refine this idea for clarity and creativity: ${text}`);
        setLastResponse({ type: 'refine', data: result });
        return result;
      }

      const refined = `${text} (refined for clarity and impact)`;
      setLastResponse({ type: 'refine', data: refined });
      return refined;
    } catch (err) {
      console.error('AI Error (refineIdea):', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- 3️⃣ Summarize Ideas ---
  const summarizeIdeas = useCallback(async (ideas) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isChromeAIAvailable()) {
        const session = await window.ai.createTextSession();
        const result = await session.prompt(
          `Summarize these brainstorming ideas into a concise, actionable plan:\n${ideas.join('\n')}`
        );
        setLastResponse({ type: 'summarize', data: result });
        return result;
      }

      const summary = `Summary: ${ideas.join(', ')}`;
      setLastResponse({ type: 'summarize', data: summary });
      return summary;
    } catch (err) {
      console.error('AI Error (summarizeIdeas):', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // --- Check Chrome AI availability ---
  const checkChromeAI = useCallback(() => ({
    available: isChromeAIAvailable(),
    version: window?.ai?.version ?? 'Fallback',
  }), []);

  return {
    isLoading,
    error,
    lastResponse,
    expandIdeas,
    refineIdea,
    summarizeIdeas,
    checkChromeAI
  };
};

export default useAI;
