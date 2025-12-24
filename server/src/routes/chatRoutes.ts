import { Router } from 'express'
import { chatController } from '../controllers/chatController.js'
import { getHistoryController } from '../controllers/historyController.js'
import { validateChatRequest } from '../middlewares/validateMiddleware.js'

const router = Router()

router.post('/message', validateChatRequest, chatController)
router.get('/history/:sessionId', getHistoryController)

export default router