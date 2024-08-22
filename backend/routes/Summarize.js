const express = require('express');
const router = express.Router();
const {getBlogSummary}=require('../contollers/Summarize');
const { auth } = require('../middlewares/Auth');
router.get("/summarize",auth,getBlogSummary)
module.exports=router