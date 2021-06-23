const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const commentsRouter = require('./comments.js')


router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

router.use('/session', sessionRouter);

router.use('/users', usersRouter);
router.use('/comments',commentsRouter)



module.exports = router;


