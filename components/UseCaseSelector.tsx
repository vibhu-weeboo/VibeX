import React from 'react';
import { Code2, BrainCircuit, Coins, PenTool, Zap } from 'lucide-react';
import { AIModel } from '../types';

interface Props {
  models: AIModel[];
  onSelect: (ids: string[]) => void;
}

export const UseCaseSelector: React.FC<Props> = ({ models, onSelect }) => {
  
  const handlePreset = (type: 'code' | 'reasoning' | 'budget' | 'creative' | 'speed') => {
    let selected: string[] = [];
    
    switch(type) {
      case 'code':
        // Prioritize HumanEval
        selected = [...models].sort((a, b) => b.benchmarks.humanEval - a.benchmarks.humanEval).slice(0, 3).map(m => m.id);
        break;
      case 'reasoning':
        // Prioritize Math/MMLU
        selected = [...models].sort((a, b) => b.benchmarks.math - a.benchmarks.math).slice(0, 3).map(m => m.id);
        break;
      case 'budget':
        // Prioritize Low Cost
        selected = [...models].sort((a, b) => a.pricing.input - b.pricing.input).slice(0, 3).map(m => m.id);
        break;
      case 'creative':
        // Logic: High MMLU + Multimodal support usually correlates with better creative
        selected = ['gpt-4o', 'gemini-1.5-pro', 'claude-3-5-sonnet'];
        break;
      case 'speed':
        selected = ['gemini-2.5-flash', 'deepseek-v3', 'llama-3-1-405b'];
        break;
    }
    // Filter out any IDs that might not exist in the current filtered set (though unlikely with static data)
    const validIds = selected.filter(id => models.find(m => m.id === id));
    if (validIds.length > 0) onSelect(validIds);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <div className="text-xs font-bold text-text-sub uppercase tracking-wider self-center mr-2">Smart Presets:</div>
      
      <button onClick={() => handlePreset('code')} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary/20 hover:border-primary/40 border border-white/10 rounded-full text-sm font-medium text-text-main transition-all group">
        <Code2 size={16} className="text-accent group-hover:text-primary" /> Coding
      </button>

      <button onClick={() => handlePreset('reasoning')} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-secondary/20 hover:border-secondary/40 border border-white/10 rounded-full text-sm font-medium text-text-main transition-all group">
        <BrainCircuit size={16} className="text-secondary" /> Reasoning
      </button>

      <button onClick={() => handlePreset('creative')} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-purple-500/20 hover:border-purple-500/40 border border-white/10 rounded-full text-sm font-medium text-text-main transition-all group">
        <PenTool size={16} className="text-purple-400" /> Creative
      </button>

      <button onClick={() => handlePreset('budget')} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-green-500/20 hover:border-green-500/40 border border-white/10 rounded-full text-sm font-medium text-text-main transition-all group">
        <Coins size={16} className="text-green-400" /> Budget
      </button>
      
      <button onClick={() => handlePreset('speed')} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-yellow-500/20 hover:border-yellow-500/40 border border-white/10 rounded-full text-sm font-medium text-text-main transition-all group">
        <Zap size={16} className="text-yellow-400" /> Speed
      </button>
    </div>
  );
};