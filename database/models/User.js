module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        documento: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        tipo_documento_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        condicion_fiscal_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        razon_social: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        telefono: {
            type: dataTypes.INTEGER(11),
        },
        ofertas: dataTypes.INTEGER(11),
        tipo_persona_id:{
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        dom_calle: {
            type: dataTypes.STRING(50),
            allowNull:false
        },
        dom_cp: {
            type: dataTypes.STRING(50),
            allowNull:false
        },
        dom_localidad: {
            type: dataTypes.STRING(50),
            allowNull:false
        },
        dom_provincia_id: {
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
        dom_pais_id: {
            type: dataTypes.INTEGER(11),
            allowNull:false
        },
         dom_env_calle: {
            type: dataTypes.STRING(50),
        },
        dom_env_cp: {
            type: dataTypes.STRING(50),
        },
        dom_env_localidad: {
            type: dataTypes.STRING(50),
        },
        dom_env_provincia_id: {
            type: dataTypes.INTEGER(11),
        },
        dom_env_pais_id: {
            type: dataTypes.INTEGER(11),
        },
        mail_confirmado: {
            type: dataTypes.INTEGER(11),
        }
    };
    let config = {
        timestamps = true
    }
    const User = sequelize.define(alias, cols, config);



    return User;
};