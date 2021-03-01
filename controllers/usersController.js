const path = require ('path');
const fs = require ('fs');
const {validationResult} = require ('express-validator');

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
        const usersJson = fs.readFileSync(dataJSON,'utf-8');
        const users = JSON.parse(usersJson);
        const userMail = users.find(user => user.email == req.body.email);
        let message = '';
        let validator = 0;
        if (userMail) {
            if (userMail.password == req.body.password){
                res.redirect('/users/profile/'+userMail.id);
            } else {
                message = 'La contraseña no es correcta';
                validator = 1;
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
        console.log(validationErrors)
         console.log(req.body)  
        if(validationErrors.isEmpty()){
             const usersJson = fs.readFileSync(dataJSON,'utf-8');
            let users=[];
            if(usersJson.length>0){
                users = JSON.parse(usersJson);
            }
            const userMail = users.find(user => user.email == req.body.email);
            let message = '';
            let validator = 0;
            if (userMail){
                message = 'El email ya existe, elige otro';
                validator = 1;
                res.render('./users/register',{message,validator,old_data: req.body});
            } else {
                if (req.body.password == req.body.confirmPass){
                    const userId = users.length > 0 ? users[users.length-1].id+1:1;
                    const newUser = {
                        id: userId,
                        nombre: req.body.nombre,
                        email: req.body.email,
                        telefono: Number(req.body.telefono),
                        password: req.body.password,
                        image: "user.png"
                    }
                    users.push(newUser);
                    fs.writeFileSync(dataJSON,JSON.stringify(users, null, 4));
                    res.redirect('/users/profile/'+userId);
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
        console.log(validationErrors)
         console.log(req.body)
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