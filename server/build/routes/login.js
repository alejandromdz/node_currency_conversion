"use strict";
var user_1 = require("../models/user");
var jwt = require("jsonwebtoken");
var Route;
(function (Route) {
    var Login = (function () {
        function Login() {
        }
        Login.prototype.post = function (req, res, next) {
            var _a = req.body, username = _a.username, password = _a.password;
            user_1.default.findOne({ username: username }, function (err, user) {
                if (err)
                    throw err;
                if (!user) {
                    res.status(401).send();
                }
                else {
                    if (user.comparePassword(password)) {
                        var token = jwt.sign({ sub: user.get('username') }, 'bu6Jp5QiNN-KDg2Xlb1Gz-Db6Btq9pmn', { expiresIn: 20000 });
                        res.status(200).cookie('token', token, { maxAge: 900000, httpOnly: true }).send();
                    }
                    else
                        res.status(401).send();
                }
            });
        };
        return Login;
    }());
    Route.Login = Login;
})(Route || (Route = {}));
module.exports = Route;
