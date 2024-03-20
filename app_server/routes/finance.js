const { Router } = require('express')
const { getFinance, addFinance } = require('../controllers/finance')
const router = Router()

router.get('/', getFinance)
router.post('/add/:tenant_id', addFinance)

module.exports = router