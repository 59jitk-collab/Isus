import { GoogleGenAI, Type } from "@google/genai";
import { AIReview } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchChapterNotes = async (
    subject: string,
    chapter: string,
    onUpdate: (chunk: string) => void,
    onError: (error: string) => void,
): Promise<void> => {
    const cacheKey = `notes-${subject}-${chapter}`;
    try {
        const cachedNotes = sessionStorage.getItem(cacheKey);
        if (cachedNotes) {
            onUpdate(cachedNotes);
            return;
        }

        let prompt = `Provide detailed, well-structured notes for a Class 10 student on the topic of "${chapter}" from the subject "${subject}". The notes should be comprehensive, easy to understand, and formatted using markdown. Use headings for main topics, sub-headings for sub-topics, bullet points for lists, and bold text for key terms. Ensure the content is accurate and suitable for exam preparation. Do not use markdown code blocks (\`\`\`).`;

        if (subject === 'Mathematics') {
            prompt += `\n\nImportant: For all mathematical formulas and equations, do not use LaTeX or dollar-sign notation (e.g., $...$). Instead, represent them in a clear, plain-text-friendly way. For example, use 'x^2' for exponents, '/' for division, and write out fractions verbally if needed (e.g., 'the fraction a over b'). Ensure all mathematical content is easily readable without special rendering.`;
        }

        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        let fullNotes = '';
        for await (const chunk of responseStream) {
            const chunkText = chunk.text;
            onUpdate(chunkText);
            fullNotes += chunkText;
        }
        sessionStorage.setItem(cacheKey, fullNotes);

    } catch (error: any) {
        console.error("Error fetching notes from Gemini API:", error);
        let errorMessage = "Failed to load notes. An error occurred while contacting the AI service. Please check the console for details.";
        if (error.message && error.message.toLowerCase().includes("quota")) {
            errorMessage = "You've made too many requests recently. Please wait a bit before trying again.";
        }
        onError(errorMessage);
    }
};

export const askAiGeneral = async (question: string): Promise<string> => {
    const cacheKey = `ask-${question}`;
    try {
        const cachedAnswer = sessionStorage.getItem(cacheKey);
        if (cachedAnswer) {
            return cachedAnswer;
        }

        const prompt = `You are an expert study assistant for a Class 10 student. Answer the following question clearly, concisely, and accurately. Format your answer using markdown where appropriate (headings, bold text, lists), but do not use code blocks (\`\`\`). The question is: "${question}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const resultText = response.text;
        sessionStorage.setItem(cacheKey, resultText);
        return resultText;

    } catch (error: any) {
        console.error("Error asking AI from Gemini API:", error);
        let errorMessage = "Failed to get an answer. An error occurred while contacting the AI service. Please check the console for details.";
        if (error.message && error.message.toLowerCase().includes("quota")) {
            errorMessage = "You've made too many requests recently. Please wait a bit before trying again.";
        }
        return errorMessage;
    }
};

export const reviewAnswer = async (
    subject: string,
    question: string,
    userAnswer: string
): Promise<AIReview> => {
    try {
        const prompt = `You are an expert AI examiner for a Class 10 student in India following the CBSE curriculum. Your task is to evaluate a student's answer for a given question and provide constructive feedback.

Subject: "${subject}"
Question: "${question}"
Student's Answer: "${userAnswer}"

Based on the question and the student's answer, provide your evaluation. The question is worth 5 marks.

Please provide your feedback in the specified JSON format.
- score: An integer score from 0 to 5.
- totalMarks: The total marks, which is 5.
- whatYouDidWell: An array of strings highlighting the strengths of the answer.
- areasForImprovement: An array of strings with specific, actionable suggestions for improvement.
- modelAnswer: An ideal, comprehensive model answer that would earn full marks.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        score: { type: Type.NUMBER, description: "Score out of 5." },
                        totalMarks: { type: Type.NUMBER, description: "Total marks, which is 5." },
                        whatYouDidWell: {
                            type: Type.ARRAY,
                            description: "Positive aspects of the answer.",
                            items: { type: Type.STRING }
                        },
                        areasForImprovement: {
                            type: Type.ARRAY,
                            description: "Actionable points for improvement.",
                            items: { type: Type.STRING }
                        },
                        modelAnswer: { type: Type.STRING, description: "An ideal model answer." }
                    },
                    required: ["score", "totalMarks", "whatYouDidWell", "areasForImprovement", "modelAnswer"]
                },
            },
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error: any) {
        console.error("Error reviewing answer from Gemini API:", error);
        let errorMessage = "Failed to get review. An error occurred while contacting the AI service. Please check the console for details.";
        if (error.message && error.message.toLowerCase().includes("quota")) {
            errorMessage = "You've made too many requests recently. Please wait a bit before trying again.";
        }
        throw new Error(errorMessage);
    }
};

export const generateVideoLesson = async (
    subject: string,
    chapter: string,
    onUpdate: (message: string) => void,
): Promise<string> => {
    const videoAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Create a short, one-minute educational video for a Class 10 student on the topic of "${chapter}" from the subject "${subject}". The video should explain the core concepts clearly and concisely.`;

    try {
        onUpdate("Initializing video generation...");
        let operation = await videoAI.models.generateVideos({
            model: 'veo-3.1-fast-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '16:9'
            }
        });

        onUpdate("AI is creating your video... This may take a few minutes.");
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            onUpdate("Still working... Rendering frames.");
            operation = await videoAI.operations.getVideosOperation({ operation: operation });
        }

        if (!operation.response?.generatedVideos?.[0]?.video?.uri) {
            throw new Error("Video generation failed to produce a valid URI.");
        }

        const downloadLink = operation.response.generatedVideos[0].video.uri;
        onUpdate("Finalizing and fetching your video...");
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch video: ${response.statusText} - ${errorText}`);
        }

        const videoBlob = await response.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        onUpdate("Video ready!");
        return videoUrl;

    } catch (error: any) {
        console.error("Error generating video:", error);
        let errorMessage = error.message || "An unknown error occurred during video generation.";
        if (error.message && error.message.toLowerCase().includes("quota")) {
            errorMessage = "You've made too many requests for video generation. Please wait a while before trying again.";
        }
        throw new Error(errorMessage);
    }
};