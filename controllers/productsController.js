const fs = require ('fs');
const path = require('path')
const {validationResult} = require('express-validator');

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
        let product = products.find(prod => prod.id == req.params.id);
        let similary = products.filter(prod => prod.category == product.category && prod.id != req.params.id);
        res.render('./products/productDetail', {product, similary});
    },
    cart: (req,res) => {
        if (req.session && req.session.cart) {
            let cart = req.session.cart;
            const account = {
                total: function () {
                    let total = 0;
                    cart.forEach(product => {
                        total = total + (product.price * product.amount)
                    });
                    return total;
                },
                subtotal: () => this.total() - (this.total() * 0.21),
                impuestos: () => this.total() * 0.21
            }
            res.render('./products/productCart', {cart, account});
        };
        res.render('./products/productCart', {cart: null, account: null})
    },
    cartAdd: (req, res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        if (req.session.cart) {
            let product = products.find(prod => prod.id == req.params.id);
            req.session.cart.push({
                id: product.id,
                name: product.name,
                description: product.specs.join(', '),
                image: product.img[0],
                price: product.price,
                amount: req.body.productAmount
            });
        } else {
            req.session.cart = [];
            let product = products.find(prod => prod.id == req.params.id);
            req.session.cart.push({
                id: product.id,
                name: product.name,
                description: product.specs.join(', '),
                image: product.img[0],
                price: product.price,
                amount: req.body.productAmount
            });
        };
        return res.redirect(`/products/detail/${req.params.id}`)
    },
    cartDelete: (req, res) => {

    },
    createView: (req,res) => {
        res.render('./products/productCreate')
    },
    create: (req, res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        let validationErrors = validationResult(req)
        if(validationErrors.isEmpty()){
            let imgNames = [];
            let highlighted = false;
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
                specs: [
                        req.body.productTopSpec1,
                        req.body.productTopSpec2,
                        req.body.productTopSpec3,
                        req.body.productTopSpec4,
                ],
                description: req.body.productDescription,
                img: imgNames,
                category: req.body.productCategory,
                price: req.body.productPrice,
                highlighted: req.body.highlighted
            });

            fs.writeFileSync(dataJSON, JSON.stringify(products, null, 4));

            return res.redirect(`/products/detail/${newId}`)
        }
        return res.render('./products/productCreate', {errors: validationErrors.mapped(), oldData: req.body})
    },
    list:(req,res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        res.render('./products/productsList', {products});
    },
    editPrice: (req,res) => {
        let products = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        let product = products.find(product => product.id == req.params.id);;
            products.forEach(productEach => {
                if(productEach.id == product.id){
                    productEach.price = req.body.price? req.body.price : "";
                };
            });
            fs.writeFileSync(dataJSON, JSON.stringify(products, null, 4));
            return res.redirect('/products/listado')
    },
    editHighlighted :(req, res) => {
        let products = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        let product = products.find(product => product.id == req.params.id);;
            products.forEach(productEach => {
                if(productEach.id == product.id){
                    productEach.highlighted = req.body.highlighted ? true : false;
                };
            });
            fs.writeFileSync(dataJSON, JSON.stringify(products, null, 4));
            return res.redirect('/products/listado')
    },
    editView: (req,res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        let product = products.find(prod => prod.id == req.params.id)
        res.render('./products/productEdit', {product})
    },
    edit: (req,res) => {
        let validationErrors = validationResult(req);
        let products = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        let product = products.find(product => product.id == req.params.id);;
         if (validationErrors.isEmpty()) {
            products.forEach(productEach => {
                if(productEach.id == product.id){
                    productEach.name = req.body.productName;
                    productEach.specs[0] = req.body.productTopSpec1;
                    productEach.specs[1] = req.body.productTopSpec2;
                    productEach.specs[2] = req.body.productTopSpec3;
                    productEach.specs[3] = req.body.productTopSpec4;
                    productEach.description = req.body.productDescription;
                    productEach.category = req.body.productCategory;
                    productEach.price = req.body.productPrice;
                    productEach.highlighted = req.body.highlighted ? true : false;
                };
            });
            fs.writeFileSync(dataJSON, JSON.stringify(products, null, 4));
            return res.redirect(`/products/detail/${product.id}`)
         };
        return res.render('./products/productEdit', {errors: validationErrors.mapped(), product});
    },
    delete: (req,res) => {
        let products = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        let index = products.indexOf(product => product.id == req.params.id);

            // let userToDelete = this.findByID(id);
            // let index = allUsers.indexOf(userToDelete);
        products.splice(index,1);
        fs.writeFileSync(dataJSON,JSON.stringify(products, null, 4));
        return res.redirect('/products')
    },
    }
    
    //(req,res) => {
    //     let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
    //     let products = JSON.parse(productsJSON);
    //     let index = products.findIndex ( product => product.id == req.params.id);
    //     products[index].name = req.body.productName
    //     products[index].especs[0] = req.body.productTopEspec1
    //     products[index].especs[1] = req.body.productTopEspec2
    //     products[index].especs[2] = req.body.productTopEspec3
    //     products[index].especs[3] = req.body.productTopEspec4
    //     products[index].description = req.body.productDescription
    //     products[index].price = req.body.productPrice
    //     if (req.files) {
    //         req.files.forEach(element => {
    //             products[index].img.push(element.filename);
    //         });
    //     }
    //     fs.writeFileSync(dataJSON, JSON.stringify(products, null, 2));
    //     res.redirect(`/products/detail/${req.params.id}`)
    // },


module.exports = controller;