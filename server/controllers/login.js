import jwt from 'jsonwebtoken'
import User from '../models/users.js'
import bcrypt from 'bcryptjs'
import {Router} from 'express'

const loginRouter=Router()


// route: /api/auth/login
loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        const correctPassword = user === null
        ? false
        : await bcrypt.compare(password,user.passwordHash)
        
        if (!(user && correctPassword)) {
            return res.status(401)  //unauthorized transaction
            .json({error: 'Incorrect username/password'})
        }

        const userForToken = {
            email: user.email,
            name: user.name,
            id: user._id,
        }

        const token = jwt.sign(
            userForToken, 
            process.env.SECRET,
            { expiresIn: '1h' }
        )

        res
        .status(200)
        .send({ token, username: user.username, name: user.name, id: user._id })
    } catch (error) {
        console.error("Login error:", error)
        res.status(500).json({ error: 'Internal server error' })
    }
})

export default loginRouter