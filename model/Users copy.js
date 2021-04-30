const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const sequelize = db.sequelize;

const User = {
  db: function () {
    return JSON.parse(fs.readFileSync(this.dbPath, "utf-8"));
  },
  findByID: async function (id) {
    let userFound = await db.User.findByPk(id);
    return userFound;
  },
  findByEmail: async function (mail) {
    let userFound = await db.User.findOne({
      where: { email: mail },
    });
    return userFound;
  },
  create: async function (user) {
    let newUser = await db.User.create({ ...user });
    return newUser;
  },
  delete: function (id) {
    const allUsers = this.db();
    let index = allUsers.findIndex((user) => user.id == id);
    if (index > 0) {
      allUsers.splice(index, 1);
      fs.writeFileSync(this.dbPath, JSON.stringify(allUsers, null, 4));
      return `Usuario ${id} eliminado`;
    }
  },
};
module.exports = User;
