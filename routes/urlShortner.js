const urlShortnerContoller = require("../controller/urlShortner")
const loginController = require("../controller/login")
const routes = require("express").Router();


routes.post("/generateUrlShortner", loginController.verifyToken, urlShortnerContoller.generateUrlShortner)

module.exports = routes