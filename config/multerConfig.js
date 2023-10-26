const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //where you want to store the images or files being uploaded
    cb(null, path.join(__dirname, '../images/petfood'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
}) 
const upload = multer({storage: storage})

module.exports = upload;