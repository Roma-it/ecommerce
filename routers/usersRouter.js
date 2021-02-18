const express = require ('express');
const router = express.Router();
const multer = require('multer')
const usersController = require ('../controllers/usersController');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/users'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    } ,
});
const upload = multer ({storage: multerStorage})

router.get('/login', usersController.login);
router.get('/register', usersController.registerView);
router.post('/register',  upload.single('image'), usersController.register);
router.get('/edit/:id', usersController.editView);
router.put('/edit/:id', upload.single('image'), usersController.edit);
router.delete('/delete/:id', usersController.delete);

module.exports = router;