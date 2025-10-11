import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
});

export const translateController = async (req, res) => {
  try {
    const { fromLang, toLang, textToTranslate } = req.body;
    console.log("Request received:", req.body);

    const prompt = `output only ${fromLang} to ${toLang}: ${textToTranslate}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    console.log("AI response:", response);

    const translated = response.text;

    res.json({
      translation: translated,
    });
  } catch (err) {
    console.error("Error in translateController:", err);
    res.status(500).json({ error: "Translation failed" });
  }
};

