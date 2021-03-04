const path = require ('path');
const fs = require ('fs');
const {validationResult} = require ('express-validator');
const User = require("../model/Users");
const bcrypt = require('bcryptjs');

const dataJSON = path.join(__dirname, '../data/users.json');

controller = {
    login: (req,res) => {
        let validator = 0;
        res.render('./users/login', {validator});
    },
    admin: (req,res) => {
        const users = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        const user = users.find(user => user.id == req.params.id);
        res.render('./users/admin', {user});
    },
    validLogin: (req,res) => {
        const userToLogin = User.findByEmail(req.body.email);
        let message = '';
        let validator = 0;
        if (userToLogin) {
            if (bcrypt.compareSync(req.body.password, userToLogin.password)){
                res.redirect('/users/profile/'+userToLogin.id);
            } else {
                message = 'La contraseña no es correcta';
                validator = 1;
                res.render('./users/login', {message,validator});
            }
        } else{
            message = 'Revisa el email ingresado';
            validator = 1;
            res.render('./users/login', {message,validator});
        };
        
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
                    res.redirect('/users/profile/'+newUser.id);
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
        const users = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        const user = users.find(user => user.id == req.params.id);
        res.render('./users/profile', {user});
    },
    editProfileView: (req,res) => {
        let validator = 0;
        const users = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        const user = users.find(user => user.id == req.params.id);
        res.render('./users/editProfile', {user, validator});
    },
     editProfile: (req,res) => {
        let validationErrors = validationResult(req);
        const users = JSON.parse(fs.readFileSync(dataJSON,'utf-8'));
        let user = users.find(user => user.id == req.params.id);
        let message = '';
        let validator = 0;
        if(validationErrors.isEmpty()){
            if (req.body.password){
                console.log(req.body.password)
                console.log(req.body.confirmPass)
                if (req.body.password == req.body.confirmPass){
                user.password = req.body.password;
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
            fs.writeFileSync(dataJSON,editedUser);
            res.redirect('/users/profile/' + user.id);
        } else {
                message = 'Han habido errores al completar el formulario';
                validator = 1;
                res.render('./users/editProfile',{message,user,validator, errors: validationErrors.mapped(), old_data: req.body});
        }
    },
    delete: (req,res) => {
        res.render('./users/register');
    },
};

module.exports = controller;