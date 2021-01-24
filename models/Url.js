const mongoose = require('mongoose')
const customId = require('../helpers/customId')

const Schema = mongoose.Schema

const urlSchema = new Schema({
    long: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: () => customId(6)

    },
    clicks: {
        type: Number,
        required: true,
        default: 40
    }
})
module.exports = mongoose.model('ShortUrl', urlSchema)