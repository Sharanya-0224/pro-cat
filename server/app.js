import express from "express"
import mongoose from "mongoose"
import loginRouter from "./controllers/login.js"
import registerRouter from "./controllers/register.js"
import config from "./utils/config.js"
import logger from "./utils/logger.js"
import middleware from "./utils/middleware.js"
import cors from "cors"

const app = express()

//logger.info("port:", config.PORT, "mongodb:", config.MONGO_URI)

logger.info('Connecting to', config.MONGO_URI)
mongoose.connect(config.MONGO_URI)
    .then(() => {
        logger.info('Connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.getTokenFrom)

app.use('/api/auth/login', loginRouter)
app.use('/api/auth/register', registerRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app



