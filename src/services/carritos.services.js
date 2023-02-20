import {ContenedorDaoCarritos} from "../DB/index.js";
import logger from "../logs/logger.js";


export const getCarritoId = async (id) => {
    try {
        const existeCarrito = await ContenedorDaoCarritos.getById(id)
        if (!existeCarrito.message) {
            logger.info("Se busca el carrito por ID: " + id)
            return existeCarrito
        } else {
            return { message: `No se encontro el objeto con el id : ${id} : ` + error }
        }
    }
    catch (error) {
        let msgError=`Ocurrio un error en la busqueda del objeto con id : ${id} : ` + error 
        logger.error(msgError)
        throw new Error(msgError)
    }
}

export const getAllCarritos = async () => {
    try {
        const objects = await ContenedorDaoCarritos.getAll()
        return objects;
    } catch (error) {
        let msgError=`Ocurrio un error en la busqueda de todos los  objetos  : ` + error 
        logger.error(msgError)
        throw new Error(msgError)
    }
}

export const addProductos = async (element) => {
    try {
        const nuevoId = await ContenedorDaoCarritos.save(element)
        logger.info(`Se crea un nuevo carrito con id: ${nuevoId}`);
        return ({id: nuevoId, nuevosProductos: element.productos})
    } catch (error) {
        let msgError=`Ocurrio un error al intentar guardar el nuevo objeto ${element.userID}  : ` + error 
        logger.error(msgError)
        throw new Error(msgError)
    }
}
export const updateById = async (body, id) => {
    try {
        let elementUpdated = await ContenedorDaoCarritos.updateByUserMail({ id: id }, body)
        return elementUpdated
    } catch (error) {
        let msgError=`Ocurrio un error en la actualizacion de objeto con id ${id}  : ` + error 
        logger.error(msgError)
        throw new Error(msgError)
    }

}
export const borrarCarrito = async (id) => {
    try {
        const carritoId = await ContenedorDaoCarritos.getById(id)

        if (carritoId.length) { //getById devuelve null en caso de que no exita el elemento con ID
            await ContenedorDaoCarritos.deletedById(id)
            logger.info( "Carrito eliminado")
            return ({ message: "Carrito eliminado" })
        } else
            return ({ error: "El carrito no existe" })
    }
    catch (error) {
        let msgError=`Ocurrio un error al intentar borrar el objeto con id : ${id}  : ` + error
        logger.error(msgError)
        throw new Error(msgError)
    }
}
