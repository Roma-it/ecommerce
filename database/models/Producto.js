module.exports = (sequelize, dataTypes) => {
  const Producto = sequelize.define("Producto", {
    nombre: { type: dataTypes.STRING(20), allowNull: false },
  });

  return Producto;
};
