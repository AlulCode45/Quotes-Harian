const {dbConnect} = require("../config/connection_db");
const bcrypt = require('bcrypt')

const authLogin = async (req,res) => {
    const data = await dbConnect.table('users')
        .where('username','=',req?.body?.username)
        .first('*')
        .then((out) => {
            return out
        })

    if(data){
        if(bcrypt.compareSync(req?.body?.password,data?.password)){
            const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|\/~.,');
            const token = randomToken(42);
            const changeToken = await dbConnect.table('users')
                .where('username','=',req?.body?.username)
                .first('*')
                .update({
                    token: token
                })
                .then((out) => {
                    return true
                }).catch((err) => {
                    return false
                })
            if(changeToken){
                res.json({
                    status: true,
                    massage: "Login successfully",
                    data: data
                })
            }
        }else{
            res.status(401).json({
                status: false,
                massage: "Your username / password incorrect",
            })
        }
    }

}

const authRegister = async (req,res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req?.body?.password, salt);

    const randomToken = require('random-token').create('abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|\/~.,');
    const token = randomToken(42);

    const data = {
        name:  req?.body?.name,
        username: req?.body?.username,
        password:  hash,
        token: token
    }

    dbConnect.insert(data)
        .into('users')
        .then((out) => {
            res.status(201)
                .json({
                status:true,
                massage:"Register successfully!"
            })
        })

}

module.exports = {
    authLogin,
    authRegister
}