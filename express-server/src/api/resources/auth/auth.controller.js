

import JWT from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt-nodejs';
import { queue } from '../../../kue';
import { db } from '../../../models';
import config from '../../../config';


const JWTSign = function (user, date) {
  return JWT.sign({
    iss: config.app.name,
    sub: user.id,
    iam: user.type,
    iat: date.getTime(),
    exp: new Date().setMinutes(date.getMinutes() + 60)
  }, config.app.secret);
};
export default {
  async register(req, res, next) {
    const { phone, firstName, lastName, email, password } = req.body;
    db.User.findOne({
      where: { phone }
    })
    .then((user) => {
      if (user) throw new RequestError('User already exists.', 400);
      const key = bcrypt.hashSync(password);
      return db.User.create({
          firstName, key, lastName, phone, email
        });
      })
      .then(r => res.status(200).json({ success: true, data: r }))
      .catch((e) => {
        next(e);
      });
  },
  async login(req, res, next) {
    const date = new Date();
    const token = JWTSign(req.user, date);
    res.cookie('XSRF-token', token, {
      expire: new Date().setMinutes(date.getMinutes() + 60),
      httpOnly: true,
      secure: config.app.secure
    });
    return res.status(200).json({ success: true, token });
  },
  async token(req, res) {
    return res.status(200).json({
      email: req.user.email,
      userName: `${req.user.firstname} ${req.user.lastname ? req.user.lastname : ''}`/* ,
       type: req.user.type === 'root' ? 'Admin' : 'Employee'  */});
  },
};
