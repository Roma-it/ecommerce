const db = require("../../database/models");
const UserService = require("../../services/Users");

const apiUser = {
  find: async (req, res) => {
    let user = await UserService.findByEmail(req.query.mail);
    res.json(user);
  },
};

module.exports = apiUser;
