const tableController = require("../controller/tables")
const routes = require("express").Router();
const loginController = require("../controller/login")

routes.get("/getAllTables", loginController.verifyToken, tableController.getAllTables)
routes.post("/createTables", loginController.verifyToken, tableController.createTables)

module.exports = routes