import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSanitizer from 'express-sanitizer';
import session from 'express-session';
import helmet from 'helmet';

export default {
  setup: (config) => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));

    app.use(cookieParser(config.app.secret));
    app.use(session({ secret: config.app.secret, resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(expressSanitizer());
    // app.use("/static", express.static(path.join(__dirname, 'public')));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use((req, res, next) => {
      res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
      next();
    });
    app.use(helmet.hsts({
      maxAge: 0
    }));
    app.use((req, res, next) => {
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.header('Expires', '-1');
      res.header('Pragma', 'no-cache');
      next();
    });

    return app;
  }
};
