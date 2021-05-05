module.exports = function (sequelize, dataTypes) {
  const Domicilio = sequelize.define("Domicilio", {
    user_id: { type: dataTypes.INTEGER(11), allowNull: false },
    calle: { type: dataTypes.STRING(150), allowNull: false },
    cp: { type: dataTypes.STRING(150), allowNull: false },
    localidad: { type: dataTypes.STRING(150), allowNull: false },
    provincia_id: { type: dataTypes.INTEGER(11), allowNull: false },
    pais_id: { type: dataTypes.INTEGER(11), allowNull: false },
    tipo_id: { type: dataTypes.INTEGER(11), allowNull: false },
  });
  Domicilio.associate = function (models) {
    Domicilio.belongsTo(models.User, {
      as: "usuario",
      foreignKey: "user_id",
    });
    Domicilio.belongsTo(models.Provincia, {
      as: "provincia",
      foreignKey: "provincia_id",
    });
    Domicilio.belongsTo(models.Pais, {
      as: "pais",
      foreignKey: "pais_id",
    });
    Domicilio.belongsTo(models.TipoDomicilio, {
      as: "tipo",
      foreignKey: "tipo_id",
    });
  };
  return Domicilio;
};
