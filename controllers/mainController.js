const path = require ('path');
const fs = require ('fs');

const dataJSON = path.join(__dirname, '../data/users.json');
const dataProductsJSON = path.join(__dirname, '../data/products.json');

controller = {
    index: (req,res) => {
        let productsJSON = fs.readFileSync(dataProductsJSON, {encoding: 'utf-8'});
        let products = JSON.parse(productsJSON);
        let productsH = [];
        products.forEach(prod => {
            if(prod.highlighted) {
                productsH.push(prod)
            }
        });
       res.render('./index', {productsH});
    },
    indexUser: (req,res) => {
        const users = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        const user = users.find(user => user.id == req.params.id);
        res.render('./indexUser', {user});
    },
    search: (req,res) => {
        res.render('./search', {searchProducts});
    },
}

module.exports = controller;