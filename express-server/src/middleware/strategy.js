import passport from 'passport';
import JWT from 'jsonwebtoken';
import config from '../config';

// eslint-disable-next-line func-names
const JWTSign = function (user, date) {
  return JWT.sign({
    iss: config.app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 60)
  }, config.app.secret);
};

export const jwtStrategy = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) { return res.status(403).json({ errors: ['Invalid user recieved'] }); }
    // eslint-disable-next-line no-undef
    if (!user) { return json ? res.status(403).json({ errors: ['Invalid user recieved'] }) : res.redirect('/logout'); }
    // Update Token
    const date = new Date();
    const token = JWTSign(user, date);
    res.cookie('XSRF-token', token, {
      expire: new Date().setMinutes(date.getMinutes() + 30),
      httpOnly: true,
      secure: config.app.secure
    });

    req.user = JSON.parse(JSON.stringify(user));
    next();
  })(req, res, next);
};

export const jwtLogoutStrategy = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

export const localStrategy = (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', { session: false }, (err, user) => {
    if (err && err === 'invalid') { return res.status(401).json({ errors: ['Email Id not verified'] }); }
    if (err && err.startsWith('attempt:')) { return res.status(401).json({ errors: [`Invalid Credentials (${err.split(':')[1]} Attempt(s) Left)`] }); }
    if (err) { return res.status(401).json({ errors: [err] }); }
    if (!user) { return res.status(401).json({ errors: ['Invalid Credentials'] }); }
    // eslint-disable-next-line no-param-reassign
    user.type = 'root';
    req.user = user;
    next();
  })(req, res, next);
};
