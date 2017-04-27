"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var transactionSchema = new mongoose.Schema({
    amount: Number,
    date: { type: Date, default: Date.now },
    concept: String,
    transaction: String
});
exports.default = mongoose.model('transaction', transactionSchema);
