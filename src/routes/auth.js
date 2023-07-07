const express = require('express')
const {authLogin, authRegister, authRefreshToken, authMe} = require("../controller/auth");
const route = express.Router()

route.post('/login',authLogin)
route.post('/register',authRegister)
route.post('/refresh',authRefreshToken)
route.get('/me',authMe)

module.exports = route