const passport = require('passport');
const UserModel = require('../models/user.model');

async function registerUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create(email, password);

    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return next(err);
      return res
        .status(200)
        .json({ message: 'User is logged in successfully', user });
    });
  })(req, res, next);
}

function logoutUser(req, res, next) {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'User is logged out' });
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
