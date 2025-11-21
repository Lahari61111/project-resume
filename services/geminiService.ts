import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Note: In a real environment, ensure the key is valid. 
// If empty, the app will handle it gracefully or fail on request.

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (e) {
    console.error("Failed to initialize Gemini Client", e);
}

export const generateProfessionalSummary = async (jobTitle: string, skills: string[]): Promise<string> => {
  if (!ai) return "Experienced professional seeking new opportunities.";

  try {
    const model = "gemini-2.5-flash";
    const skillString = skills.join(", ");
    const prompt = `Write a professional, concise (max 50 words) resume summary for a ${jobTitle}. 
    Highlight these skills if relevant: ${skillString}. 
    Tone: Professional, confident, action-oriented. Do not include markdown formatting.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini generation error:", error);
    return `Passionate ${jobTitle} ready to deliver high-quality results.`;
  }
};