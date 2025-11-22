import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AIModel } from '../types';

interface Props {
  models: AIModel[];
}

export const PriceChart: React.FC<Props> = ({ models }) => {
  const data = models.map(m => ({
    name: m.name,
    Input: m.pricing.input,
    Output: m.pricing.output,
  }));

  return (
    <div className="w-full h-[450px] glass-panel rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-display font-bold text-text-main">Cost Efficiency</h3>
        <div className="text-xs text-green-300 font-medium px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">Per 1M Tokens</div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} 
            tickLine={false}
          />
          <YAxis 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} 
            tickLine={false}
            unit="$" 
          />
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,0.05)'}}
            contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                color: '#f1f5f9'
            }}
            labelStyle={{ fontWeight: 'bold', color: '#f1f5f9', marginBottom: '5px' }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }} />
          <Bar dataKey="Input" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Input Cost ($)" barSize={40} />
          <Bar dataKey="Output" fill="#34d399" radius={[4, 4, 0, 0]} name="Output Cost ($)" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};