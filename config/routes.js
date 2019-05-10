const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { authenticate } = require("../auth/authenticate");
const db = require("./routeModels");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

const register = async (req, res) => {
  // implement user registration
  try {
    const user = req.body;
    if (!user.username || user.password) {
      return res
        .status(400)
        .json({ message: "please fill in all required fields." });
    }
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    const registerUser = await db.add(user);
    res.status(201).json(registerUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  // implement user login
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
