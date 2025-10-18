import { useState, useCallback } from 'react';

// Mock AI responses that simulate Chrome AI API behavior
const mockAIResponses = {
  expand: (prompt) => {
    // Generate ideas based on the prompt
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('hackathon') || lowerPrompt.includes('ai hackathon')) {
      return [
        'Problem Identification',
        'Solution Architecture', 
        'Tech Stack Selection',
        'Team Formation',
        'MVP Development',
        'Demo Preparation',
        'Pitch Strategy'
      ];
    }
    
    if (lowerPrompt.includes('startup') || lowerPrompt.includes('business')) {
      return [
        'Market Research',
        'Business Model',
        'Funding Strategy',
        'Product Development',
        'Marketing Plan',
        'Team Building',
        'Operations'
      ];
    }
    
    if (lowerPrompt.includes('app') || lowerPrompt.includes('mobile')) {
      return [
        'User Experience Design',
        'Technical Architecture',
        'Development Timeline',
        'Testing Strategy',
        'App Store Optimization',
        'Monetization Model',
        'Marketing Launch'
      ];
    }
    
    if (lowerPrompt.includes('website') || lowerPrompt.includes('web')) {
      return [
        'Design & Wireframes',
        'Frontend Development',
        'Backend Infrastructure',
        'Database Design',
        'SEO Optimization',
        'Performance Optimization',
        'Deployment Strategy'
      ];
    }
    
    if (lowerPrompt.includes('marketing') || lowerPrompt.includes('brand')) {
      return [
        'Target Audience',
        'Brand Identity',
        'Content Strategy',
        'Social Media Plan',
        'Advertising Campaigns',
        'Analytics & Metrics',
        'Budget Allocation'
      ];
    }
    
    // Generic expansion for any topic
    return [
      'Core Concept',
      'Implementation Strategy',
      'Target Audience',
      'Success Metrics',
      'Risk Management',
      'Resource Requirements',
      'Timeline Planning'
    ];
  },
  
  refine: (text) => {
    const refinements = {
      'good shoes': 'Premium sustainable footwear with innovative design',
      'marketing': 'Multi-channel digital marketing strategy targeting eco-conscious consumers',
      'materials': 'Certified organic and recycled materials with minimal environmental impact',
      'packaging': 'Biodegradable packaging made from recycled materials',
      'shipping': 'Carbon-neutral shipping with offset programs'
    };
    
    return refinements[text.toLowerCase()] || `${text} - enhanced and refined for better impact`;
  },
  
  summarize: (ideas) => {
    if (ideas.length === 0) return 'No ideas to summarize';
    
    const categories = ideas.reduce((acc, idea) => {
      const category = idea.text.split(' ')[0]; // Simple categorization
      if (!acc[category]) acc[category] = [];
      acc[category].push(idea.text);
      return acc;
    }, {});
    
    const summary = Object.entries(categories)
      .map(([category, items]) => `${category}: ${items.join(', ')}`)
      .join('\n');
    
    return `Action Summary:\n${summary}\n\nNext Steps: Prioritize implementation based on impact and feasibility.`;
  },
  
  translate: (text, language) => {
    const translations = {
      spanish: {
        'eco-friendly shoes': 'zapatos ecológicos',
        'sustainable materials': 'materiales sostenibles',
        'carbon neutral': 'carbono neutral',
        'biodegradable packaging': 'embalaje biodegradable'
      },
      french: {
        'eco-friendly shoes': 'chaussures écologiques',
        'sustainable materials': 'matériaux durables',
        'carbon neutral': 'neutre en carbone',
        'biodegradable packaging': 'emballage biodégradable'
      },
      hindi: {
        'eco-friendly shoes': 'पर्यावरण अनुकूल जूते',
        'sustainable materials': 'टिकाऊ सामग्री',
        'carbon neutral': 'कार्बन तटस्थ',
        'biodegradable packaging': 'बायोडिग्रेडेबल पैकेजिंग'
      }
    };
    
    return translations[language]?.[text.toLowerCase()] || `${text} (${language})`;
  }
};

// Simulate Chrome AI API calls with realistic delays
const simulateAI = async (operation, ...args) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simulate occasional failures
  if (Math.random() < 0.1) {
    throw new Error('AI service temporarily unavailable');
  }
  
  return mockAIResponses[operation](...args);
};

const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastResponse, setLastResponse] = useState(null);

  const expandIdeas = useCallback(async (prompt) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const expandedIdeas = await simulateAI('expand', prompt);
      setLastResponse({ type: 'expand', data: expandedIdeas });
      return expandedIdeas;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refineIdea = useCallback(async (text) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const refinedText = await simulateAI('refine', text);
      setLastResponse({ type: 'refine', data: refinedText });
      return refinedText;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const summarizeIdeas = useCallback(async (ideas) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const summary = await simulateAI('summarize', ideas);
      setLastResponse({ type: 'summarize', data: summary });
      return summary;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const translateIdea = useCallback(async (text, language = 'spanish') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const translation = await simulateAI('translate', text, language);
      setLastResponse({ type: 'translate', data: translation });
      return translation;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check if Chrome AI APIs are available (for future use)
  const checkChromeAI = useCallback(() => {
    return {
      available: typeof window !== 'undefined' && 
                (window.ai || window.chrome?.ai || navigator.ai),
      apis: {
        prompt: window.ai?.prompt,
        writer: window.ai?.writer,
        rewriter: window.ai?.rewriter,
        summarizer: window.ai?.summarizer,
        translator: window.ai?.translator
      }
    };
  }, []);

  return {
    isLoading,
    error,
    lastResponse,
    expandIdeas,
    refineIdea,
    summarizeIdeas,
    translateIdea,
    checkChromeAI
  };
};

export default useAI;
