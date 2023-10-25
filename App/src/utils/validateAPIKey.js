require("dotenv").config();
const { API_KEY } = process.env;

function validateAPIKey(req, res, next) {
  const {apiKey} = req.query;
  if (apiKey && apiKey === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: "Acceso no autorizado" });
  }
}


module.exports = validateAPIKey; 















// https://api.rawg.io/api/

