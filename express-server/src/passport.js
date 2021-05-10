import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import config from './config';
import { db } from './models';

const validator = require('email-validator');

// eslint-disable-next-line func-names
const TokenExtractor = function (req) {
  let token = null;
  if (req && req.cookies && req.cookies['XSRF-token']) {
    token = req.cookies['XSRF-token'];
  } else if (req && req.headers && req.headers['xsrf-token']) {
    token = req.headers['xsrf-token'].replaceAll('"', '');
  }
  return token;
};


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: TokenExtractor,
  secretOrKey: config.app.secret,
  passReqToCallback: true
// eslint-disable-next-line consistent-return
}, async (req, payload, done) => {
  try {
    let user = null;
    user = await db.User.findOne({
      where: { id: payload.sub }, attributes: ['id', 'phone', 'firstname', 'lastname', 'key']
    });
    if (!user) {
      return done('user', false);
    }
    // user.type = payload.iam;
    if (new Date(payload.exp) < new Date()) {
      return done('expired', false);
    }
    // user.type = payload.iam;

    return done(null, user);
  } catch (error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'phone',
  passReqToCallback: true
}, async (req, phone, password, done) => {
  try {
    const condition = {};
    if (validator.validate(phone)) condition.email = phone;
    else condition.phone = phone;
    db.User.findOne({
      where: condition,
      attributes: ['id', 'firstname', 'lastname', 'key'],
      required: true
    })
      // eslint-disable-next-line consistent-return
      .then(async (User) => {
        if (!User) {
          return done(null, false);
        }
        const isMatch = await User.comparePassword(password);

        if (!isMatch) {
          return done(`attempt:${5 - User.attempt}`, false);
        }

        done(null, User);
      })
      .catch(() => {
        done('invalid', false);
      });
  } catch (error) {
    done(error, false);
  }
}));
