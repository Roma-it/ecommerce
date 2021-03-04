const fs = require ('fs');
const path = require('path')

const dataJSON = path.join(__dirname, '../data/products.json');

controller = {
    products: (req,res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        res.render('./products/products', {products});
    },
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
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        let product = products.find(prod => prod.id == req.params.id)
        res.render('./product/productEdit', {product})},
    edit: (req,res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        let index = products.findIndex ( product => product.id == req.params.id);
        products(index).name = req.body.productName
        products(index).spec[0] = req.body.productTopEspec1
        products(index).spec[1] = req.body.productTopEspec2
        products(index).spec[2] = req.body.productTopEspec3
        products(index).spec[3] = req.body.productTopEspec4
        products(index).description = req.body.productDescription
        products(index).price = req.body.productPrice
        req.files.forEach(element => {
            product(index).img.push(element.filename);
        });
        fs.writeFileSync(dataJSON, JSON.stringify(products));
        res.redirect(`/products/${product.id}`)
    },
    delete: (req,res) => {
        res.redirect('/products')
    }
}

module.exports = controller;