import express from 'express'
import cors from 'cors'
import chatRoutes from './routes/chatRoutes.js'
import { errorMiddleware } from './middlewares/errorMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/chat', chatRoutes)
app.use(errorMiddleware)

export default app