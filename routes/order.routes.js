const express = require("express");

const { addOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getOrderById
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/add", addOrder);
orderRouter.get('/get/:id', getOrderById);
orderRouter.get("/getAll/:start/:end", getOrders);
orderRouter.put("/update", updateOrder); 

// orderRouter.delete("/delete", deleteorder);



module.exports = orderRouter;