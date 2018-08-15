import express from 'express'
import { container } from '../di/container'
const router = express.Router()
const updateController = container.resolve('updateController')
const randomController = container.resolve('randomController')

router.post('/numbers', updateController.post)
router.get('/numbers', randomController.get)
router.get('/numbers/:count', randomController.get)

export default router;