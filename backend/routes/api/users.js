const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Sign up
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

router.get('/', restoreUser, asyncHandler(async(req, res)=>{
  const users = await User.findAll()
  return res.json(users)
}));

router.delete('/:id', asyncHandler(async(req, res)=>{
  const user = await User.findByPk(req.params.id)

  if(!group) throw new Error ("Cannot find item");
  return group.id;
}));

module.exports = router;
