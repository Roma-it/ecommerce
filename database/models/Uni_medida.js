module.exports = function (sequelize, dataTypes) {
	const Uni_medida = sequelize.define('Uni_medida', {
		nombre: {
			type: dataTypes.STRING,
			allowNull: false,
		},
	});
	Uni_medida.associate = function (models) {
		Uni_medida.hasMany(models.Producto, {
			as: 'productos',
			foreignKey: 'uni_medida_id',
		});
	};
	return Uni_medida;
};
