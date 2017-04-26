
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as indexRouter from "./routes/index";
import * as usersRouter from "./routes/users";
import userModel from './models';

class HttpServer {
    public app: express.Application;
    public router: express.Router;

    public static bootstrap(): HttpServer {
        return new HttpServer();
    }
    constructor() {
        this.app = express();

        this.ExpressConfiguration();

        this.IndexRoutes();
        this.UsersRoutes();
    }
    private ExpressConfiguration() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.use(morgan('dev'));
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });

        // serve static files
        this.app.use(express.static(path.join(__dirname+'/../../public')))
    }
    private IndexRoutes() {
        this.router = express.Router();
        var index: indexRouter.Index = new indexRouter.Index();
       
        this.router.get("/", index.get);
        this.app.use("/", this.router);
    }

    private UsersRoutes() {
        this.router = express.Router();
        var users: usersRouter.Users = new usersRouter.Users();
        this.router.get("/all", users.all);
        this.router.get("/", users.get);
        this.router.post("/", users.post);
        this.router.put("/", users.put);
        this.router.delete("/", users.delete);
        this.app.use("/api/users", this.router);
    }
}

const port: number = process.env.PORT || 8080;
const dbUrl: string = 'mongodb://localhost/currency_app';
const db:mongoose.MongooseThenable = mongoose.connect(dbUrl);

const user = new userModel({
    email: 'example@mail.com',
    password: '123456'
  });
  user.save();

let httpserver = HttpServer.bootstrap();
let app = httpserver.app;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);