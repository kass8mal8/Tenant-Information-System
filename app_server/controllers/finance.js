const Finance = require('../model/finance')

const addFinance = async(req, res) => {
    const { payment_date, amount, tenant_name, house_number } = req.body
    const { tenant_id } = req.params

    try {
        const finance = await Finance.create({ payment_date, amount, tenant_id, tenant_name, house_number })
        res.json({ message: 'Successfully added' }).status(200)
    } catch (error) {
        res.json({error}).status(500)
    }
}

const getFinance = async(req, res) => {
    try {
        const finance = await Finance.find({})
        res.json({ finance }).status(200)
    } catch (error) {
        res.json({error}).status(500)
    }
}

module.exports = {
    addFinance,
    getFinance
}