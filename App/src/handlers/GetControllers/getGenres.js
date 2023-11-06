
const axios = require("axios");
require("dotenv").config();
const { Genres } = require("../../db");
const { API_KEY } = process.env;



const getGenres = async (req,res) => {
  console.log(getGenres);
 // busco los generos en mi base de datos
 let genres = await Genres.findAll();

 if (genres.length) {
   console.log("Generos enviados desde la base de datos");
   return res.json(genres);
 }

 // Si no tengo generos en la base de datos, los busco en la API, los guardo y los envio
 let { data } = await axios.get(
   `https://api.rawg.io/api/genres?key=${API_KEY}`
 );

 let genresApi = [];
 data.results.map((genre) => {
   genresApi.push({ id: genre.id, name: genre.name });
 });

 // mapeo el id y nombre de los generos en un array de objetos, para posteriormente subirlos a la base de datos con el metodo de bulkCreate

 await Genres.bulkCreate(genresApi, {
   ignoreDuplicates: true,
 });

 genres = await Genres.findAll();

 console.log("Genres metidos a base de datos y enviados");
 return res.send(genres);

}

module.exports = {getGenres};  