const express = require ("express")
const app = express()
const dotenv = require ("dotenv").config();

const PORT = process.env.PORT

app.listen(PORT, (req,res)=>{ 
    console.log( `server is listening to port: ${PORT}`)
 })
