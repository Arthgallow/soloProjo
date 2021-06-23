const express = require('express');
const asyncHandler = require("express-async-handler");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie,  requireAuth } = require('../../utils/auth');
const { Comment } = require('../../db/models')
const { User } = require('../../db/models');

const router = express.Router();


router.get('/', asyncHandler(async(req, res)=>{
   

    const comments = await Comment.findAll({attributes:["comment"]})

    res.json({comments})
    return post

}))

module.exports = router;
