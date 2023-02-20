import mongoose from "mongoose";
import { options } from "../../config/config.js";
import logger from "../../logs/logger.js";


mongoose.Promise = global.Promise;

class MongoClient {
    constructor() {
        this.client = mongoose;
    }
    //conectamos a la base de datos
    async connection() {
        try {
            this.client.set('strictQuery', false);
            this.client.connect(options.mongoDB.MONGOURLBD, { useNewUrlParser: true, useUnifiedTopology: true },
                error => {
                    if (error) throw new Error(`Conexion fallida ${error}`);
                    logger.info("Conexion base de datos exitosa!")
                })
        } catch (error) {
            logger.error("Sucedio un errror al intentar conectar con la base de datos de Mongo: " + error)
            throw new Error("Sucedio un errror al intentar conectar con la base de datos de Mongo: " + error)
        }

    }

    async disconnect() {
        try {
            await this.client.connection.close();
            logger.info("Se desconecta de la base de datos")
        } catch (error) {
            logger.error("Sucedio un errror al intentar desconectar la base de datos de Mongo: " + error)
            throw new Error(`Hubo un error ${error}`)
        }
    }
}

export { MongoClient }