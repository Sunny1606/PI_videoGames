const express = require("express");
const axios = require("axios");

const games = async (req, res) => {
  try {
    const URL = "https://api.rawg.io/api/";
    const RESULTS_PER_PAGE = 50;
    const { API_KEY } = process.env;
    const currentPage = req.query.page || 1;

    const apiResponse = await axios.get(
      `${URL}games?key=${API_KEY}&page=${currentPage}&page_size=${RESULTS_PER_PAGE}`
    );

    res.json(apiResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de juegos" });
  }
};

module.exports = games;
