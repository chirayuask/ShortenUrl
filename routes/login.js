const loginController = require("../controller/login")
const routes = require("express").Router();


routes.post("/SignUp", loginController.signupUser)
routes.post("/loginUser", loginController.loginUser)

module.exports = routes
