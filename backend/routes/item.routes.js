const express = require("express");

const { addItem, updateItem, deleteItem, getItems } = require("../controllers/item.controller");

const itemRouter = express.Router();

itemRouter.post("/add", addItem);
itemRouter.put("/update", updateItem);
itemRouter.delete("/delete", deleteItem);
itemRouter.get("/get", getItems);



module.exports = itemRouter;
