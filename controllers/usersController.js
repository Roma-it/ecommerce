const path = require ('path');
const fs = require ('fs');
const {validationResult} = require ('express-validator');
const User = require("../model/Users");
const bcrypt = require('bcryptjs');
const session = require('express-session');
const logic = require('../data/logic');

const dataJSON = path.join(__dirname, '../data/users.json');

controller = {
    login: (req,res) => {
        let validator = 0;
        res.render('./users/login', {validator});
    },
    logout: (req,res) => {
        req.session.destroy();
        res.clearCookie('userLoggedEmail');
        res.redirect('/');
    },
    admin: (req,res) => {
        const user = req.session.userLogged;
        res.render('./users/admin', {user});
    },
    validLogin: (req,res) => {
        let result = logic.validLogin(req.body);
        if (result.loginResult){
            req.session.userLogged = result.userToLogin;
            if (req.body.recuerda){
                res.cookie('userLoggedEmail', req.body.email, {maxAge: ((1000*3600)*24)*3650})
            }
            res.redirect('/users/profile/'+result.userToLogin.id);
        } else {
            res.render('./users/login', {message: result.message,validator: result.validator});
        }
    },
    registerView: (req,res) => {
        let validator = 0;
        res.render('./users/register', {validator});
    },
    register: (req,res) => {
        let validationErrors = validationResult(req);  
        if(validationErrors.isEmpty()){
            const userInDB = User.findByEmail(req.body.email);
            let message = '';
            let validator = 0;
            if (userInDB){
                message = 'El email ya está registrado, elige otro';
                validator = 1;
                res.render('./users/register',{message,validator,old_data: req.body});
            } else {
                if (req.body.password == req.body.confirmPass){
                    const userToCreate = {
                        nombre: req.body.nombre,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password,10),
                        telefono: Number(req.body.telefono),
                        image: "user.png"
                    }
                    let newUser = User.create(userToCreate);
                    let userToLogin = {...newUser};
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;
                    res.cookie('userLoggedEmail', userToCreate.email, {maxAge: ((1000*3600)*24)*3650});
                    console.log(`usuario en sesion: ${req.session.userLogged}`)
                    res.redirect('/users/profile/'+req.session.userLogged.id);
                } else {
                    message = 'Las contraseñas no coinciden';
                    validator = 1;
                    res.render('./users/register',{message,validator,old_data: req.body});
                }
            }
        } else {
                message = 'Han habido errores al completar el formulario';
                validator = 1;
                res.render('./users/register',{message,validator, errors: validationErrors.mapped(), old_data: req.body});
        }
    },
    userProfile: (req,res) => {
        console.log(`usuario en sesion: ${req.session.userLogged.id}`)
        const user = req.session.userLogged;
        res.render('./users/profile', {user});
    },
    adminUserProfile: (req,res) => {
         let users = User.db();
        const user = users.find (user => user.id == req.params.id);
        res.render('./users/userProfile', {user});
    },
    editProfileView: (req,res) => {
        let validator = 0;
        console.log(`usuario en sesion: ${req.session.userLogged.id}`)
        const user = req.session.userLogged;
        res.render('./users/editProfile', {user, validator});
    },
     editProfile: (req,res) => {
        let validationErrors = validationResult(req);
        let users = User.db();
        let user = users.find (user => user.id == req.params.id);
        let message = '';
        let validator = 0;
        if(validationErrors.isEmpty()){
            if (req.body.password){
                if (req.body.password == req.body.confirmPass){
                user.password = bcrypt.hashSync(req.body.password, 10);
                } else {
                    message = 'Las contraseñas no coinciden';
                    validator = 1;
                    res.render('./users/editProfile',{user,message,validator});
                }
            };
            if (req.body.medioPago){
                user.medioPago = req.body.medioPago;
            };
            if (req.body.domicilio){
                user.domicilio = req.body.domicilio;
            };
            if (req.body.nombre){
                user.nombre = req.body.nombre;
            };
            if (req.body.telefono){
                user.telefono = req.body.telefono;
            };
            if (req.file){
                user.image = req.file.filename;
            };
            let editedUser = JSON.stringify(users, null, 4);
            req.session.userLogged = user;
            fs.writeFileSync(dataJSON,editedUser);
            res.redirect('/users/profile/' + user.id);
        } else {
                message = 'Han habido errores al completar el formulario';
                validator = 1;
                res.render('./users/editProfile',{message,user,validator, errors: validationErrors.mapped(), old_data: req.body});
        }
    },
    delete: (req,res) => {
        User.delete(req.params.id);
        res.redirect('/users/listado');
    },
    listado: (req,res) => {
        const users = User.db();
        res.render('./users/listado',{users});
    },
};
module.exports = controller;