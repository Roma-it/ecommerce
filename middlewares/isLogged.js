const User = require('../model/Users');
const Users = require('../model/Users');

module.exports = function (req, res, next){
        res.locals.isLogged = false;
        if(req.cookies.userLoggedEmail){
            let userInCookies = Users.findByEmail(req.cookies.userLoggedEmail);
            req.session.userLogged = userInCookies;
        };
        if (req.session.userLogged){
            res.locals.isLogged = true;
            res.locals.userLogged = req.session.userLogged;
        }
        next();
    }