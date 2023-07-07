const express = require('express')
const { authLogin, authRegister, authRefreshToken, authMe, authLogout } = require("../controller/auth");
const route = express.Router()

route.post('/login', authLogin)
route.post('/register', authRegister)
route.post('/refresh', authRefreshToken)
route.post('/logout', authLogout)
route.get('/me', authMe)

module.exports = route