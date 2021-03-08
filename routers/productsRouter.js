const express = require ('express');
const router = express.Router();
const multer = require('multer')
const path = require ('path')
const { body }  = require ('express-validator');

const productsController = require ('../controllers/productsController');

const productValidationMiddleware = require('../middlewares/productValidationMiddleware');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/products'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    } 
});
const upload = multer ({storage: multerStorage})

const validateRegister = [
    body('productName')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe ser más largo'),
    body('productTopSpec1')
        .notEmpty().withMessage('Debes completar al menos una especificación principal'),
    body('productDescription')
        .notEmpty().withMessage('Debes agregar una descripción general para el producto').bail()
        .isLength({ min: 2 }).withMessage('La descripción debe ser más larga'),
    body('productCategory')
       .notEmpty().withMessage('Debes seleeccionar una cotegoría'),
    body('productPrice')
       .notEmpty().withMessage('Debes completar el precio').bail()
       .isNumeric({ no_symbols: true }).withMessage('Solo puedes ingresar números'),
    body('productImg').custom((value, {req}) =>{
        let files = req.files;
        let acceptedExtensions = [".jpg",".jpeg",".png"]
        if (!files) {
            throw new Error("Tienes que subir al menos una imagen");
        };
        files.forEach(image => {
            if ( acceptedExtensions.includes( path.extname(image.originalname))){
                throw new Error(`Las imagenes permitidas son ${acceptedExtensions.join(", ")}`)
            }; 
        });
        return true;
        }
    )
]

const validateEdit = [
    body('productName')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe ser más largo'),
    body('productTopSpec1')
        .notEmpty().withMessage('Debes completar al menos una especificación principal'),
    body('productDescription')
        .notEmpty().withMessage('Debes agregar una descripción general para el producto').bail()
        .isLength({ min: 2 }).withMessage('La descripción debe ser más larga'),
    body('productPrice')
       .notEmpty().withMessage('Debes completar el precio').bail()
       .isNumeric({ no_symbols: true }).withMessage('Solo puedes ingresar números'),
    body('productImg').custom((value, {req}) =>{
        let files = req.files;
        let acceptedExtensions = [".jpg",".jpeg",".png"]
        if (!files) {
            throw new Error("Tienes que subir al menos una imagen");
        };
        files.forEach(image => {
            if ( acceptedExtensions.includes( path.extname(image.originalname))){
                throw new Error(`Las imagenes permitidas son ${acceptedExtensions.join(", ")}`)
            }; 
        });
        return true;
        }
    )
]


router.get('/', productsController.products);
router.get('/detail/:id', productsController.detail);
router.get('/cart', productsController.cart);
router.put('/cart/:id', productsController.cartAdd);
router.delete('cart/:id', productsController.cartDelete);
router.get('/create', productsController.createView);
router.post('/create', upload.array('productImg'), validateRegister, productsController.create);
router.get('/listado', productsController.list)
router.get('/edit/:id', productsController.editView);
router.put('/edit/:id', upload.array('productImg'), validateEdit, productsController.edit);
router.put('/edit/price/:id', productsController.editPrice);
router.put('/edit/highlighted/:id', productsController.editHighlighted);
router.delete('/delete/:id', productsController.delete);

module.exports = router;