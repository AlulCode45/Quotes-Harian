const {checkConnect} = require("../config/connection_db");

const checkConnectDb = (req,res,next) => {
    if(checkConnect){
        next()
    }
}

module.exports = {
    checkConnectDb
}