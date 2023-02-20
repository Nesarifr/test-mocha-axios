import { MongoContainer } from "../../manager/mongo.manager.js";
import logger from "../../../logs/logger.js";

//crear una subclases de productos que trabaje con el contendor Mongo
class ProductsDaoMongo extends MongoContainer{
    
    constructor(model ){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(model);
        
    }



}

export {ProductsDaoMongo}