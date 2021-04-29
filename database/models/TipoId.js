module.exports = (sequelize, dataTypes) => {
  const TipoID = sequelize.define("TipoID", {
    nombre: { type: dataTypes.STRING(20), allowNull: false },
  });

  TipoID.hasMany(models.User, {
    as: "usuarios",
    foreignKey: "tipo_documento_id",
  });
  return TipoID;
};
