module.exports = {
  index : (req, res, next) => {
    res.render('home', {
      isAuthenticated : req.isAuthenticated(),
      user : req.user
    });
  }
}
