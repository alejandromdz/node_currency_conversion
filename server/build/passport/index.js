"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var user_1 = require("../models/user");
var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};
var opts = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'bu6Jp5QiNN-KDg2Xlb1Gz-Db6Btq9pmn'
};
passport.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    user_1.default.findOne({ username: jwt_payload.sub })
        .then(function (user) {
        if (user)
            done(null, user);
        else
            done(null, false);
    })
        .catch(function (err) { return done(err, false); });
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
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
    user_1.default.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});
exports.default = passport;
