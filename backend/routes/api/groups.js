const express = require('express');
const asyncHandler = require("express-async-handler");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie,  requireAuth, restoreUser } = require('../../utils/auth');
const { Group } = require('../../db/models')


const router = express.Router();


router.get('/', asyncHandler(async(req, res)=>{
    const groups = await Group.findAll()
    return res.json(groups)
}));

router.get('/:id', restoreUser, asyncHandler(async(req, res)=>{
    const group = await Group.findByPk(req.params.id)
    return res.json(group)
}));

router.post('/', restoreUser, asyncHandler(async(req, res)=>{
    const id= await Group.create(req.body);
    return res.json(id)
}));

router.delete('/:id', asyncHandler(async(req, res)=>{
    const group = await Group.findByPk(req.params.id)

    if(!group) throw new Error ("Cannot find group");
    await Group.destroy({ where: { id: group.id }});
    const groups = await Group.findAll()
    return groups;
}));

router.put('/:id', restoreUser, asyncHandler(async(req, res)=>{
    let id = req.body.id

    const updatedGroup = await Group.update(req.body, {where: {id}});
    const group = await Group.findByPk(id)

   return res.json(group)
}))

module.exports = router;
