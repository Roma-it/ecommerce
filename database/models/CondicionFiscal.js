module.exports = (sequelize, dataTypes) => {
  const CondicionFiscal = sequelize.define(
    "CondicionFiscal",
    {
      nombre: { type: dataTypes.STRING(20), allowNull: false },
    },
    { timestamps: false, tablename: "condiciones_fiscales" }
  );
  CondicionFiscal.associate = function (models) {
    CondicionFiscal.hasMany(models.User, {
      as: "usuarios",
      foreignKey: "condicion_fiscal_id",
    });
  };
  return CondicionFiscal;
};
