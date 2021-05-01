const { check } = require("express-validator");

module.exports = {
  register: [
    check("nombre").notEmpty().withMessage("Debes completar el nombre"),
    check("email")
      .notEmpty()
      .withMessage("Debes completar un email")
      .bail()
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("telefono").isInt().withMessage("Solo puedes ingresar números"),
    check("password")
      .notEmpty()
      .withMessage("Debes ingresar una contraseña")
      .bail()
      .isLength({ min: 8 })
      .withMessage("La contraseña debe tenes al menos 8 caracteres"),
  ],
  editProfile: [
    check("nombre").notEmpty().withMessage("Debes completar el nombre"),
    check("telefono").isInt().withMessage("Solo puedes ingresar números"),
  ],
};
