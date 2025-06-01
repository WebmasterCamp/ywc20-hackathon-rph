import {
    GoogleGenAI,
  } from '@google/genai';

export async function generateText(prompt: string) {
    const genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

    const config = {
        responseMimeType: 'text/plain',
      };
    const model = 'gemini-2.5-flash-preview-05-20';
    const contents = [
    {
        role: 'user',
        parts: [
        {
            text: prompt,
        },
        ],
    },
    ];

    const response = await genAI.models.generateContent({
        model,
        config,
        contents,
    });

    return response.text;
}