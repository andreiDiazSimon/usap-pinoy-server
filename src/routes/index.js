import express from "express";
import testRouter from './test.route.js'
import translateRouter from './translate.route.js'
import signupRouter from './signup.route.js'
import loginRouter from './login.route.js'

const router = express.Router();

router.use('/test', testRouter)
router.use('/translate', translateRouter);
router.use('/signup', signupRouter)
router.use('/login', loginRouter)

export default router;

