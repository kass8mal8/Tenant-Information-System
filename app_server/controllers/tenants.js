const Tenant = require('../model/tenants')

const addTenant = async(req, res) => {
    const { name, telephone, house_number, room_number } = req.body
    const { user_id } = req.params
    console.log(req.body, user_id)

    try {
        if(typeof(telephone) !== 'number') {
            res.json({ message: "Phone must be a number" })
        }
        else if(telephone.toString().length !== 9) {
            res.json({ message: "Invalid phone number" })
        }
        else {
            const tenant = await Tenant.create({ name, telephone, house_number, room_number, user_id })
            res.json({ message: `${tenant.name} added successfully` }).status(200)
        }
    } catch (error) {
        console.log({error})
        res.json({ error }).status(500)
    }

}

const removeTenant = async(req, res) => {
    const { tenant_id } = req.params

    try {
        const tenant = await Tenant.findByIdAndDelete(tenant_id)
        if(tenant) res.json({ message: `${tenant.name} removed successfully` }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}

const updateTenant = async(req, res) => {
    const updateDetails = req.body
    const { tenant_id } = req.params

    try {
        const tenant = await Tenant.findByIdAndUpdate(tenant_id, updateDetails)
        if(tenant) res.json({ message: "Tenant updated successfully" }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}

const getTenants = async(req, res) => {
    const { user_id } = req.params

    try {
        const tenants = await Tenant.find({ user_id })
        console.log({tenants})
        if(tenants) res.json({ tenants }).status(200)
    } catch (error) {
        res.json({ error }).status(500)
    }
}

module.exports = {
    addTenant,
    removeTenant,
    updateTenant,
    getTenants
}