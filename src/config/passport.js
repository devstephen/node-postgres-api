const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const pool = require('./db');
const { use } = require('passport');


function configurePassport(passport) {
    passport.use(
      new LocalStrategy(
        { usernameField: 'email' },
          async (email, password, done) => {
              try {
                  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
                  
                  if (result.rows.length === 0) {
                      return done(null, false, {message: "Incorrect credentials"})
                  }

                  const user = result.rows[0]
                  console.log(user);



                  const isPasswordMatch = await bcrypt.compare(password, user.password)
                  if (!isPasswordMatch) {
                      return done(null, false, {message: "Invalid credential"})
                  }
                  

                  return done(null, user)
              } catch (err) {
                  return done(err)
              }
              
            }
            
            
      )
    );


    passport.serializeUser(async (user, done) => {
        try {
            const result = await pool.query('SELECT id, email FROM user WHERE id = $1', [id])
            done(null, result.rows[0]);
        } catch (err) {
            return done(err)
        }
      
    });
    

    passport.deserializeUser((user, done) => {

    })
}