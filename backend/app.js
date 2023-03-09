const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const itemRouter = require("./routes/item.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const orderRouter = require("./routes/order.routes");

require("dotenv").config();

const app = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/orders", orderRouter);




// connecting to the mongo database and starting the node server
mongoose
  .connect(
    `mongodb+srv://shobky:${process.env.MONGODB_PASSWORORD}@cluster0.nfwqewl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
    console.log("Database is connected! Listening to localhost 5000");
  })
  .catch((err) => console.log(err));
