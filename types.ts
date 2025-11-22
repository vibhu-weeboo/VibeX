
export enum Provider {
  GOOGLE = 'Google',
  OPENAI = 'OpenAI',
  ANTHROPIC = 'Anthropic',
  META = 'Meta',
  MISTRAL = 'Mistral',
  XAI = 'xAI',
  DEEPSEEK = 'DeepSeek'
}

export interface BenchmarkScores {
  mmlu: number; // General Knowledge
  humanEval: number; // Coding
  math: number; // Mathematics
  mgsm: number; // Multilingual Math
}

export interface Pricing {
  input: number; // Per 1M tokens
  output: number; // Per 1M tokens
}

export interface AIModel {
  id: string;
  name: string;
  provider: Provider;
  releaseDate: string;
  contextWindow: number; // In tokens
  maxOutput: number;
  benchmarks: BenchmarkScores;
  pricing: Pricing;
  modalities: string[]; // e.g., ['Text', 'Image', 'Video', 'Audio']
  description: string;
  color: string; // Hex for charts
}

export interface ChartDataPoint {
  subject: string;
  [key: string]: string | number;
}

export type AnalysisState = 'idle' | 'loading' | 'success' | 'error';
