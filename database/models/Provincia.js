module.exports = function (sequelize, dataTypes) {
  const Provincia = sequelize.define("Provincia", {
    nombre: { type: dataTypes.STRING(20), allowNull: false },
    pais_id: { type: dataTypes.INTEGER(11), allowNull: false },
  });

  Provincia.associate = function (models) {
    Provincia.belongsTo(models.Pais, {
      as: "prov_pais",
      foreignKey: "pais_id",
    });
    Provincia.hasMany(models.User, {
      as: "usuarios",
      foreignKey: "provincia_id",
    });
  };

  return Provincia;
};
