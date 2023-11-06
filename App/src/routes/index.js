const router = require("express").Router();

const { getGenres } = require("../handlers/GetControllers/getGenres");
const {
  getVideogamesById,
  getInfoByName,
  getAllInfo,
} = require("../handlers/GetControllers/getVideogames");
const postVideogames = require("../handlers/PostController/postVideogames");


// trae todos los games 
//y por /name solo por nombre
router.get("/games", async (req, res) => {
  let { name } = req.query;
  
  try {
    if (name) {
      const infoByName = await getInfoByName(name);
      
      res.status(200).send(infoByName);
    } else {
      const allData = await getAllInfo();
      res.status(200).send(allData);
    }
  } catch (e) {
    res.status(404).send("Juego no encontrado");
  }
});



router.get("games/:id", getVideogamesById); // BY ID

router.get("/genres"  , getGenres);    //BY GENRES 

router.post("/createdgames", postVideogames); //CREA JUEGOS

module.exports = router;




//obtiene un array de todos los videogames
// const URL = "https://api.rawg.io/api/";
// const RESULTS_PER_PAGE = 50;
// const MAX_RESULTS = 100;

// router.get("/games", async (req, res) => {
//   try {
//     const apiKey = process.env.RAWG_API_KEY; 
//     let currentPage = 1;
//     let totalResults = 0;
//     let allGames = [];

//     while (totalResults < MAX_RESULTS) {
//       const apiResponse = await axios.get(
//         `${URL}games?key=${apiKey}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
//       );

//       const games = apiResponse.data.results;
//       allGames = [...allGames, ...games];
//       totalResults += games.length;
//       currentPage += 1;
//     }

//     res.json(allGames);

//   } catch (error) {
//     res.status(500).send("Hubo un error al obtener los videojuegos.");
//   }
// });
// router.get("/games" , getAllInfo); 