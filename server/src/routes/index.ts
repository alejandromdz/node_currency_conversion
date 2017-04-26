
import * as express from "express";
import * as path from 'path';
module Route{
 export class Index {

   
   get(req: express.Request, res: express.Response, next: express.NextFunction){
   		res.sendFile(path.join(__dirname+'/../../../public/index.html'));
   	}

 }
}
export = Route;
