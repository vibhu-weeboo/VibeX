import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';
import { AIModel } from '../types';

interface Props {
  models: AIModel[];
}

export const RadarComparison: React.FC<Props> = ({ models }) => {
  const data = [
    { subject: 'General (MMLU)', fullMark: 100 },
    { subject: 'Coding (HumanEval)', fullMark: 100 },
    { subject: 'Math (MATH)', fullMark: 100 },
    { subject: 'Multi-Lingual (MGSM)', fullMark: 100 },
    { subject: 'Cost Efficiency', fullMark: 100 }, 
  ];

  const transformedData = data.map(d => {
    const point: any = { subject: d.subject, fullMark: 100 };
    models.forEach(m => {
      let score = 0;
      if (d.subject === 'General (MMLU)') score = m.benchmarks.mmlu;
      if (d.subject === 'Coding (HumanEval)') score = m.benchmarks.humanEval;
      if (d.subject === 'Math (MATH)') score = m.benchmarks.math;
      if (d.subject === 'Multi-Lingual (MGSM)') score = m.benchmarks.mgsm;
      if (d.subject === 'Cost Efficiency') {
        const avgPrice = (m.pricing.input + m.pricing.output) / 2;
        score = Math.max(0, 100 - (avgPrice * 4)); 
      }
      point[m.id] = score;
    });
    return point;
  });

  return (
    <div className="w-full h-[450px] glass-panel rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-xl font-display font-bold text-text-main">Capability Matrix</h3>
         <div className="text-xs text-text-sub font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full">Normalized Scores</div>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={transformedData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          {models.map((m) => (
            <Radar
              key={m.id}
              name={m.name}
              dataKey={m.id}
              stroke={m.color}
              strokeWidth={3}
              fill={m.color}
              fillOpacity={0.2}
              activeDot={{ r: 6, fill: m.color, strokeWidth: 2, stroke: '#fff' }}
            />
          ))}
          <Legend 
            wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 500, color: '#fff' }} 
            iconType="circle"
          />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                padding: '12px',
                color: '#f8fafc'
            }}
            itemStyle={{ fontWeight: 500 }}
            labelStyle={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};