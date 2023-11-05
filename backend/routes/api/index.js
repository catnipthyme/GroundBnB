const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');
const reviewImageRouter = require('./review-images.js');
const spotImageRouter = require('./spot-images.js');
const bookingsRouter = require('./bookings.js');
const {restoreUser, requireAuth} = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter);

router.use('/review-images', reviewImageRouter);

router.use('/spot-images', spotImageRouter);

router.use('/bookings', bookingsRouter)

// router.post()

router.post('/test', function(req, res) {
  res.json({requestBody: req.body});
});

//// TEST CODE
// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// const {setTokenCookie} = require('../../utils/auth.js');
// const {User} = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'DemoUser1'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({user:user});
// });
// const {requireAuth} = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

module.exports = router
