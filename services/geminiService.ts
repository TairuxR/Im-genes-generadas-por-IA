import { GoogleGenAI } from "@google/genai";
import { AspectRatio } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned");
    }

    const content = response.candidates[0].content;
    if (!content || !content.parts) {
      throw new Error("No content parts found");
    }

    // Iterate through parts to find the image
    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        // Construct the Data URL
        // Note: The MIME type returned might be image/png or image/jpeg. 
        // We typically assume image/png from gemini-2.5-flash-image, 
        // but it's safer to use the mimeType from the response if available, or default to png.
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }

    // Check if there was a text refusal or other message if no image found
    const textPart = content.parts.find(p => p.text);
    if (textPart) {
      console.warn("Model returned text instead of image:", textPart.text);
      throw new Error(textPart.text || "Model refused to generate image");
    }

    return null;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};