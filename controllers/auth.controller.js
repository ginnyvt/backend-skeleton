const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const User = require('../models/user.model');

const jwtSecret = process.env.JWT_SECRET;

const signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    if (!user.authenticate(req.body.password)) {
      return res.status(401).json({ error: "Email and password don't match" });
    }

    const token = jwt.sign({ sub: user._id, iat: new Date() }, jwtSecret, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: 'Could not sign in' });
  }
};

const requireSignin = expressJwt({
  secret: jwtSecret,
  algorithms: ['RS256'],
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: 'User is not authorized',
    });
  }

  next();
};

module.exports = { signin, requireSignin, hasAuthorization };
