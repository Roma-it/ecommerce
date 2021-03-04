const express = require ('express');
const router = express.Router();
const multer = require('multer')
const usersController = require ('../controllers/usersController');
const path = require ('path');

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
router.post('/login/valid', usersController.validLogin);
router.get('/register', usersController.registerView);
router.post('/register',  usersController.register);
router.get('/profile/:id', usersController.userProfile);
router.get('/profile/:id/edit', usersController.editProfileView);
router.put('/edit/:id', upload.single('image'), usersController.editProfile);
router.delete('/delete/:id', usersController.delete);

module.exports = router;