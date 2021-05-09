const db = require("../database/models");

const Domicilio = {
  create: async function (address) {
    let newAddress = await db.Domicilio.create({
      user_id: address.user_id,
      calle: address.calle,
      cp: address.cp,
      pais_id: address.pais,
      localidad: address.localidad,
      provincia_id: address.provincia,
      envio: address.tipo,
    });
    return newAddress;
  },
  updateDomicilio: async function (user) {
    let domUpdated = await db.Domicilio.update(
      {
        calle: user.calle,
        cp: user.cp,
        pais_id: user.pais,
        localidad: user.localidad,
        provincia_id: user.provincia,
        envio: user.tipo,
      },
      { where: { user_id: user.id } }
    );
    return domUpdated;
  },
};

module.exports = Domicilio;
