module.exports = (sequelize, dataTypes) => {
  let alias = "User";
  let cols = {
    name: { type: dataTypes.STRING(50), allowNull: false },
    last_name: { type: dataTypes.STRING(50), allowNull: false },
    documento: { type: dataTypes.INTEGER(11), allowNull: false },
    tipo_documento_id: { type: dataTypes.INTEGER(11), allowNull: false },
    email: { type: dataTypes.STRING(50), allowNull: false },
    pass: { type: dataTypes.STRING(50), allowNull: false },
    condicion_fiscal_id: { type: dataTypes.INTEGER(11), allowNull: false },
    razon_social: { type: dataTypes.STRING(50), allowNull: false },
    telefono: { type: dataTypes.INTEGER(11) },
    ofertas: dataTypes.INTEGER(11),
    tipo_persona_id: { type: dataTypes.INTEGER(11), allowNull: false },
    dom_calle: { type: dataTypes.STRING(50), allowNull: false },
    dom_cp: { type: dataTypes.STRING(50), allowNull: false },
    dom_localidad: { type: dataTypes.STRING(50), allowNull: false },
    dom_provincia_id: { type: dataTypes.INTEGER(11), allowNull: false },
    dom_pais_id: { type: dataTypes.INTEGER(11), allowNull: false },
    dom_env_calle: { type: dataTypes.STRING(50) },
    dom_env_cp: { type: dataTypes.STRING(50) },
    dom_env_localidad: { type: dataTypes.STRING(50) },
    dom_env_provincia_id: { type: dataTypes.INTEGER(11) },
    dom_env_pais_id: { type: dataTypes.INTEGER(11) },
    mail_confirmado: { type: dataTypes.INTEGER(11) },
    compra_id: { type: dataTypes.INTEGER(11), allowNull: false },
  };
  let config = { timestamps: true };
  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.TipoId, {
      as: "identificacion",
      foreignKey: "tipo_documento_id",
    });
    User.belongsTo(models.TipoPersona, {
      as: "tipo_persona",
      foreignKey: "tipo_persona_id",
    });
    User.belongsTo(models.CondicionFiscal, {
      as: "cond_fiscal",
      foreignKey: "condicion_fiscal_id",
    });
    User.belongsTo(models.Provincia, {
      as: "provincia",
      foreignKey: "dom_provincia_id",
    });
    User.belongsTo(models.Provincia, {
      as: "provincia_envio",
      foreignKey: "dom_env_provincia_id",
    });
    User.belongsTo(models.Pais, {
      as: "pais",
      foreignKey: "dom_pais_id",
    });
    User.belongsTo(models.Pais, {
      as: "pais",
      foreignKey: "dom_env_pais_id",
    });
    User.hasMany(models.Compra, {
      as: "compras",
      foreignKey: "compra_id",
    });
  };
  return User;
};
