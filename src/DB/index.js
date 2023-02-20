import { MongoClient } from "../DB/clients/mongooseConnection.Config.js";
import {options} from "../config/config.js"
import logger from "../logs/logger.js";


const databaseType = options.server.BASE_DATATYPE
logger.info("se aplica la base de datos "+databaseType)

async function getApiDao(tipoDB) {
    let ContenedorDaoProductos;
    let ContenedorDaoCarritos;
    switch (tipoDB) {
        // case "archivos":
        //     const {ProductsDaoArchivos} = await import("./productos/productDaoArchivo.js");
        //     const {CartsDaoArchivos} = await import("./carritos/carritoDaoArchivo.js");
        //     ContenedorDaoProductos = new ProductsDaoArchivos("productos");
        //     ContenedorDaoCarritos = new CartsDaoArchivos("carrito");
        //     break;
        // case "sql":
        //     const {ProductsDaoSql} = await import("./productos/productDaoSql.js");
        //     const {CarritoDaoSql} = await import("./carritos/carritoDaoSql.js");
        //     ContenedorDaoProductos = new ProductsDaoSql(optionsSqliteDB, "productos");
        //     ContenedorDaoCarritos = new CarritoDaoSql(optionsSqliteDB,"carrito");
        // break;
        case "mongo":
            const { ProductsDaoMongo } = await import(
                "./daos/productos/productDaoMongo.js"
            );
            const { CarritoDaoMongo } = await import(
                "./daos/carrito/carritoDaoMongo.js"
            );
            const { ProductModel } = await import(
                "./models/MongoDB/products.models.js"
            );
            const { carritoModel } = await import(
                "./models/MongoDB/carritos.models.js"
            );
            const MongoBD =  new MongoClient()
            await MongoBD.connection()
            ContenedorDaoProductos = new ProductsDaoMongo(ProductModel);
            ContenedorDaoCarritos = new CarritoDaoMongo(carritoModel);
            break;
        // case "firebase":
        //     const {ProductsDaoFirebase} = await import("./productos/productDaoFirebase.js");
        //     const {CarritoDaoFirebase} = await import("./carritos/carritoDaoFirebase.js");
        //     ContenedorDaoProductos = new ProductsDaoFirebase("productos");
        //     ContenedorDaoCarritos = new CarritoDaoFirebase("carritos");
        //     break;
        default:
            break;
    }
    return {ContenedorDaoProductos, ContenedorDaoCarritos}
    
}

let {ContenedorDaoProductos, ContenedorDaoCarritos} = await getApiDao(databaseType)
console.log(await ContenedorDaoProductos.getAll());
export {ContenedorDaoProductos, ContenedorDaoCarritos}