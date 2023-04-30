const express = require('express')
const app = express()
const port = 5000
const apiRoutes = require("./routes/apiRoutes")


app.get("/", (req, res) => {
  res.json({mesazhi: "Sistemet e Shperndara..."})
})


//Konektimi me MongoDB
const connectDB = require("./config/db")
connectDB();


app.use('/api', apiRoutes)



app.use((error, req, res, next) => {    //Error kur kemi
    res.status(500).json({            
      message: error.message,
      stack: error.stack
    })
})


app.listen(port, () => {        
  console.log(`Applikacioni duke ndegjuar ne port ${port}`)     //console log per backend
})
