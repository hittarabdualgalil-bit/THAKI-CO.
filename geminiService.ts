
import { GoogleGenAI, Type } from "@google/genai";
import { storageService } from "./storageService";

// Helper to get client safely
const getClient = () => {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) {
        console.error("API Key is missing");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

// Generate Exam Questions
export const generateExamQuestions = async (topic: string, difficulty: string, count: number = 3) => {
    const ai = getClient();
    if (!ai) throw new Error("API Key configuration error");

    const prompt = `Generate ${count} multiple-choice questions about "${topic}" at ${difficulty} difficulty level. Include the correct answer and a brief explanation. Language should be appropriate for the topic (Arabic if topic is Arabic).`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        questions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    question: { type: Type.STRING },
                                    options: { 
                                        type: Type.ARRAY, 
                                        items: { type: Type.STRING } 
                                    },
                                    correctAnswer: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ["question", "options", "correctAnswer", "explanation"]
                            }
                        }
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text);
        }
        throw new Error("No data returned");
    } catch (error) {
        console.error("Gemini Exam Error:", error);
        throw error;
    }
};

// Generate Smart Content (Writer)
export const generateSmartContent = async (contentType: string, topic: string, tone: string, language: 'ar' | 'en') => {
    const ai = getClient();
    if (!ai) throw new Error("API Key configuration error");

    const langName = language === 'ar' ? 'Arabic' : 'English';
    const prompt = `You are a professional copywriter. Write a ${tone} ${contentType} about "${topic}". The content should be high quality, engaging, and formatted nicely. Write strictly in ${langName}.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini Writer Error:", error);
        throw error;
    }
};

// Generic Tool Runner (For Research, Education, Design)
export const runServiceTool = async (
    type: 'text' | 'image', 
    systemPrompt: string, 
    userInputs: Record<string, string>, 
    language: 'ar' | 'en'
): Promise<string> => {
    const ai = getClient();
    if (!ai) throw new Error("API Key configuration error");

    // Construct the prompt
    let fullPrompt = `${systemPrompt}\n\nInputs:\n`;
    for (const [key, value] of Object.entries(userInputs)) {
        fullPrompt += `- ${key}: ${value}\n`;
    }
    
    if (type === 'text') {
        const langName = language === 'ar' ? 'Arabic' : 'English';
        fullPrompt += `\nPlease provide the output strictly in ${langName}. Format nicely with Markdown.`;
        
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: fullPrompt,
            });
            return response.text || "No content generated.";
        } catch (error) {
            console.error("Tool Error:", error);
            throw error;
        }
    } 
    else if (type === 'image') {
        // For image, we assume 'Topic' or 'Description' is in userInputs
        const imagePrompt = `${systemPrompt}. ${userInputs['Topic'] || userInputs['Description'] || ''}, high quality, professional style.`;
        
        try {
            const response = await ai.models.generateImages({
                model: 'imagen-3.0-generate-001',
                prompt: imagePrompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/jpeg',
                    aspectRatio: '1:1',
                },
            });
            
            const base64 = response.generatedImages?.[0]?.image?.imageBytes;
            if (base64) {
                return `data:image/jpeg;base64,${base64}`;
            }
            throw new Error("Image generation failed");
        } catch (error) {
             console.error("Tool Image Error:", error);
             throw error;
        }
    }
    
    return "";
};

// Generate Hero Background (Abstract Art)
export const getOrGenerateHeroImage = async (): Promise<string> => {
    // 1. Check LocalStorage
    const cached = storageService.getHeroImage();
    if (cached) return cached;

    // 2. Generate
    const ai = getClient();
    // Default fallback if no API key or model error
    const fallback = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"; 

    if (!ai) return fallback;

    try {
        // Using Imagen 3 as per requirements for generation
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-001',
            prompt: 'Abstract Islamic geometric patterns combined with futuristic technology circuits, glowing blue and gold lines, dark deep blue background, 8k resolution, elegant, minimal, high tech',
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1', // Hero image usually cropped via CSS cover, 1:1 is safer for quota
            },
        });

        const base64EncodeString = response.generatedImages?.[0]?.image?.imageBytes;
        if (base64EncodeString) {
            const imageUrl = `data:image/jpeg;base64,${base64EncodeString}`;
            storageService.setHeroImage(imageUrl);
            return imageUrl;
        }
        
        return fallback;
    } catch (error) {
        console.warn("Image generation failed (likely model access or quota), using fallback.", error);
        return fallback;
    }
};