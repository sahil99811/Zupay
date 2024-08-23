
const { Groq } = require('groq-sdk');
const dotenv = require('dotenv');
dotenv.config(); 
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to get AI summary for a given page URL
const getSummary  = async (content) => {
    const chatCompletion = await getGroqChatCompletion(content);
    return chatCompletion.choices[0]?.message?.content || "";
}

// Function to get AI chat completion from Groq
const getGroqChatCompletion = (content) => {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Please summarize the following post into a concise summary :\n\n${content}`,
            },
        ],
        model: "llama3-8b-8192",
    });
}



module.exports={getSummary}