const fs = require ('fs');
const path = require('path')

const dataJSON = path.join(__dirname, '../data/products.json');

controller = {
    detail: (req,res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        let product = products.find(prod => prod.id == req.params.id)
        res.render('./products/productDetail', {product});
    },
    cart: (req,res) => {
        res.render('./products/productCart');
    },
    createView: (req,res) => {
        res.render('./products/productCreate')
    },
    create: (req, res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);

        let imgNames = [];
        req.files.forEach(element => {
                imgNames.push(element.filename);
            });
        let newId = 0;
		for ( i in products) {
    		if (products[i].id >= newId)
        	newId = products[i].id +1
			};
        products.push({
            id: newId,
            name: req.body.productName,
            especs: [
                    req.body.productTopEspec1,
                    req.body.productTopEspec2,
                    req.body.productTopEspec3,
                    req.body.productTopEspec4,
            ],
            description: req.body.productDescription,
            img: imgNames,
            category: req.body.productCategory,
            price: req.body.productPrice,
        });

        fs.writeFileSync(dataJSON, JSON.stringify(products));

        res.redirect(`/products/${newId}`)
    },
    editView: (req,res) => {
        
        res.render('./product/productEdit', {product})},
    edit: (req,res) => {
        res.redirect(`/products/${product.id}`)
    },
    delete: (req,res) => {
        res.redirect('/products')
    }
}

module.exports = controller;