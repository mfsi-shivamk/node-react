import path from 'path';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSanitizer from 'express-sanitizer';
import session from 'express-session';
import helmet from 'helmet';
import fileSystem from 'fs';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

export default {
  setup: (config) => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({
      limit: '50mb',
      verify: (req, res, buf) => {
        req.rawBody = buf
      }
    }))

    app.use(cookieParser(config.app.secret));
    app.use(session({ secret: config.app.secret, resave: true, saveUninitialized: true }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(expressSanitizer());
    app.use("/static", express.static(path.join(__dirname, 'public')));
    app.get('/loaderio-da8646e97cd4fc815c82d1938ec645d3', (req,res)=>{
      const file = `${__dirname}/loaderio-da8646e97cd4fc815c82d1938ec645d3.txt`;
        res.download(file);
    })
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(helmet.hsts({
      maxAge: 0
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    Sentry.init({
      dsn: config.app.sentryUrl,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
      ],
      tracesSampleRate: 1.0,
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());

    return app;
  }
};
