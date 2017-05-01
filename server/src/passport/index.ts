import * as passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user';

const cookieExtractor = function (req: any) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }

  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: 'bu6Jp5QiNN-KDg2Xlb1Gz-Db6Btq9pmn'
}

passport.use(new Strategy(opts, function (jwt_payload, done) {

  User.findOne({ username: jwt_payload.sub })
    .then((user) => {
      if (user) done(null, user);
      else done(null, false);
    })
    .catch(err => done(err, false))
}));

/*  User.findOne({ username: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));*/


passport.serializeUser(function (user: any, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});


export default passport;