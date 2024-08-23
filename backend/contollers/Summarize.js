const { getSummary } = require('../utils/summarizeUtils');

exports.getBlogSummary = async (req, res) => {
    const { content } = req.query;
    console.log("funciton is called",content);
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const summary = await getSummary(content);
        res.status(200).json({ success: true, data: summary, message: "Blog summarized successfully" });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while summarizing the content' });
    }
};
