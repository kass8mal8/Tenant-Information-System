const express = require("express");
require('dotenv').config()
const cors = require('cors')
const logger = require('morgan')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
// app.use()

// const uploadDirectory = './uploads';
// if (!fs.existsSync(uploadDirectory)) {
//     fs.mkdirSync(uploadDirectory);
// }

// const storage = multer.diskStorage({
//     destination: ( req, file, cb) => {
//         cb(null, uploadDirectory)
//     },
//     // upload a file with extension name
//     filename: (req, file, cb) => {
//         cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// const fileExtensions = ['.jpg', '.png', '.gif', '.jpeg', '.webp']
// const upload = multer({ 
//     storage,
//     fileFilter: (req, file, cb) => {
//         const extension = path.extname(file.originalname)
//         if(!fileExtensions.includes(extension)) {
//             return cb(new Error('Only images are allowed'))
//         }

//         cb(null, true)
//     }
// })

const houseRoute = require('./routes/property')
const authRoute = require('./routes/auth')
const tenantRoute = require('./routes/tenants')
const financeRoute = require('./routes/finance')

// app.use('/api/house', upload.single('fileSelected'), houseRoute)
app.use('/api/auth', authRoute)
// app.use('/uploads', express.static('uploads'))
app.use('/api/house', houseRoute)
app.use('/api/tenants', tenantRoute)
app.use('/api/finance', financeRoute)

module.exports = app