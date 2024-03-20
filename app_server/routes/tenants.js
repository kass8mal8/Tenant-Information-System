const { Router } = require('express')
const { removeTenant, addTenant, updateTenant, getTenants } = require('../controllers/tenants')
const router = Router()

router.post('/add/:user_id', addTenant)
router.delete('/remove/:tenant_id', removeTenant)
router.put('/update/:tenant_id', updateTenant)
router.get('/:user_id', getTenants)

module.exports = router