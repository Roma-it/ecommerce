module.exports = (sequelize, dataTypes) => {
  const TipoPersona = sequelize.define("TipoPersona", {
    nombre: { type: dataTypes.STRING(20), allowNull: false },
  });

  TipoPersona.hasMany(models.User, {
    as: "usuarios",
    foreignKey: "tipo_persona_id",
  });
  return TipoPersona;
};
