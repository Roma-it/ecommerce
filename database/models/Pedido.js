module.exports = function (sequelize, dataTypes) {
  const Pedido = sequelize.define("Pedido", {
    producto_id: { type: dataTypes.INTEGER(11), allowNull: false },
    cantidad: { type: dataTypes.INTEGER(11), allowNull: false },
  });
  Pedido.associate = function (models) {
    Pedido.belongsTo(models.Producto, {
      as: "productos",
      foreignKey: "producto_id",
    });
    Pedido.belongsTo(models.Carrito, {
      as: "carrito",
      foreignKey: "pedido_id",
    });
  };
  return Pedido;
};
