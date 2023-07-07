const express = require('express')
const app = express()

const authRouter = require('./routes/auth')
const quoteRouter = require('./routes/quotes')

const bodyParser = require("body-parser");
const { checkConnectDb } = require("./middleware/checkConnectDb");
const { checkToken } = require('./middleware/checkToken');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.json({
        status: true,
        massage: "All api ready !"
    })
})

app.use('/auth', checkConnectDb)
app.use('/auth', authRouter)

app.use('/quotes', checkToken)
app.use('/quotes', quoteRouter)


app.listen(8000, () => {
    console.log("Server running on port 8000 => http://localhost:8000")
})