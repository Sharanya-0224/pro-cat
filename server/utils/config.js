import dotenv from "dotenv"

dotenv.config({ path: '../.env' })

const PORT=process.env.PORT
const MONGO_URI=process.env.MONGO_URI

export default { PORT, MONGO_URI }