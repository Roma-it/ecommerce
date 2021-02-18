const express = require ('express');
const router = express.Router();
const multer = require('multer')
const path = require ('path')
const productsController = require ('../controllers/productsController');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/img/products'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`);
    } 
});

const upload = multer ({storage: multerStorage})

router.get('/', productsController.products);
router.get('/:id', productsController.detail);
router.get('/cart', productsController.cart);
router.get('/create', productsController.createView);
router.post('/create', upload.array('productImg'), productsController.create);
router.get('/edit/:id', productsController.editView);
router.put('/edit/:id', productsController.edit);
router.delete('/delete/:id', productsController.delete);

module.exports = router;