const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

//register 
const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) return res.status(404).json({ status: 'failed', message: "Field is required!" })
    try {
        const salt = 10
        const hashPassword = await bcrypt.hash(password, salt)
        const user = new User({ name, email, password: hashPassword })

        //validate
        const exitEmail = await User.findOne({ email: email })
        if (exitEmail) return res.status(404).json({ status: 'failed', message: "Email is already exits!" })

        await user.save()
        res.status(201).json({ status: "success", message: "User register successfully" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

//login 
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(404).json({ status: "failed", message: "Field is required!" })
    try {

        //validate
        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ status: 'failed', message: "Email is not valid!" })

        const userPwd = await bcrypt.compare(password, user.password)
        if (!userPwd) return res.status(401).json({ status: "failed", message: "Password is not valid!" })

        //generateToken
        const userToken = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_KEY, { expiresIn: "30d", })

        res.cookie(userToken).status(200).json({ status: "success", message: "Login successful" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
}

module.exports = { register, login }