"use strict";
var transaction_1 = require("../models/transaction");
var Route;
(function (Route) {
    var Transactions = (function () {
        function Transactions() {
        }
        Transactions.prototype.all = function (req, res, next) {
            transaction_1.default.find().lean().exec()
                .then(function (transactions) { return res.send(JSON.stringify(transactions)); });
        };
        Transactions.prototype.get = function (req, res, next) {
            res.json("{title:'transactions', message:'GET: Transactions'}");
        };
        Transactions.prototype.post = function (req, res, next) {
            var transaction = new transaction_1.default({
                concept: req.body.concept,
                transaction: req.body.transaction,
                amount: req.body.amount
            });
            transaction.save()
                .then(function () { return transaction_1.default.find().lean().exec(); })
                .catch(function (err) { return res.status(500).send(err); })
                .then(function (transactions) { return res.send(JSON.stringify(transactions)); });
        };
        Transactions.prototype.put = function (req, res, next) {
            res.json("{title:'transactions', message:'PUT: Transactions'}");
        };
        Transactions.prototype.delete = function (req, res, next) {
            res.json("{title:'transactions', message:'DELETE: Transactions'}");
        };
        Transactions.prototype.patch = function (req, res, next) {
            res.json("{title:'transactions', message:'PATCH: Transactions'}");
        };
        Transactions.prototype.options = function (req, res, next) {
            res.json("{title:'transactions', message:'OPTIONS: Transactions'}");
        };
        Transactions.prototype.head = function (req, res, next) {
            res.json("{title:'transactions', message:'HEAD: Transactions'}");
        };
        return Transactions;
    }());
    Route.Transactions = Transactions;
})(Route || (Route = {}));
module.exports = Route;
