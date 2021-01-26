const mongoose = require('mongoose')


const Schema = mongoose.Schema

const urlSchema = new Schema({

    long: String,
    short: String,
    clicks: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: Date.now
    },
    name: String,
    description: String
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
module.exports = mongoose.model('ShortUrl', urlSchema)