module.exports = {
  loggedUser: function (req, res, next) {
    if (req.session.userLogged) {
      return res.redirect(`/users/profile/${req.session.userLogged.id}`);
    }
    next();
  },
  admin: function (req, res, next) {
    if (!req.session.userLogged.admin) {
      return res.redirect(`/users/profile/${req.session.userLogged.id}`);
    }
    next();
  },
  notLogged: function (req, res, next) {
    console.log("Esta es la session: " + req.session.userLogged);
    if (!req.session.userLogged) {
      return res.redirect(`/users/login`);
    }
    next();
  },
};
