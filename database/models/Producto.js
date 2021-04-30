module.exports = (sequelize, dataTypes) => {
  const Producto = sequelize.define("Producto", {
    nombre: { type: dataTypes.STRING(20), allowNull: false },
  });
  Producto.associate = function (models) {
    Producto.belongsTo(models.Pedido, {
      as: "pedidos",
      foreignKey: "producto_id",
    });
  };
  return Producto;
};
