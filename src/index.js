const express = require('express')
const app = express()

const authRoute = require('./routes/auth')
const bodyParser = require("body-parser");
const {checkConnectDb} = require("./middleware/checkConnectDb");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res) => {
    res.json({
        status: true,
        massage: "All api ready !"
    })
})

app.use('/auth',checkConnectDb)
app.use('/auth',authRoute)



app.listen(8000,() => {
    console.log("Server running on port 8000 => http://localhost:8000")
})