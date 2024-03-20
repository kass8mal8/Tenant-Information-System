const express = require('express')
const router = express.Router()
const { get_appartments, add_appartment, remove_appartment } = require('../controllers/property')

router.get('/:user_id', get_appartments)
router.delete('/remove/:user_id', remove_appartment)
router.post('/add-house/:user_id', add_appartment)

module.exports = router

