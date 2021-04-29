module.exports = (sequelize, dataTypes) => {
  const CondicionFiscal = sequelize.define("CondicionFiscal", {
    nombre: { type: dataTypes.STRING(20), allowNull: false },
  });
  CondicionFiscal.hasMany(models.User, {
    as: "usuarios",
    foreignKey: "condicion_fiscal_id",
  });
  return CondicionFiscal;
};
