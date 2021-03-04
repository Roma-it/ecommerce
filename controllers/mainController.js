const path = require ('path');
const fs = require ('fs');
<<<<<<< HEAD

const dataJSON = path.join(__dirname, '../data/products.json');

controller = {
    index: (req,res) => {
        let productsJSON = fs.readFileSync(dataJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        let productsH = [];
        products.forEach(prod => {
            if(prod.highlighted) {
                productsH.push(prod)
            }
        });
       res.render('./index', {productsH});
=======
const dataJSON = path.join(__dirname, '../data/users.json');

controller = {
    index: (req,res) => {
        res.render('./index');
    },
    indexUser: (req,res) => {
        const users = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        const user = users.find(user => user.id == req.params.id);
        res.render('./indexUser', {user});
>>>>>>> 059f8f2edcba536fec454fb52be3053713d2c82b
    },
    search: (req,res) => {
        res.render('./search', {searchProducts});
    },
}

module.exports = controller;