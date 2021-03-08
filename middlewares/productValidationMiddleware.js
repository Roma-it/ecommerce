// const { body } = require('express-validator');
// const path = require('path');

// function productValidationMiddleware () {
//     const validateRegister = [
//         body('name')
//             .notEmpty().withMessage('Debes completar el nombre').bail()
//             .isLength({ min: 5 }).withMessage('El nombre debe ser más largo'),
//         body('spec')
//             .notEmpty().withMessage('Debes completar al menos una especificación principal'),
//         body('description')
//             .notEmpty().withMessage('Debes agregar una descripción general para el producto').bail()
//             .isLength({ min: 2 }).withMessage('La descripción debe ser más larga'),
//         body('category')
//            .notEmpty().withMessage('Debes seleeccionar una cotegoría'),
//         body('price')
//            .notEmpty().withMessage('Debes completar el precio').bail()
//            .isNumeric({ no_symbols: true }).withMessage('Solo puedes ingresar números'),
//         body('images').custom((value, {req}) =>{
//             let files = req.files;
//             let acceptedExtensions = [".jpg",".jpeg",".png"]
//             if (!files) {
//                 throw new Error("Tienes que subir al menos una imagen");
//             };
//             files.forEach(image => {
//                 if ( acceptedExtensions.includes( path.extname(image.originalname))){
//                     throw new Error(`Las imagenes permitidas son ${acceptedExtensions.join(", ")}`)
//                 }; 
//             });
//             return true;
//             }
//         )
//     ]
//     return validateRegister;
// }

// module.exports = productValidationMiddleware;
