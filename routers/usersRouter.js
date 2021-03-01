const express = require ('express');
const router = express.Router();
const multer = require('multer')
const usersController = require ('../controllers/usersController');
const path = require ('path');
const {check} = require ('express-validator');

let registerValidation = [
    check('nombre').notEmpty().withMessage("Debes completar el nombre"),
    check('email').notEmpty().withMessage("Debes completar un email").bail()
    .isEmail().withMessage("Debes ingresar un formato de email valido"),
    check('telefono').isInt().withMessage("Solo puedes ingresar numeros"),
    check('password').notEmpty().withMessage("Debes ingresar una contrasenia").bail()
    .isLength( { min: 6}).withMessage("La contraseña debe tenes al menos 6 caracteres")
]
let editProfileValidation = [
    check('nombre').notEmpty().withMessage("Debes completar el nombre"),
    check('telefono').isInt().withMessage("Solo puedes ingresar numeros"),
    check('password').isLength( { min: 6}).withMessage("La contraseña debe tenes al menos 6 caracteres")
]


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
router.get('/admin/:id', usersController.admin);
router.post('/login/valid', usersController.validLogin);
router.get('/register', usersController.registerView);
router.post('/register', registerValidation, usersController.register);
router.get('/profile/:id', usersController.userProfile);
router.get('/profile/:id/edit', usersController.editProfileView);
router.put('/edit/:id', editProfileValidation, upload.single('image'), usersController.editProfile);
router.delete('/delete/:id', usersController.delete);

module.exports = router;