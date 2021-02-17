const express = require ('express');
const router = express.Router();
const multer = require('multer')
const path = require ('path')
const productController = require ('../controllers/productController');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/products'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    } 
});

const upload = multer ({storage: multerStorage})

router.get('/', productController.detail);
router.get('/cart', productController.cart);
router.get('/create', productController.createView);
router.post('/create', upload.array('productImg'), productController.create);
router.get('/edit/:id', productController.editView);
router.put('/edit/:id', productController.edit);

module.exports = router;