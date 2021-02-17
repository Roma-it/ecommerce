const express = require ('express');
const fs = require ('fs');

controller = {
    detail: (req,res) => {
        res.render('./product/productDetail');
    },
    cart: (req,res) => {
        res.render('./product/productCart');
    },
    createView: (req,res) => {
        res.render('./product/productCreate')
    },
    create: (req, res) => {
        let productsJSON = fs.readFileSync('products.json', {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);

        let imgNames = [];
        req.files.forEach(element => {
                imgNames.push(element.filename);
            });

        products.push({
            id: products.length + 1,
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

        fs.writeFileSync('products.json', JSON.stringify(products));

        res.send('Producto creado correctamente')
    }
}

module.exports = controller;