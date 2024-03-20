const { Schema, model } = require('mongoose')

const options = {
    unique: true,
    required: true
}

const tenantSchema = new Schema({
    user_id: String,
    name: String,
    telephone: { ...options, type: Number },
    house_number:String,
    room_number: { ...options, type: String }
})

const Tenant = model('tenant', tenantSchema)
module.exports = Tenant