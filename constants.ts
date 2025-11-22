

import { AIModel, Provider } from './types';

export const MOCK_MODELS: AIModel[] = [
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: Provider.GOOGLE,
    releaseDate: '2024-02',
    contextWindow: 2000000,
    maxOutput: 8192,
    benchmarks: {
      mmlu: 88.7,
      humanEval: 91.4,
      math: 86.5,
      mgsm: 89.2
    },
    pricing: { input: 3.50, output: 10.50 },
    modalities: ['Text', 'Image', 'Video', 'Audio', 'Code'],
    description: 'Google\'s flagship model with a massive 2M token context window, excelling in long-context retrieval and multimodal reasoning.',
    color: '#4285F4'
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: Provider.GOOGLE,
    releaseDate: '2025-01',
    contextWindow: 1000000,
    maxOutput: 8192,
    benchmarks: {
      mmlu: 83.5,
      humanEval: 84.2,
      math: 78.9,
      mgsm: 81.0
    },
    pricing: { input: 0.075, output: 0.30 },
    modalities: ['Text', 'Image', 'Video', 'Audio'],
    description: 'A blazing fast, highly efficient model designed for high-frequency tasks and low latency applications.',
    color: '#FBC02D'
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: Provider.OPENAI,
    releaseDate: '2024-05',
    contextWindow: 128000,
    maxOutput: 4096,
    benchmarks: {
      mmlu: 88.7,
      humanEval: 90.2,
      math: 76.6,
      mgsm: 87.1
    },
    pricing: { input: 2.50, output: 10.00 },
    modalities: ['Text', 'Image', 'Audio'],
    description: 'OpenAI\'s omni model, providing high intelligence with native multimodal capabilities and improved speed.',
    color: '#10a37f'
  },
  {
    id: 'o1-preview',
    name: 'OpenAI o1',
    provider: Provider.OPENAI,
    releaseDate: '2024-09',
    contextWindow: 128000,
    maxOutput: 32768,
    benchmarks: {
      mmlu: 90.8,
      humanEval: 92.4,
      math: 94.8,
      mgsm: 89.0
    },
    pricing: { input: 15.00, output: 60.00 },
    modalities: ['Text'],
    description: 'A reasoning model that "thinks" before answering, achieving SOTA performance in science, code, and math.',
    color: '#202123'
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: Provider.ANTHROPIC,
    releaseDate: '2024-06',
    contextWindow: 200000,
    maxOutput: 8192,
    benchmarks: {
      mmlu: 88.7,
      humanEval: 92.0,
      math: 71.1,
      mgsm: 85.5
    },
    pricing: { input: 3.00, output: 15.00 },
    modalities: ['Text', 'Image', 'Code'],
    description: 'Anthropic\'s most balanced model, renowned for its superior coding capabilities and naturalistic nuance.',
    color: '#D97757'
  },
  {
    id: 'llama-3-1-405b',
    name: 'Llama 3.1 405B',
    provider: Provider.META,
    releaseDate: '2024-07',
    contextWindow: 128000,
    maxOutput: 2048,
    benchmarks: {
      mmlu: 88.6,
      humanEval: 89.0,
      math: 73.8,
      mgsm: 86.3
    },
    pricing: { input: 2.00, output: 2.00 }, // Theoretical hosted pricing
    modalities: ['Text', 'Image'],
    description: 'The largest open-weights model to date, offering frontier-level performance for the open-source community.',
    color: '#0668E1'
  },
  {
    id: 'grok-2',
    name: 'Grok-2',
    provider: Provider.XAI,
    releaseDate: '2024-08',
    contextWindow: 128000,
    maxOutput: 4096,
    benchmarks: {
      mmlu: 87.5,
      humanEval: 88.4,
      math: 76.1,
      mgsm: 82.0
    },
    pricing: { input: 2.00, output: 10.00 }, // Estimated
    modalities: ['Text', 'Image'],
    description: 'xAI\'s frontier model featuring real-time access to X platform data and Flux image generation integration.',
    color: '#333333'
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: Provider.DEEPSEEK,
    releaseDate: '2024-12',
    contextWindow: 128000,
    maxOutput: 8192,
    benchmarks: {
      mmlu: 88.5,
      humanEval: 89.1,
      math: 80.0,
      mgsm: 84.0
    },
    pricing: { input: 0.14, output: 0.28 },
    modalities: ['Text', 'Code'],
    description: 'A highly efficient Mixture-of-Experts model offering top-tier performance at a fraction of the cost.',
    color: '#4d6bfe'
  },
  {
    id: 'mistral-large-2',
    name: 'Mistral Large 2',
    provider: Provider.MISTRAL,
    releaseDate: '2024-07',
    contextWindow: 128000,
    maxOutput: 8192,
    benchmarks: {
      mmlu: 84.0,
      humanEval: 92.0,
      math: 76.9,
      mgsm: 82.5
    },
    pricing: { input: 2.00, output: 6.00 },
    modalities: ['Text', 'Code'],
    description: 'Mistral\'s flagship model, designed for complex reasoning and high proficiency in code and multiple languages.',
    color: '#f59e0b'
  }
];