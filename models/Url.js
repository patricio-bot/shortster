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
        default: 0
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
module.exports = mongoose.model('ShortUrl', urlSchema)