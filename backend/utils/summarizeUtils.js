const axios = require('axios');

// Function to get AI chat completion from OpenAI using direct API call
const getSummary = async (content) => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4",
                messages: [
                    {
                        role: "user",
                        content: `Please summarize the following text into a concise summary of no more than 100 words:\n\n${content}`,
                    },
                ],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0]?.message?.content || "";
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        throw new Error('Failed to get AI chat completion');
    }
};

module.exports = { getSummary };
