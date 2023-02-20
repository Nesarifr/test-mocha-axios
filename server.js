import express from 'express';
import * as HttpServer from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import logger from './src/logs/logger.js';
import { options } from './src/config/config.js';
import { apiRouter } from './src/router/index.js';
import cors from 'cors'

/* ------------------- constantes necesarias del servidor ------------------- */

const app = express();
const httpServer = new HttpServer.createServer(app); 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename)
const PORT = options.server.PORT


/* ------------------------------- configuracion del servidor ------------------------------- */
app.use(express.static(__dirname + '/src/public')) 
app.use(express.json());
app.use(express.urlencoded({extended: true}))
//configuracion se la sesion
app.use(session({
    //donde se guardan las sesiones
    store: MongoStore.create({
        mongoUrl: options.mongoDB.MONGOURL_SESSION
    }),
    cookie: {
        maxAge: 30000
    },
    secret:"claveSecreta",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize()) 
app.use(passport.session())
app.use(cors({
    origin:`http://localhost:${PORT}/api`
}))

app.use("/",apiRouter);


/* ---------------------- definicion motor de plantilla --------------------- */
app.engine('hbs', engine({extname: 'hbs'}))
app.set('views', path.join(__dirname,'/src/public/views')) //ubicacion de templates
app.set('view engine', 'hbs') // definitar motor para express

/* -------------------- Se crea el servidor y se enciende ------------------- */


app.listen(PORT, ()=> logger.info(`Server listening on port ${PORT}`));





export {app};