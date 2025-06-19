require("dotenv").config()
const express = require("express")
const cors = require("cors")
const router = require("./Routes/route")
require('./DatabaseConnection/dbConnection')

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const PORT = 3000 || process.dotenv.PORT

app.listen(PORT, () => {
    console.log(`my Server running in port : ${PORT} and waiting for client request!!!`);
})

app.get('/', (req, res) => {
    res.status(200).send('<p style="color:green;">my Server running in port and waiting for client req!!</p>')
})