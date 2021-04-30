module.exports = (sequelize, dataTypes) => {
  const Pais = sequelize.define(
    "Pais",
    {
      nombre: { type: dataTypes.STRING(20), allowNull: false },
    },
    { timestamps: false }
  );
  Pais.associate = function (models) {
    Pais.hasMany(models.User, {
      as: "usuarios",
      foreignKey: "dom_pais_id",
    });
  };
  return Pais;
};
