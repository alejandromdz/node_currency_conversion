
import * as express from "express";
import * as path from 'path';
import User from '../models/user'
import * as jwt from 'jsonwebtoken';

module Route {
  export class Login {

    post(req: express.Request, res: express.Response, next: express.NextFunction) {
      const {username,password}=req.body;
      User.findOne({username: username}, function (err, user:any) {
        
        if (err) throw err;

        if (!user) {
          res.status(401).send();
        }
        else {
          if (user.comparePassword(password)) {
            var token = jwt.sign({ sub: user.get('username') }, 
            'bu6Jp5QiNN-KDg2Xlb1Gz-Db6Btq9pmn', 
            {expiresIn: 20000});

            res.status(200).cookie('token', token,{ maxAge: 900000, httpOnly: true }).send();
          }
          else res.status(401).send();
          
        }
      });
    }
  }
}
export=Route;