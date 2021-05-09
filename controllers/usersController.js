const path = require("path");
const { validationResult } = require("express-validator");
const User = require("../model/Users copy");
const Domicilio = require("../model/Domicilio");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

controller = {
  login: (req, res) => {
    let validator = 0;
    res.render("./users/login", { validator });
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userLoggedEmail");
    res.redirect("/");
  },
  admin: (req, res) => {
    const user = req.session.userLogged;
    res.render("./users/admin", { user });
  },
  validLogin: async (req, res) => {
    let result = await User.validLogin(req.body);
    if (result.loginResult) {
      req.session.userLogged = result.userToLogin;
      console.log("Login: " + req.session.userLogged);
      if (req.body.recuerda) {
        res.cookie("userLoggedEmail", req.body.email, {
          maxAge: 1000 * 3600 * 24 * 3650,
        });
      }
      res.redirect("/users/profile/" + result.userToLogin.id);
    } else {
      res.render("./users/login", {
        message: result.message,
        validator: result.validator,
      });
    }
  },
  registerView: (req, res) => {
    let validator = 0;
    res.render("./users/register", { validator });
  },
  register: async (req, res) => {
    let validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      const userInDB = await User.findByEmail(req.body.email);
      console.log("Usuario en base al registrar: " + userInDB);
      let message = "";
      let validator = 0;
      if (userInDB) {
        message = "El email ya está registrado, elige otro";
        validator = 1;
        res.render("./users/register", {
          message,
          validator,
          old_data: req.body,
        });
      } else {
        if (req.body.password == req.body.confirmPass) {
          const userToCreate = {
            nombre: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            telefono: Number(req.body.telefono),
            image: "user.png",
          };
          let newUser = await User.create(userToCreate);
          newUser = newUser.dataValues;
          console.log("new user: " + newUser.id);
          let userToLogin = { ...newUser };
          console.log("user to login: " + userToLogin);
          delete userToLogin.password;
          req.session.userLogged = userToLogin;
          if (req.body.recuerda) {
            res.cookie("userLoggedEmail", userToCreate.email, {
              maxAge: 1000 * 3600 * 24 * 3650,
            });
          }
          const userLogged = await User.findByEmail(userToCreate.email);
          res.redirect("/users/profile/" + userLogged.id);
        } else {
          message = "Las contraseñas no coinciden";
          validator = 1;
          res.render("./users/register", {
            message,
            validator,
            old_data: req.body,
          });
        }
      }
    } else {
      message = "Han habido errores al completar el formulario";
      validator = 1;
      res.render("./users/register", {
        message,
        validator,
        errors: validationErrors.mapped(),
        old_data: req.body,
      });
    }
  },
  userProfile: (req, res) => {
    console.log(`usuario en sesion: ${req.session.userLogged.id}`);
    const user = req.session.userLogged;
    res.send(user);
  },
  adminUserProfile: (req, res) => {
    let users = User.db();
    const user = users.find((user) => user.id == req.params.id);
    res.render("./users/userProfile", { user });
  },
  editProfileView: (req, res) => {
    let validator = 0;
    console.log(`usuario en sesion: ${req.session.userLogged.id}`);
    const user = req.session.userLogged;
    res.render("./users/editProfile", { user, validator });
  },
  editProfile: async (req, res) => {
    let validationErrors = validationResult(req);
    let user = await User.findByID(req.params.id);
    let message = "";
    let validator = 0;
    if (validationErrors.isEmpty()) {
      if (req.body.password) {
        if (req.body.password == req.body.confirmPass) {
          user.password = bcrypt.hashSync(req.body.password, 10);
        } else {
          message = "Las contraseñas no coinciden";
          validator = 1;
          res.render("./users/editProfile", { user, message, validator });
        }
      }
      if (req.body.medioPago) {
        user.medioPago = req.body.medioPago;
      }
      if (req.body.domicilio) {
        user.domicilio = req.body.domicilio;
      }
      if (req.body.nombre) {
        user.name = req.body.nombre;
      }
      if (req.body.apellido) {
        user.last_name = req.body.apellido;
      }
      if (req.body.telefono) {
        user.telefono = req.body.telefono;
      }
      if (req.file) {
        user.image = req.file.filename;
      }
      await User.update(user);
      req.session.userLogged = user;
      res.redirect("/users/profile/" + user.id);
    } else {
      message = "Han habido errores al completar el formulario";
      validator = 1;
      res.render("./users/editProfile", {
        message,
        user,
        validator,
        errors: validationErrors.mapped(),
        old_data: req.body,
      });
    }
  },
  domiciliosView: async (req, res) => {
    let validator = 0;
    console.log(`usuario en sesion: ${req.session.userLogged.id}`);
    const user = req.session.userLogged;
    const userAddress = await db.Domicilio.findAll({
      where: { user_id: user.id },
    });
    console.log("Address " + userAddress[0].calle);
    const paises = await db.Pais.findAll();
    const provincias = await db.Provincia.findAll();
    res.render("./users/editDomicilio", {
      user,
      validator,
      paises,
      provincias,
      userAddress,
    });
  },
  createAddress: async (req, res) => {
    let validationErrors = validationResult(req);
    if (validationErrors.isEmpty()) {
      const address = {
        user_id: req.params.id,
        calle: req.body.calle,
        cp: req.body.cp,
        pais: req.body.pais,
        provincia: req.body.provincia,
        localidad: req.body.localidad,
        envio: req.body.tipo,
      };
      const newAddress = await Domicilio.create(address);
      res.redirect("/users/profile/" + address.user_id);
    } else {
      validator = 1;
      message = "Han habido errores al completar el formulario";
      res.render("./users/editDomicilio", {
        message,
        validator,
        errors: validationErrors.mapped(),
        old_data: req.body,
      });
    }
  },
  domiciliosEdit: async (req, res) => {
    let validationErrors = validationResult(req);
    let user = await User.findByID(req.params.id);
    let message = "";
    let validator = 0;
    if (validationErrors.isEmpty()) {
      if (req.body.calle) {
        user.calle = req.body.calle;
      }
      if (req.body.cp) {
        user.cp = req.body.cp;
      }
      if (req.body.pais) {
        user.pais = req.body.pais;
      }
      if (req.body.provincia) {
        user.provincia = req.body.provincia;
      }
      if (req.body.localidad) {
        user.localidad = req.body.localidad;
      }
      if (req.file) {
        user.image = req.file.filename;
      }
      await User.updateDomicilio(user);
      res.redirect("/users/profile/" + user.id);
    } else {
      message = "Han habido errores al completar el formulario";
      validator = 1;
      res.render("./users/editProfile", {
        message,
        user,
        validator,
        errors: validationErrors.mapped(),
        old_data: req.body,
      });
    }
  },
  delete: (req, res) => {
    User.delete(req.params.id);
    res.redirect("/users/listado");
  },
  listado: async (req, res) => {
    const users = await User.db();
    res.render("./users/listado", { users });
  },
};
module.exports = controller;
