const http = require('http')
const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const passport = require('passport')
require('dotenv').config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

app.use(express.json())


server.listen(PORT, () => {
    console.log(`Server is live at: ${PORT}`);
    
})