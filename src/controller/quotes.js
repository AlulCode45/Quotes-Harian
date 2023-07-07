const { dbConnect } = require("../config/connection_db")
const { getUserByToken, getBearerToken } = require("./auth")

const getAllQuotes = async (req, res) => {
    return await dbConnect.table('quotes').leftJoin('users', 'quotes.user_id', 'users.id')
        .select('quotes.*', 'users.username AS uploaded_by')
        .then((out) => {
            res.json({
                status: true,
                massage: "Get data successfully",
                data: out
            })
        })
}

const getQuoteById = async (req, res) => {
    return await dbConnect.table('quotes').leftJoin('users', 'quotes.user_id', 'users.id')
        .select('quotes.*', 'users.username AS uploaded_by')
        .where('quotes.id', req?.params?.id)
        .then((out) => {
            res.json({
                status: true,
                massage: "Get data successfully",
                data: out
            })
        })
}

const storeQuote = async (req, res) => {
    const token = getBearerToken(req?.headers?.authorization)
    const user = await getUserByToken(token)

    return await dbConnect.table('quotes')
        .insert({
            user_id: user?.id,
            quote_text: req?.body?.quote_text,
            author: req?.body?.author
        }).then(() => {
            res.json({
                status: true,
                massage: "Save quote successfully",
            })
        })
}

module.exports = {
    getAllQuotes,
    getQuoteById,
    storeQuote
}