const http = require('http')
require('dotenv').config();
const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const passport = require('passport')
const pool = require('./src/config/db')
const authRoutes = require('./src/routes/auth.routes');
const orgRoutes = require('./src/routes/org.routes');
const configurePassport = require('./src/config/passport')

configurePassport(passport)

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true
    }
}))

app.use(passport.initialize())
app.use(passport.session());


app.use('/auth', authRoutes)
app.use('/organizations', orgRoutes )

server.listen(PORT, () => {
    console.log(`Server is live at: ${PORT}`);
    
})  