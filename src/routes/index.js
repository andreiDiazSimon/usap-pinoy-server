import express from "express";
import testRouter from './test.route.js'
import translateRouter from './translate.route.js'

const router = express.Router();

router.use('/test', testRouter)
router.use('/translate', translateRouter);

export default router;

