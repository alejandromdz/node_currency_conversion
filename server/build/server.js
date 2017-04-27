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
var transactionsRouter = require("./routes/transactions");
var HttpServer = (function () {
    function HttpServer() {
        this.app = express();
        this.ExpressConfiguration();
        this.IndexRoutes();
        this.UsersRoutes();
        this.TransactionRoutes();
    }
    HttpServer.bootstrap = function () {
        return new HttpServer();
    };
    HttpServer.prototype.ExpressConfiguration = function () {
        this.app.use(bodyParser.urlencoded({ extended: false }));
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
    HttpServer.prototype.TransactionRoutes = function () {
        this.router = express.Router();
        var transactions = new transactionsRouter.Transactions();
        this.router.get("/all", transactions.all);
        this.router.post("/", transactions.post);
        this.app.use("/api/transactions", this.router);
    };
    return HttpServer;
}());
var port = process.env.PORT || 8080;
var dbUrl = 'mongodb://localhost/currency_app';
var db = mongoose.connect(dbUrl);
var httpserver = HttpServer.bootstrap();
var app = httpserver.app;
app.set("port", port);
var server = http.createServer(app);
server.listen(port);
