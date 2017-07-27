const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {

  passport.serializeUser((user, done)=>{
    done(null, user);
  });

  passport.deserializeUser((obj, done)=>{
    done(null, obj);
  });

  passport.use(new LocalStrategy({
    passReqToCallback : true
  }, (req, email, password, done) => {
     const config = require('.././database/config');
     const db = mysql.createConnection(config);
     db.connect();

     db.query('SELECT * FROM users WHERE email = ?', email, (err, rows, fields) => {
       if(err) throw err;

       db.end();

       if(rows){
         let user = rows[0];
         if(bcrypt.compareSync(password, user.password)){
           return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
           });
         }
       }

       return done(null, false, req.flash('authmessage', 'Mail or Pass wrong'));
     });

    }
  ));

};
