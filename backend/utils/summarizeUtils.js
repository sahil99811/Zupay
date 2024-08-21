const Groq = require('groq'); // Ensure you have Groq installed and required
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to get AI chat completion from Groq
const getGroqChatCompletion = (content) => {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Please summarize the following text into a concise summary of no more than 100 words:\n\n${content}`,
            },
        ],
        model: "llama3-8b-8192",
    });
};

// Function to get AI summary for a given page URL
const getSummary = async (pageUrl) => {
    const chatCompletion = await getGroqChatCompletion(pageUrl);
    return chatCompletion.choices[0]?.message?.content || "";
};

module.exports = { getSummary };
