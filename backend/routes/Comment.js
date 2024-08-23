const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/Auth');
const {createComment}=require('../contollers/Comment')
router.post('/comment/:postid',auth,createComment)

module.exports=router;