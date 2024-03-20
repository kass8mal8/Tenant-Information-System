const { Schema, model } = require('mongoose')

const propertySchema = new Schema({
    user_id: String,
    house_name: String,
    house_number: String,
    location: String,
    price: Number,
    units: Number
})

const Appartment = model('appartment', propertySchema)
module.exports = Appartment