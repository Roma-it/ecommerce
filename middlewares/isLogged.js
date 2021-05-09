const Users = require("../model/Users copy");

module.exports = async function (req, res, next) {
  res.locals.isLogged = false;
  if (req.cookies.userLoggedEmail) {
    let userInCookies = await Users.findByEmail(
      req.cookies.userLoggedEmail
      // {      include: ["domicilio", "usuario"],    }
    );
    console.log("EN COOKIES " + userInCookies);
    req.session.userLogged = userInCookies;
    console.log("USUARIO DOM " + req.session.userLogged);
  }
  if (req.session.userLogged) {
    res.locals.isLogged = true;
    res.locals.userLogged = req.session.userLogged;
  }
  next();
};
