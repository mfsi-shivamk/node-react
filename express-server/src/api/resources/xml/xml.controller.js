

import { queue } from '../../../kue';
import { db } from '../../../models';

const formidable = require('multer');

export default {
  async index(req, res, next) {
    res.send(true);
  }
};
