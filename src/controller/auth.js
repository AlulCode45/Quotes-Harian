const { dbConnect } = require("../config/connection_db");
const bcrypt = require('bcrypt')

const getBearerToken = (token) => {
    if (typeof token !== 'undefined') {
        return token.split(' ')[1]
    }
}

const authLogin = async (req, res) => {
    const data = await dbConnect.table('users')
        .where('username', '=', req?.body?.username)
        .first('*')
        .then((out) => {
            return out
        })

    if (data) {
        if (bcrypt.compareSync(req?.body?.password, data?.password)) {
            const randomToken = require('random-token').create("abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()+{}|~.,/&");
            const token = randomToken(62);
            const changeToken = await dbConnect.table('users')
                .where('username', '=', req?.body?.username)
                .first('*')
                .update({
                    token: token
                })
                .then(() => {
                    data['token'] = token
                    return true
                }).catch(() => {
                    return false
                })
            if (changeToken) {
                res.json({
                    status: true,
                    massage: "Login successfully",
                    data: data
                })
            }
        } else {
            res.status(401).json({
                status: false,
                massage: "Your username / password incorrect",
            })
        }
    }

}

const authRegister = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req?.body?.password, salt);

    const randomToken = require('random-token').create("abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()+{}|~.,/&");
    const token = randomToken(62);

    const data = {
        name: req?.body?.name,
        username: req?.body?.username,
        password: hash,
        token: token
    }

    dbConnect.insert(data)
        .into('users')
        .then(() => {
            res.status(201)
                .json({
                    status: true,
                    massage: "Register successfully!"
                })
        })
}

const authRefreshToken = async (req, res) => {
    const token = getBearerToken(req?.headers?.authorization)

    const randomToken = require('random-token').create("abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()+{}|~.,/&");
    const newToken = randomToken(62);

    const data = await dbConnect.table('users')
        .where('token', '=', token)
        .first('*')
        .then((out) => {
            return out
        })

    return await dbConnect.table('users')
        .where('id', data?.id)
        .first('token')
        .update({
            token: newToken
        }).then(() => {
            res.json({
                status: true,
                massage: "Token refresh",
                token: newToken
            })
        }).catch(() => {
            res.json({
                status: false,
                massage: "Token not refresh"
            })
        })
}

const authMe = async (req, res) => {
    const token = getBearerToken(req?.headers?.authorization)
    return await dbConnect.table('users')
        .where('token', '=', token)
        .first('*')
        .then((out) => {
            res.json({
                status: true,
                massage: "Get successfully",
                data: out
            })
        })
}

const authLogout = async (req, res) => {
    const token = getBearerToken(req?.headers?.authorization)
    return await dbConnect.table('users')
        .where('token', '=', token)
        .first('*')
        .then(async (out) => {
            return await dbConnect.table('users')
                .where('id', out?.id)
                .update({
                    token: null
                }).then(() => {
                    res.json({
                        status: true,
                        massage: "Logout successfully"
                    })
                })
        })
}

module.exports = {
    authLogin,
    authRegister,
    authRefreshToken,
    getBearerToken,
    authMe,
    authLogout
}