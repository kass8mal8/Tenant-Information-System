const Finance = require('../model/finance')

const addFinance = async(req, res) => {
    const { payment_date, amount, tenant_name, house_number, user_id } = req.body
    const { tenant_id } = req.params
    const dateExp = /\d\d-\d\d-\d\d\d\d/

    try {
        if(dateExp.test(payment_date)) {
            await Finance.create({ payment_date, amount, tenant_id, tenant_name, house_number, user_id })
            res.json({ message: 'Successfully added' }).status(200)
        } 
        else { throw new Error ("Invalid date format") }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

const getFinance = async(req, res) => {
    const { user_id } = req.params
    try {
        const finance = await Finance.find({ user_id })
        res.json({ finance }).status(200)
    } catch (error) {
        res.json({error}).status(500)
    }
}

module.exports = {
    addFinance,
    getFinance
}