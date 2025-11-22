import React from 'react';
import { Calendar, FilterX } from 'lucide-react';

interface Props {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onReset: () => void;
}

export const DateFilter: React.FC<Props> = ({ startDate, endDate, onStartDateChange, onEndDateChange, onReset }) => {
  return (
    <div className="flex flex-wrap items-center gap-3 p-1.5 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
        <Calendar size={16} className="text-primary" />
        <span className="text-xs font-display font-bold uppercase tracking-wider text-text-sub">Released</span>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
            <input
              type="month"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="bg-transparent hover:bg-white/5 border-none rounded-lg px-2 py-1.5 text-sm font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer [color-scheme:dark]"
            />
        </div>
        <span className="text-text-sub/40 text-xs font-bold">➜</span>
        <div className="relative">
            <input
              type="month"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="bg-transparent hover:bg-white/5 border-none rounded-lg px-2 py-1.5 text-sm font-medium text-text-main focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer [color-scheme:dark]"
            />
        </div>
      </div>

      <button 
        onClick={onReset}
        className="ml-auto p-2 hover:bg-red-500/10 rounded-lg text-text-sub hover:text-red-400 transition-colors group"
        title="Reset Filter"
      >
        <FilterX size={18} className="group-hover:rotate-90 transition-transform" />
      </button>
    </div>
  );
};