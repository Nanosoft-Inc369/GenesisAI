import { GoogleGenAI, Type } from "@google/genai";
import { GenesisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are GenesisAI, an elite expert frontend engineer and full-stack architect. 
Your goal is to build fully functional, single-file React applications based on user descriptions.

Rules for Code Generation:
1. Output ONLY a valid JSON object.
2. The JSON must adhere to the schema provided.
3. The 'reactCode' field must contain a SINGLE, COMPLETE React functional component.
4. DO NOT use 'import' or 'export' statements. Assume 'React', 'useState', 'useEffect', etc., are globally available in the runtime environment.
5. Define the main component as 'const App = () => { ... }'.
6. Use Tailwind CSS for ALL styling. Make it look professional, modern, and aesthetically pleasing. Use 'Inter' or system fonts.
7. If the user asks for backend features (databases, API keys), simulate them using local state or mock data to ensure the UI is fully functional for demonstration.
8. Use standard HTML/SVG for icons. Do not assume external icon libraries are installed.
9. **STRICTLY NO EMOJIS**. Use SVG icons for all visual indicators, status icons, or decorative elements. The UI should be clean, professional ("Smart UI"), and technical.
10. Ensure the code handles errors gracefully and is responsive.

Example format:
{
  "appName": "Todo List",
  "description": "A dark mode todo list with local storage",
  "reactCode": "const App = () => { const [todos, setTodos] = React.useState([]); ... return <div className='p-4'>...</div> }"
}
`;

export const generateAppFromPrompt = async (prompt: string): Promise<GenesisResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            appName: { type: Type.STRING },
            description: { type: Type.STRING },
            reactCode: { type: Type.STRING },
          },
          required: ["appName", "description", "reactCode"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as GenesisResponse;
  } catch (error) {
    console.error("GenesisAI Generation Error:", error);
    throw error;
  }
};