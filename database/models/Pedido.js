module.exports = function (sequelize, dataTypes) {
  const Pedido = sequelize.define("Pedido", {
    producto_id: { type: dataTypes.INTEGER(11), allowNull: false },
    cantidad: { type: dataTypes.INTEGER(11), allowNull: false },
  });

  Pedido.associate = function (models) {
    Pedido.belongsTo(model.Producto, {
      as: "productos",
      foreignKey: "producto_id",
    });
    Pedido.belongsTo(model.Carrito, {
      as: "carrito",
      foreignKey: "pedido_id",
    });
  };
  return Pedido;
};
