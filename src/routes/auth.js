const express = require('express')
const {authLogin, authRegister} = require("../controller/auth");
const route = express.Router()

route.post('/login',authLogin)
route.post('/register',authRegister)

module.exports = route