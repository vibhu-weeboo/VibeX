import React, { useState, useRef, useEffect } from 'react';
import { AIModel } from '../types';
import { analyzeModels } from '../services/gemini';
import { Sparkles, Send, Loader2, Search, Bot, Mic, MicOff, Radio } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { float32ToInt16PCM, decodeAudioData, base64ToUint8Array, arrayBufferToBase64 } from '../utils/audio';
import { AudioVisualizer } from './AudioVisualizer';

interface Props {
  selectedModels: AIModel[];
}

export const AIAnalyst: React.FC<Props> = ({ selectedModels }) => {
  // Text Mode State
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [grounding, setGrounding] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Live Mode State
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const closeSessionRef = useRef<() => void>(() => {});

  // Scroll to bottom on text response
  useEffect(() => {
    if (response && bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response]);

  // Cleanup Live Session on Unmount
  useEffect(() => {
    return () => {
      stopLiveSession();
    };
  }, []);

  const startLiveSession = async () => {
    if (selectedModels.length === 0) return;

    try {
      setIsLiveMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const modelNames = selectedModels.map(m => m.name).join(', ');
      const systemInstruction = `You are VibeX, a futuristic AI consultant. 
      The user is analyzing these AI models: ${modelNames}. 
      Answer questions about their capabilities, pricing, and benchmarks. 
      Keep responses concise, spoken-style, and helpful. Be confident and slightly tech-focused.`;

      // Audio Setup
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      inputStreamRef.current = stream;
      
      // Live API expects 16kHz input
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;
      
      // Playback context (typically 24kHz or 48kHz is standard for output, but model returns 24kHz)
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Connection
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            console.log('Live Session Opened');
            setIsConnected(true);
            
            // Start Audio Streaming
            const source = audioCtx.createMediaStreamSource(stream);
            sourceNodeRef.current = source;
            
            // Use ScriptProcessor for raw PCM access
            const processor = audioCtx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Calculate Volume for Visualizer
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolume(Math.sqrt(sum / inputData.length) * 5); // Boost visual

              const pcmData = float32ToInt16PCM(inputData);
              const base64Data = arrayBufferToBase64(pcmData.buffer);
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                  },
                  endOfTurn: false
                });
              });
            };

            source.connect(processor);
            processor.connect(audioCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audioData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData) {
               const audioBuffer = await decodeAudioData(
                 base64ToUint8Array(audioData),
                 outputCtx,
                 24000
               );
               
               const source = outputCtx.createBufferSource();
               source.buffer = audioBuffer;
               source.connect(outputCtx.destination);
               
               const currentTime = outputCtx.currentTime;
               if (nextStartTimeRef.current < currentTime) {
                 nextStartTimeRef.current = currentTime;
               }
               
               source.start(nextStartTimeRef.current);
               nextStartTimeRef.current += audioBuffer.duration;
               
               // Fake volume for output visualization
               setVolume(0.8);
               setTimeout(() => setVolume(0.1), audioBuffer.duration * 1000);
            }
          },
          onclose: () => {
            console.log('Live Session Closed');
            setIsConnected(false);
          },
          onerror: (err) => {
            console.error('Live Session Error', err);
            setIsConnected(false);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: systemInstruction,
        }
      });

      closeSessionRef.current = () => {
        sessionPromise.then(session => session.close());
      };

    } catch (err) {
      console.error("Failed to start live session", err);
      setIsLiveMode(false);
    }
  };

  const stopLiveSession = () => {
    closeSessionRef.current();
    
    if (sourceNodeRef.current) sourceNodeRef.current.disconnect();
    if (processorRef.current) processorRef.current.disconnect();
    if (inputStreamRef.current) inputStreamRef.current.getTracks().forEach(t => t.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    
    setIsConnected(false);
    setIsLiveMode(false);
    setVolume(0);
  };

  const handleTextAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse(null);
    setGrounding(null);
    
    try {
      const result = await analyzeModels(selectedModels, query);
      setResponse(result.text || "No response generated.");
      if (result.groundingMetadata?.groundingChunks) {
        setGrounding(result.groundingMetadata.groundingChunks);
      }
    } catch (e) {
      setResponse("An error occurred while analyzing. Please check your API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const defaultSuggestions = [
    "Compare coding performance between selected models.",
    "Which model is more cost-effective for summarizing long documents?",
    "Find the latest benchmarks for math capabilities.",
    "Summarize the pros and cons of each."
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col h-full min-h-[600px] shadow-2xl relative overflow-hidden">
      
      {/* Header with Mode Switch */}
      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-secondary to-primary rounded-xl shadow-lg shadow-secondary/20">
            {isLiveMode ? <Radio className="text-white animate-pulse" size={24} /> : <Sparkles className="text-white" size={24} />}
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-text-main">Gemini Analyst</h2>
            <p className="text-sm text-text-sub font-medium">
              {isLiveMode ? "Real-time Voice Consultation" : "Deep dive with real-time search grounding"}
            </p>
          </div>
        </div>

        {selectedModels.length > 0 && (
          <button 
            onClick={isLiveMode ? stopLiveSession : startLiveSession}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-lg ${
              isLiveMode 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
              : 'bg-secondary/20 text-secondary border border-secondary/50 hover:bg-secondary/30'
            }`}
          >
            {isLiveMode ? (
              <><MicOff size={16} /> End Call</>
            ) : (
              <><Mic size={16} /> Go Live</>
            )}
          </button>
        )}
      </div>

      {/* Live Mode Interface */}
      {isLiveMode && (
         <div className="flex-1 flex flex-col items-center justify-center relative animate-fade-in-up">
            <AudioVisualizer isActive={isConnected} volume={volume} />
            <div className="mt-8 text-center">
               <h3 className="text-2xl font-display font-bold text-white mb-2">
                 {isConnected ? "VibeX is Listening..." : "Connecting..."}
               </h3>
               <p className="text-text-sub">Speak naturally to compare the selected models.</p>
            </div>
         </div>
      )}

      {/* Text Mode Interface */}
      {!isLiveMode && (
        <>
          <div className="flex-1 overflow-y-auto pr-2 mb-4 space-y-6 custom-scrollbar">
            {selectedModels.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-text-sub text-center">
                <div className="p-4 bg-white/5 rounded-full shadow-inner border border-white/5 mb-4">
                  <Bot size={32} className="text-secondary/70" />
                </div>
                <p className="font-medium">Select models from the grid to enable analysis.</p>
              </div>
            ) : !response && !loading ? (
              <div className="h-full flex flex-col justify-center">
                 <p className="text-center text-text-sub mb-6 font-medium">Ask me anything about the selected models:</p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   {defaultSuggestions.map((s, i) => (
                     <button 
                       key={i}
                       onClick={() => setQuery(s)}
                       className="text-left p-4 rounded-xl border border-white/5 hover:border-secondary/40 bg-white/5 hover:bg-white/10 transition-all text-sm text-text-main shadow-sm hover:shadow-lg"
                     >
                       {s}
                     </button>
                   ))}
                 </div>
              </div>
            ) : (
              <div className="space-y-4">
                 {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="relative">
                          <div className="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles size={16} className="text-secondary" />
                          </div>
                        </div>
                        <span className="mt-4 text-secondary font-display font-bold animate-pulse">Analyzing...</span>
                    </div>
                 )}
                 {response && (
                   <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-inner text-text-main">
                     <div className="prose prose-invert max-w-none">
                       <ReactMarkdown>{response}</ReactMarkdown>
                     </div>
                   </div>
                 )}
                 {grounding && grounding.length > 0 && (
                   <div className="mt-6 p-4 bg-black/20 rounded-xl border border-white/5">
                     <h4 className="text-xs font-bold text-text-sub uppercase mb-3 flex items-center gap-2">
                       <Search size={12} /> Sources
                     </h4>
                     <div className="flex flex-wrap gap-2">
                       {grounding.map((chunk: any, idx: number) => (
                         chunk.web?.uri && (
                           <a 
                             key={idx} 
                             href={chunk.web.uri} 
                             target="_blank" 
                             rel="noreferrer"
                             className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 text-primary font-medium truncate max-w-[200px] transition-all shadow-sm hover:shadow-md hover:bg-white/10"
                           >
                             {chunk.web.title || new URL(chunk.web.uri).hostname}
                           </a>
                         )
                       ))}
                     </div>
                   </div>
                 )}
                 <div ref={bottomRef} />
              </div>
            )}
          </div>

          <div className="relative group z-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTextAnalyze()}
              disabled={selectedModels.length === 0 || loading}
              placeholder={selectedModels.length === 0 ? "Select models first..." : "Ask a question about these models..."}
              className="w-full bg-black/20 border-2 border-transparent focus:border-secondary/30 rounded-2xl py-4 pl-6 pr-14 text-text-main placeholder-text-sub/50 focus:outline-none shadow-inner transition-all backdrop-blur-sm"
            />
            <button 
              onClick={handleTextAnalyze}
              disabled={selectedModels.length === 0 || loading || !query.trim()}
              className="absolute right-2 top-2 bottom-2 bg-secondary text-black disabled:bg-gray-700 disabled:text-gray-500 rounded-xl px-4 transition-all hover:scale-95 shadow-lg hover:shadow-secondary/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
};