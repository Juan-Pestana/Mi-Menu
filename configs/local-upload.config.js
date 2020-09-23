const multer = require('multer')

const uploader = multer({
    dest: './public/uploads/'
})

module.exports = uploader