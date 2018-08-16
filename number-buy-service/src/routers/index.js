import express from 'express'
import { container } from '../di/container'
const router = express.Router()
const buyController = container.resolve('buyController')

router.post('/buy', buyController.post)

export default router;