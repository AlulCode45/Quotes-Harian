const { dbConnect } = require("../config/connection_db")
const { getBearerToken } = require("../controller/auth")

const checkToken = async (req, res, next) => {
    const token = getBearerToken(req?.headers?.authorization)

    return await dbConnect.table('users')
        .where('token', '=', token)
        .first('*')
        .then(() => {
            next()
        }).catch(() => {
            res.status(401).json({
                status: false,
                massage: "Unauthenticated"
            })
        })

}
module.exports = { checkToken }