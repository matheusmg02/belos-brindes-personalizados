import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAHYPa2hVPFrOefll8u7Pp9tmiZjMrOK7M');

const generateContent = async (req, res) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const { prompt } = req.body;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default generateContent;