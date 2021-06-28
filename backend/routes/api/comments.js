const express = require('express');
const asyncHandler = require("express-async-handler");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie,  requireAuth, restoreUser } = require('../../utils/auth');
const { Comment } = require('../../db/models')

const router = express.Router();


router.get('/',asyncHandler(async(req, res)=>{
    const comments = await Comment.findAll()
    return res.json(comments)
}));

router.get('/:id', restoreUser, asyncHandler(async(req, res)=>{
    const comment = await Comment.findByPk(req.params.id)
    return res.json(comment)
}));

router.post('/', restoreUser, asyncHandler(async(req, res)=>{
    const id= await Comment.create(req.body);
    return res.json(id)
}));

router.delete('/:id', asyncHandler(async(req, res)=>{
    const comment = await Comment.findByPk(req.params.id)
    if(!comment) throw new Error ("Cannot find your comment");
    await Comment.destroy({where: {id: comment.id}})
    return comment;
}));

router.put('/:id', restoreUser, asyncHandler(async(req, res)=>{
    let id = req.body.id
    
    const updatedComment = await Comment.update(req.body, {where: {id}});
    const comment = await Comment.findByPk(id)

   return res.json(comment)
}))
module.exports = router;
