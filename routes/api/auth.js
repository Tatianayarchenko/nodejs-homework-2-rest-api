const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');

const { ctrlWrapper } = require('../../helpers');

const { schemas } = require('../../models/user');

const ctrl = require('../../controllers/auth');

const router = express.Router();

// signup
router.post(
  '/register',
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post(
  '/verify',
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
);

// signin
router.post(
  '/login',
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

// current
router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

// logout
router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
