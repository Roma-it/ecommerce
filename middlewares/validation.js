const {check} = require ('express-validator');

module.exports = {
    register: [
        check('nombre').notEmpty().withMessage("Debes completar el nombre"),
        check('email').notEmpty().withMessage("Debes completar un email").bail()
        .isEmail().withMessage("Debes ingresar un formato de email valido"),
        check('telefono').isInt().withMessage("Solo puedes ingresar numeros"),
        check('password').notEmpty().withMessage("Debes ingresar una contrasenia").bail()
        .isLength( { min: 6}).withMessage("La contraseña debe tenes al menos 6 caracteres")
    ],
    editProfile: [
    check('nombre').notEmpty().withMessage("Debes completar el nombre"),
    check('telefono').isInt().withMessage("Solo puedes ingresar numeros")
    ]
}

