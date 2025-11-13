import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import User from '../models/users.js'

const registerRouter = Router()

//route: /api/auth/register
registerRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body

    if (!password || password.length < 3) {
        return res.status(400).json({ error: 'Password must be at least 3 characters long' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ error: 'Email already taken' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        email,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    const userForToken = {
        username: savedUser.username,
        id: savedUser._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(201).json({ token, username: savedUser.username, name: savedUser.name })
})

export default registerRouter