const express = require('express')
const { authLogin, authRegister, authRefreshToken, authMe, authLogout } = require("../controller/auth");
const authRouter = express.Router()

authRouter.post('/login', authLogin)
authRouter.post('/register', authRegister)
authRouter.post('/refresh', authRefreshToken)
authRouter.post('/logout', authLogout)
authRouter.get('/me', authMe)

module.exports = authRouter