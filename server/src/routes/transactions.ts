import * as express from "express";
import Transaction from '../models/transaction'

module Route {
    export class Transactions {

        all(req: express.Request, res: express.Response, next: express.NextFunction) {
            Transaction.find().lean().exec(function (err, transactions) {
                return res.send(JSON.stringify(transactions));
            })
        }

        get(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.json("{title:'transactions', message:'GET: Transactions'}");
        }

        post(req: express.Request, res: express.Response, next: express.NextFunction) {
            const transaction = new Transaction({
                concept: req.body.concept,
                transaction: req.body.transaction,
                amount: req.body.amount
            });
            transaction.save(function (err) {
                if (err) return res.status(500).send(err);
                Transaction.find().lean().exec(function (err, transactions) {
                    return res.send(JSON.stringify(transactions));
                })
            });

        }

        put(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.json("{title:'transactions', message:'PUT: Transactions'}");
        }

        delete(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.json("{title:'transactions', message:'DELETE: Transactions'}");
        }
        patch(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.json("{title:'transactions', message:'PATCH: Transactions'}");
        }
        options(req: express.Request, res: express.Response, next: express.NextFunction) {

            res.json("{title:'transactions', message:'OPTIONS: Transactions'}");
        }
        head(req: express.Request, res: express.Response, next: express.NextFunction) {
            res.json("{title:'transactions', message:'HEAD: Transactions'}");
        }
    }
}
export = Route;
