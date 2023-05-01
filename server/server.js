const express = require('express')
const app = express()
const port = 5000

app.use(express.json())   

const apiRoutes = require("./routes/apiRoutes")



const connectDB = require("./config/db")
connectDB();

app.use('/api', apiRoutes)


app.get("/", async (req, res, next) => {
 res.json({mesazhi: "Sistemet e Shperndara..."}) 

})



app.use((error, req, res, next) => {    
    res.status(500).json({            
      message: error.message,
      stack: error.stack
    })
})


app.listen(port, () => {        
  console.log(`Applikacioni duke ndegjuar ne port ${port}`)  //console log per backend
})
