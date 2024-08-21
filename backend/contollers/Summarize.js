const {getSummary}=require('../utils/summarizeUtils')

exports.getBlogSummary = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'content is required' });
    }

    try {
        const summary = await getSummary(pageUrl);
        res.status(200).json({ sucess:true,data:summary,message:"Blog Summarize successfully" });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while summarizing the page' });
    }
};