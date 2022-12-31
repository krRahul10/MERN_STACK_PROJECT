require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
require('./db/connection')



const PORT = 6010


app.get("/", (req,res) => {
res.status(401).json("Hello Rahul!!!...Server Start")
})



app.listen(PORT, () => {
    console.log(`Server started at port no ${PORT}`)
})
