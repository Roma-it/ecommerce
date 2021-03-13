const multer = require('multer');
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/users'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    } ,
});
const upload = multer ({storage: multerStorage})

module.exports = upload;