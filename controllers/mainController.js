const path = require ('path');
const fs = require ('fs');

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
    },
    search: (req,res) => {
        res.render('./search', {searchProducts});
    },
}

module.exports = controller;