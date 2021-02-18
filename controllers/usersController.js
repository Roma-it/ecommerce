const path = require ('path');
const fs = require ('fs');

const dataJSON = path.join(__dirname, './data/users.json');


controller = {
    login: (req,res) => {
        res.render('./users/login');
    },
    registerView: (req,res) => {
        res.render('./users/register');
    },
    register: (req,res) => {
        res.render('./users/register');
    },
    editView: (req,res) => {
        res.render('./users/register');
    },
    edit: (req,res) => {
        res.render('./users/register');
    },
    delete: (req,res) => {
        res.render('./users/register');
    },
};

module.exports = controller;