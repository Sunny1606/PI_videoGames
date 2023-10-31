const axios = require("axios");
const { APY_KEY, URL } = process.env;
const { Database } = require("../../db");
const { response } = require("express");

const getPlatforms = async () => {
  try {
    const Urlplatform = "https://api.rawg.io/api/platforms";
    const platformsDB = await Database.findAll();

    if (platformsDB.length === 0) {
      const response = await axios.get(`${Urlplatform}?key=${APY_KEY}`);

      const plataformas = response.data.results.map((plat) => ({
        id: plat.id,
        name: plat.name,
      }));

      await Database.bulkCreate(plataformas);
      return plataformas;
    }

    return platformsDB;
  } catch (error) {
    // Aquí puedes manejar el error de alguna manera
    console.error("Error en getPlatforms:", error);
    throw error; // Lanza el error nuevamente para que pueda ser manejado más arriba si es necesario
  }
};

module.exports = getPlatforms;
