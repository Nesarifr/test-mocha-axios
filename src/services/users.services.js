import   {userDaoMongo} from '../DB/daos/users/userDaoMongo.js'
import {UserModel} from '../DB/models/MongoDB/user.models.js'
import logger from '../logs/logger.js'


const containerUsers = new userDaoMongo(UserModel)

export const getAll = async () => {
    try {
        logger.info("Se pide lista completa de usuarios");       
        return containerUsers.getAll();
    } catch (error) {
        let msgError =
            `Ocurrio un error en la busqueda de todos los  usuarios  : ` + error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};

export const getById = async (id) => {
    try {
        const existeUsuario = await containerUsers.getById(id);
        if (existeUsuario.length) {
            return existeUsuario;
        } else return res.json({ error: "No existe el usuarios solicitado" });
    } catch (error) {
        let msgError =
            `Ocurrio un error en la busqueda de un usuarios  : ` + error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};