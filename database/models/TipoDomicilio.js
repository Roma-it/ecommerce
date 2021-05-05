module.exports = (sequelize, dataTypes) => {
  const TipoDomicilio = sequelize.define(
    "TipoDomicilio",
    {
      nombre: { type: dataTypes.STRING(100), allowNull: false },
    },
    { timestamps: false }
  );
  TipoDomicilio.associate = function (models) {
    TipoDomicilio.hasMany(models.Domicilio, {
      as: "domicilio",
      foreignKey: "tipo_id",
    });
  };
  return TipoDomicilio;
};
