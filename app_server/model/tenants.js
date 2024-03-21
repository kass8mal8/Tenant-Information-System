const { Schema, model } = require('mongoose')

const options = {
    unique: true,
    required: true,
    type: Number
}

const tenantSchema = new Schema({
    user_id: String,
    name: String,
    telephone: options,
    house_number:String,
    room_number: String
})

const Tenant = model('tenant', tenantSchema)
module.exports = Tenant