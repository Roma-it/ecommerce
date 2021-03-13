const fs = require('fs');
const path = require('path')
const User = require('../model/Users')
const bcrypt = require('bcryptjs');

module.exports= {
    validLogin: function (user) {
        let userToLogin = User.findByEmail(user.email);
          if (userToLogin) {
            if (bcrypt.compareSync(user.password, userToLogin.password)){
                delete userToLogin.password;
                return {
                        message: '',
                        validator: 0,
                        loginResult: true,
                        userToLogin
                        }
            } else {
                return{
                message: 'La contraseña no es correcta',
                validator: 1,
                loginResult: false,
                }
            }
        } else{
            return{
            message: 'Revisa el email ingresado',
            validator: 1,
            loginResult: false,
           }
        };
    }
}