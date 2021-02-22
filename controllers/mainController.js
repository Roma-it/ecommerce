const path = require ('path');
const fs = require ('fs');
const dataJSON = path.join(__dirname, '../data/users.json');

controller = {
    index: (req,res) => {
        res.render('./index');
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