const express = require('express');
const asyncHandler = require("express-async-handler");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie,  requireAuth } = require('../../utils/auth');
const { Goal } = require('../../db/models')


const router = express.Router();


router.get('/', asyncHandler(async(req, res)=>{


    const goals = await Goal.findAll()

    return res.json(goals)


}))

module.exports = router;
