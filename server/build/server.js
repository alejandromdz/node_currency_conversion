"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var http = require("http");
var morgan = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var models_1 = require("./models");
var HttpServer = (function () {
    function HttpServer() {
        this.app = express();
        this.ExpressConfiguration();
        this.IndexRoutes();
        this.UsersRoutes();
    }
    HttpServer.bootstrap = function () {
        return new HttpServer();
    };
    HttpServer.prototype.ExpressConfiguration = function () {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
        // serve static files
        this.app.use(express.static(path.join(__dirname + '/../../public')));
    };
    HttpServer.prototype.IndexRoutes = function () {
        this.router = express.Router();
        var index = new indexRouter.Index();
        this.router.get("/", index.get);
        this.app.use("/", this.router);
    };
    HttpServer.prototype.UsersRoutes = function () {
        this.router = express.Router();
        var users = new usersRouter.Users();
        this.router.get("/all", users.all);
        this.router.get("/", users.get);
        this.router.post("/", users.post);
        this.router.put("/", users.put);
        this.router.delete("/", users.delete);
        this.app.use("/api/users", this.router);
    };
    return HttpServer;
}());
var port = process.env.PORT || 8080;
var dbUrl = 'mongodb://localhost/currency_app';
var db = mongoose.connect(dbUrl);
var user = new models_1.default({
    email: 'example@mail.com',
    password: '123456'
});
user.save();
var httpserver = HttpServer.bootstrap();
var app = httpserver.app;
app.set("port", port);
var server = http.createServer(app);
server.listen(port);
