import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize safe client even if key is missing to prevent crash, check before call.
const ai = new GoogleGenAI({ apiKey });

export const generateHypeMessage = async (nickname: string, nomination: string): Promise<string> => {
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return `Добро пожаловать на Йолку, ${nickname}! Удачи в номинации ${nomination}!`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Generate a short, energetic, hype-up welcome message (max 2 sentences) in Russian 
        for a dancer named "${nickname}" who just registered for the "${nomination}" category 
        at the "Йолка" (Yolka) street dance festival. 
        Use slang appropriate for hip-hop/breaking culture. 
        Don't use quotes.
      `,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Йо, ${nickname}! Твоя заявка принята. Порви всех в ${nomination}!`;
  }
};