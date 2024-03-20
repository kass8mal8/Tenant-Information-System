const Appartment = require('../model/property')

const get_appartments = async(req, res) => {
    const { user_id } = req.params
    const appartments = await Appartment.find({ user_id })
    
    try {
        if(appartments) {
            res.json({ appartments }).status(200)
        }
    } catch (error) {
        res.json({error}).status(500)
    }
}

const add_appartment = async(req, res) => {
    const { house_name, location, price, house_number, units } = req.body
    const { user_id } = req.params

    console.log(req.body)

    try {
        const appartment = await Appartment.create({
            house_name, location, price, house_number, units, user_id
        })

        res.json({ 
            message: `${appartment.house_name} added successfully`
        }).status(200)
    } catch (error) {
        res.json({ message: 'Error adding appartment' }).status(500)
    }

}

const remove_appartment = async(req, res) => {
    const { user_id } = req.params
    const appartment = await Appartment.findByIdAndDelete(user_id)
    
    try {
        if(appartment) {
            res.json({ message: `${appartment.house_name} successfully deleted` }).status(200)
        }
    } catch (error) {
        res.json({error}).status(500)
    }
}

module.exports = {
    add_appartment,
    get_appartments,
    remove_appartment
}