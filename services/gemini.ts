import { GoogleGenAI } from "@google/genai";
import { AIModel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeModels = async (models: AIModel[], query: string) => {
  const modelNames = models.map(m => m.name).join(', ');
  const prompt = `
    You are an expert AI Researcher and Data Scientist.
    
    Context: The user is comparing the following AI models: ${modelNames}.
    User Query: "${query}"

    Task: Provide a comparative analysis based on the user's query. 
    If the user asks for updated data or specific recent events, use Google Search to find the latest information.
    Structure your answer with clear headings, bullet points for pros/cons, and a final verdict.
    Keep the tone professional, technical, yet accessible.
    Format the output in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable grounding for latest data
        systemInstruction: "You are a helpful and precise AI technical analyst.",
      }
    });
    
    return {
      text: response.text,
      groundingMetadata: response.candidates?.[0]?.groundingMetadata
    };
  } catch (error) {
    console.error("Error analyzing models:", error);
    throw error;
  }
};
