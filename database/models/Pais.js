module.exports = (sequelize, dataTypes) => {
  const Pais = sequelize.define("Pais", {
    nombre: { type: dataTypes.STRING(20), allowNull: false },
  });

  Pais.hasMany(models.User, {
    as: "usuarios",
    foreignKey: "pais_id",
  });

  return Pais;
};
