import Express  from "express";
import * as UsersController from '../../controller/users.controller.js'


export const routerUsers = Express.Router();
routerUsers.use(Express.json());
routerUsers.use(Express.urlencoded({extended: true}))

/* ------------------------------ GET: '/' ------------------------------ */
// Me permite listar todos los productos disponibles
/* -------------- (disponible para usuarios y administradores) -------------- */
routerUsers.get('/',UsersController.getAllUsers)
routerUsers.get('/search',UsersController.getById)