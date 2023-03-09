const express = require("express");

const { addItem, updateItem, deleteItem, getItems, updatePrice } = require("../controllers/item.controller");

const itemRouter = express.Router();

itemRouter.post("/add", addItem);
itemRouter.put("/update", updateItem);
itemRouter.put("/pricing", updatePrice);
itemRouter.delete("/delete/:id", deleteItem);
itemRouter.get("/get", getItems);



module.exports = itemRouter;
