
import React from 'react';
import { AIModel } from '../types';
import { Cpu, Zap, DollarSign, Box, CheckCircle2 } from 'lucide-react';
import { ModelIcon } from './ModelIcon';

interface Props {
  model: AIModel;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export const ModelCard: React.FC<Props> = ({ model, isSelected, onToggle }) => {
  return (
    <div 
      onClick={() => onToggle(model.id)}
      className={`
        relative group p-6 rounded-2xl cursor-pointer transition-all duration-300 border glass-panel glass-card-hover
        ${isSelected 
          ? 'border-primary/50 shadow-[0_0_20px_rgba(56,189,248,0.2)] bg-white/10' 
          : 'border-white/5 bg-white/5'}
      `}
    >
      {isSelected && (
        <div className="absolute -top-3 -right-3 bg-primary text-black px-2 py-1 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.6)] animate-fade-in-up">
          <CheckCircle2 size={20} fill="white" className="text-primary" />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300"
            style={{ backgroundColor: model.color, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
          >
            <ModelIcon provider={model.provider} className="w-7 h-7" color="white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg leading-tight text-text-main">{model.name}</h3>
            <span className="text-xs font-bold text-text-sub uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded-md">{model.provider}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-sub mb-6 line-clamp-2 h-10 leading-relaxed font-medium opacity-80">
        {model.description}
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-surface-light p-2.5 rounded-lg border border-white/5 group-hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-1 text-text-sub mb-1 font-semibold">
            <Box size={12} className="text-primary" /> <span>Context</span>
          </div>
          <div className="font-mono font-bold text-text-main">{(model.contextWindow / 1000)}k</div>
        </div>
        <div className="bg-surface-light p-2.5 rounded-lg border border-white/5 group-hover:border-secondary/30 transition-colors">
          <div className="flex items-center gap-1 text-text-sub mb-1 font-semibold">
            <Zap size={12} className="text-secondary" /> <span>MMLU</span>
          </div>
          <div className="font-mono font-bold text-text-main">{model.benchmarks.mmlu}%</div>
        </div>
        <div className="bg-surface-light p-2.5 rounded-lg border border-white/5 group-hover:border-accent/30 transition-colors">
          <div className="flex items-center gap-1 text-text-sub mb-1 font-semibold">
            <Cpu size={12} className="text-accent" /> <span>Code</span>
          </div>
          <div className="font-mono font-bold text-text-main">{model.benchmarks.humanEval}%</div>
        </div>
        <div className="bg-surface-light p-2.5 rounded-lg border border-white/5 group-hover:border-green-400/30 transition-colors">
          <div className="flex items-center gap-1 text-text-sub mb-1 font-semibold">
            <DollarSign size={12} className="text-green-400" /> <span>In/1M</span>
          </div>
          <div className="font-mono font-bold text-text-main">${model.pricing.input}</div>
        </div>
      </div>
    </div>
  );
};
