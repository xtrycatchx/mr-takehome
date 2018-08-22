import express from 'express'
import { container } from '../di/container'
const router = express.Router()
const historyController = container.resolve('historyController')

router.get('/history/:number', historyController.get)

export default router;