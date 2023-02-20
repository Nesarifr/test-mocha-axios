import { MongoContainer } from "../../manager/mongo.manager.js";
import logger from "../../../logs/logger.js";


//crear una subclases de carrtos que trabaje con el contendor Mongo
class CarritoDaoMongo extends MongoContainer{
    constructor(model){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(model);
    
    }
    async save(element){
        try {
            if(element.userID){
                let result = await this.model.find({userID: element.userID})
                const data = JSON.parse(JSON.stringify(result))
                if (data.length) {
                    await this.model.updateOne({userID: element.userID}, {productos: element.productos})
                }else {
                    await this.model.create(element)
                }
                return element.userID
            }
        } catch (error) {
            logger.error(`Ocurrio un error al intentar guardar el nuevo objeto ${element.id}  : ` + error)
            throw new Error(`Ocurrio un error al intentar guardar el nuevo objeto ${element.id}  : ` + error)
        }
    }

    async updateByUserMail(userMail , actualizacion){
        try {
            let result = await  this.model.find({userID: userMail})
            if(result){
                let elementUpdated = await this.model.updateOne({userID: userMail}, actualizacion)
                const data = JSON.parse(JSON.stringify(elementUpdated))
                return data;
            } else {
                await this.save(actualizacion)
            }
        } catch (error) {
            logger.error(`Ocurrio un error en la actualizacion de objeto con id ${userMail}  : ` + error)
            throw new Error(`Ocurrio un error en la actualizacion de objeto con id ${userMail}  : ` + error)
        }
    }

    async getById(userMail){
        try {
            let result = await  this.model.find({userID: userMail})
            if(result){
                const data = JSON.parse(JSON.stringify(result))
                return data;
            } return { message: `No se encontro el objeto con el id : ${id} : ` + error }
        } catch (error) {
            logger.error(`Ocurrio un error en la busqueda del objeto con id : ${userMail} :  ${error}`)
            throw new Error(`Ocurrio un error en la busqueda del objeto con id : ${userMail} :  ${error}`)

        }
        
    }
        async deletedById(userMail){
        try {
            let result = await this.model.deleteMany({userID: userMail});
            return result
        } catch (error) {
            logger.error(`Ocurrio un error al intentar borrar el objeto con id : ${userMail}  : ` + error)
            throw new Error(`Ocurrio un error al intentar borrar el objeto con id : ${userMail}  : ` + error)
        }
    }

}

export {CarritoDaoMongo}