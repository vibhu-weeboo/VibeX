import React, { useState, useMemo } from 'react';
import { MOCK_MODELS } from './constants';
import { ModelCard } from './components/ModelCard';
import { RadarComparison } from './components/RadarComparison';
import { PriceChart } from './components/PriceChart';
import { AIAnalyst } from './components/AIAnalyst';
import { DateFilter } from './components/DateFilter';
import { ParticleBackground } from './components/ParticleBackground';
import { ModelIcon } from './components/ModelIcon';
import { UseCaseSelector } from './components/UseCaseSelector';
import { Hexagon, Layers, BarChart3, ListFilter, FilterX, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['gemini-1.5-pro', 'gemini-2.5-flash']);
  const [viewMode, setViewMode] = useState<'dashboard' | 'analysis'>('dashboard');
  
  const [startDate, setStartDate] = useState('2024-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 7));

  const filteredModels = useMemo(() => {
    return MOCK_MODELS.filter(m => m.releaseDate >= startDate && m.releaseDate <= endDate);
  }, [startDate, endDate]);

  const selectedModels = useMemo(() => {
    return MOCK_MODELS.filter(m => selectedIds.includes(m.id));
  }, [selectedIds]);

  const toggleModel = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(pid => pid !== id) 
        : [...prev, id]
    );
  };

  const resetFilters = () => {
    setStartDate('2024-01');
    setEndDate(new Date().toISOString().slice(0, 7));
  };

  return (
    <div className="min-h-screen relative font-sans text-text-main selection:bg-primary selection:text-white pb-20">
      <ParticleBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative p-2.5">
               <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-md rounded-full group-hover:opacity-40 transition-opacity"></div>
               <Hexagon className="text-primary relative z-10 group-hover:text-white transition-colors duration-300" size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold tracking-tight text-text-main">
                Vibe<span className="gradient-text">X</span>
              </h1>
              <p className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold opacity-80">Intelligence</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1 bg-black/20 p-1.5 rounded-xl border border-white/10 backdrop-blur-md">
             <button 
               onClick={() => setViewMode('dashboard')}
               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'dashboard' ? 'bg-white/10 text-white shadow-inner border border-white/10' : 'text-text-sub hover:text-text-main hover:bg-white/5'}`}
             >
               <Layers size={18} /> Dashboard
             </button>
             <button 
               onClick={() => setViewMode('analysis')}
               className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'analysis' ? 'bg-white/10 text-secondary shadow-inner border border-white/10' : 'text-text-sub hover:text-text-main hover:bg-white/5'}`}
             >
               <Sparkles size={18} /> Deep Analysis
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 animate-fade-in-up">
        
        {/* Model Selection Grid */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
            <div>
                <h2 className="text-2xl font-display font-bold flex items-center gap-3 text-text-main">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                    <ListFilter className="text-primary" size={24} />
                  </div>
                  Select Models 
                </h2>
                <p className="text-sm text-text-sub mt-1 font-medium">
                    Comparing <span className="text-white">{filteredModels.length}</span> frontier models from {startDate} to {endDate}.
                </p>
            </div>
            
            <DateFilter 
                startDate={startDate} 
                endDate={endDate} 
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onReset={resetFilters}
            />
          </div>

          <UseCaseSelector models={MOCK_MODELS} onSelect={setSelectedIds} />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 min-h-[200px]">
            {filteredModels.length > 0 ? filteredModels.map(model => (
              <ModelCard 
                key={model.id} 
                model={model} 
                isSelected={selectedIds.includes(model.id)}
                onToggle={toggleModel}
              />
            )) : (
              <div className="col-span-full flex flex-col items-center justify-center text-text-sub bg-white/5 backdrop-blur-md rounded-2xl border border-dashed border-white/10 p-12">
                 <FilterX size={48} className="mb-4 opacity-40" />
                 <p className="text-xl font-bold text-text-main">No models found</p>
                 <p className="text-sm mb-6">Adjust the timeline to see more.</p>
                 <button onClick={resetFilters} className="px-6 py-2.5 bg-primary/20 border border-primary/40 text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all">
                    Reset Filters
                 </button>
              </div>
            )}
          </div>
        </section>

        {selectedModels.length === 0 ? (
           <div className="text-center py-24 border-2 border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
             <div className="inline-block p-4 bg-white/5 rounded-full mb-4 border border-white/10">
                <BarChart3 className="text-primary" size={32} />
             </div>
             <h3 className="text-2xl font-display font-bold text-text-main mb-2">Data Awaiting Input</h3>
             <p className="text-text-sub max-w-md mx-auto">Select at least one model from the grid above to initialize the VibeX comparison engine.</p>
           </div>
        ) : (
          <div className="animate-fade-in-up">
             {viewMode === 'dashboard' ? (
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Radar Chart */}
                  <RadarComparison models={selectedModels} />
                  
                  {/* Price Chart */}
                  <PriceChart models={selectedModels} />
                  
                  {/* Comparison Table */}
                  <div className="lg:col-span-2 glass-panel rounded-2xl p-8 overflow-x-auto shadow-2xl">
                    <h3 className="text-xl font-display font-bold mb-8 text-text-main flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
                      Technical Matrix
                    </h3>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 px-6 font-mono text-text-sub text-xs uppercase tracking-wider">Metric</th>
                          {selectedModels.map(m => (
                            <th key={m.id} className="py-4 px-6 font-bold text-text-main min-w-[150px] text-lg">{m.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-sm text-text-main">
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-text-sub font-medium">Release Date</td>
                          {selectedModels.map(m => <td key={m.id} className="py-4 px-6 font-mono opacity-80">{m.releaseDate}</td>)}
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-text-sub font-medium">Context Window</td>
                          {selectedModels.map(m => <td key={m.id} className="py-4 px-6 font-mono text-primary font-bold">{(m.contextWindow / 1000).toFixed(0)}k <span className="text-text-sub text-xs font-normal">tok</span></td>)}
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-text-sub font-medium">MMLU (Knowledge)</td>
                          {selectedModels.map(m => <td key={m.id} className="py-4 px-6 font-mono font-semibold">{m.benchmarks.mmlu}%</td>)}
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-text-sub font-medium">HumanEval (Code)</td>
                          {selectedModels.map(m => <td key={m.id} className="py-4 px-6 font-mono font-semibold">{m.benchmarks.humanEval}%</td>)}
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 text-text-sub font-medium">Modalities</td>
                          {selectedModels.map(m => (
                            <td key={m.id} className="py-4 px-6">
                              <div className="flex flex-wrap gap-1.5">
                                {m.modalities.map(mod => (
                                  <span key={mod} className="text-[10px] font-bold px-2.5 py-1 bg-white/5 rounded-full border border-white/10 text-text-sub uppercase tracking-wide hover:bg-white/10 transition-colors">{mod}</span>
                                ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
               </div>
             ) : (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
                 <div className="lg:col-span-1 flex flex-col gap-4 overflow-y-auto pr-2">
                   {/* Sidebar summarization */}
                    <div className="glass-panel p-6 rounded-2xl">
                      <h3 className="font-bold text-text-sub mb-5 uppercase text-xs tracking-wider flex items-center gap-2">
                        <Hexagon size={14} /> Active Context
                      </h3>
                      <div className="space-y-3">
                        {selectedModels.map(m => (
                          <div key={m.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/30 transition-colors">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white shadow-lg" style={{backgroundColor: m.color}}>
                               <ModelIcon provider={m.provider} className="w-6 h-6" color="white" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-text-main">{m.name}</div>
                                <div className="text-[10px] text-text-sub uppercase font-semibold">{m.provider}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
                 <div className="lg:col-span-2 h-full">
                    <AIAnalyst selectedModels={selectedModels} />
                 </div>
               </div>
             )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;