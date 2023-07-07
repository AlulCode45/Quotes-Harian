const express = require('express')
const { getAllQuotes, getQuoteById, storeQuote } = require('../controller/quotes')
const quoteRouter = express.Router()

quoteRouter.get('/', getAllQuotes)
quoteRouter.post('/', storeQuote)
quoteRouter.get('/:id', getQuoteById)


module.exports = quoteRouter