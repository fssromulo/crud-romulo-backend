const express = require("express");
const routes = express.Router();

const PersonController = require("./app/controllers/PersonController");

const authMiddleware = require("./app/middleware/auth");
routes.use(authMiddleware);
routes.post("/authenticate", PersonController.authUser);

// Pedido
routes.get("/persons/:name?", PersonController.getAllPersons);
routes.get("/persons/:id", PersonController.getPersonById);
routes.post("/persons", PersonController.insertPerson);
// routes.put("/persons", PersonController.updatePerson);
routes.delete("/persons/:id", PersonController.deletePerson);

module.exports = routes;
