const mysql = require('mysql');
const bcrypt = require('bcryptjs');

module.exports = {
  getSignUp : (req, res, next) => {
    return res.render('users/signup');
  },
  postSignUp: (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password, salt);

    let user = {
      email: req.body.email,
      name: req.body.name,
      password: password
    }

    const config = require('.././database/config');
    const db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO users SET ?', user, (err, row, fields) => {
      if(err) throw err;
      db.end();
    });
    req.flash('message', 'Register done without problems!');
    return res.redirect('/auth/signin');
  },
  getSignIn : (req, res, next) => {
    return res.render('users/signin', {
      message: req.flash('message'),
      authmessage: req.flash('authmessage') 
    });
  },
  logout : (req, res, next) => {
    req.logout();
    res.redirect('/auth/signin');
  },
  getUserPanel : (req, res, next) => {
    res.render('users/panel', {
      isAuthenticated : req.isAuthenticated(),
      user : req.user
    });
  }
};
