const express = require("express");

const { addOrder,
    updateOrder,
    deleteOrder,
    getOrders
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/add", addOrder);
// orderRouter.put("/update", updateorder);
// orderRouter.delete("/delete", deleteorder);
// orderRouter.get("/get", getorders);



module.exports = orderRouter;