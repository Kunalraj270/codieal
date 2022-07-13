const mongoose = require('mongoose');
const multer = require('multer');
const imageSchema = new mongoose.Schema({
   name : String,
   desc : String,
   img : {
       data : Buffer,
       contentType : String
   }
})

module.exports = new mongoose.model('Image' , imageSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });