const path = require ('path');
const fs = require ('fs');


controller = {
    index: (req,res) => {
        res.render('./index', {products});
    },
    search: (req,res) => {
        res.render('./search', {searchProducts});
    },
}

module.exports = controller;