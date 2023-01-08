require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/router");
const PORT = process.env.PORT|| 6010;

app.use(cors());
app.use(express.json());
app.use("/uploads",express.static("./uploads"));
app.use("/files",express.static("./public/files"));
app.use(router);


// app.get("/", (req,res) => {
// res.status(401).json("Hello Rahul!!!...Server Start")
// })

app.listen(PORT, () => {
  console.log(`Server started at port no ${PORT}`);
});
