const express = require ('express');

controller = {
    detail: (req,res) => {
        res.render('./product/productDetail');
    },
    cart: (req,res) => {
        res.render('./product/productCart');
    }
}

module.exports = controller;