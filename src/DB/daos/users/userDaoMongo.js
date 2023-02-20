import {MongoContainer} from "../../manager/mongo.manager.js";
import { converToDto } from "../../dtos/user.dto.js";
import logger from "../../../logs/logger.js";

//crear una subclases de user que trabaje con el contendor Mongo
class userDaoMongo extends MongoContainer{
    
    constructor(UserModel){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(UserModel);
        
    }

    async getById(id) {
        try {
            let result = await this.model.find({ email: id })
            const data = JSON.parse(JSON.stringify(result))
            if (data.length) {
                const dataDto = converToDto(data)
                return dataDto
            } else {
                return { message: `No se encontro el objeto con el id : ${id} : ` + error }
            }
        }
        catch (error) {
            logger.error(`Ocurrio un error en la busqueda del objeto con id : ${id} :  ${error}`)
            throw new Error(`Ocurrio un error en la busqueda del objeto con id : ${id} :  ${error}`)
        }
    }
    
    async getAll() {
        try {
            const objects = await this.model.find()
            const data = JSON.parse(JSON.stringify(objects))
            const dataDto = converToDto(data)
            return dataDto
            return dataDto;
        } catch (error) {
            logger.error(`Ocurrio un error en la busqueda de todos los  objetos  : ` + error)
            throw new Error(`Ocurrio un error en la busqueda de todos los  objetos  : ` + error)
        }
    }
}

export {userDaoMongo}