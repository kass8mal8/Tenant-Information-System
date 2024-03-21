const { Schema, model } = require('mongoose')

const financeSchema = new Schema({
    tenant_id: {type: String, required: true},
    user_id: String,
    tenant_name: String,
    house_number: String,
    payment_date: String,
    amount: Number
})

const Finance = model('finance', financeSchema)
module.exports = Finance
