import {ContenedorDaoProductos} from "../DB/index.js";
import logger from "../logs/logger.js";


export const getProductos = async () => {
    try {
        logger.info("Se pide lista completa de productos");       
        return await ContenedorDaoProductos.getAll();
    } catch (error) {
        let msgError =
            `Ocurrio un error en la busqueda de todos los  objetos  : ` + error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};

export const getProductosID = async (id) => {
    try {
        const existeProducto = await ContenedorDaoProductos.getById(id);
        if (existeProducto.length) {
            logger.info("Se busca el producto por ID: " + id);
            return existeProducto;
        } else return res.json({ error: "No existe el producto solicitado" });
    } catch (error) {
        let msgError =
            `Ocurrio un error en la busqueda de un objeto  : ` + error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};

export const addNewProduct = async (producto) => {
    try {
        const nuevoId = await ContenedorDaoProductos.save(producto);
        logger.info(
            `Se crea un nuevo producto con id: ${nuevoId} llamado: ${producto.title}`
        );
        return ({
            id: nuevoId,
            nuevoProducto: producto,
        });
    } catch (error) {
        let msgError =
            `Ocurrio un error al intentar guardar el nuevo objeto ${producto}  : ` +
            error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};

export const updateNewProduct = async (producto, id) => {
    try {
        const actualizacion = await ContenedorDaoProductos.updateById(
            producto,
            parseInt(id)
        );
        if (actualizacion) {
            logger.info(
                `Se actualizo el elemento: ` +
                (await ContenedorDaoProductos.getById(id))
            );
            return { message: "Se actualizo el elemento solicitado con id:" + id };
        } else return { error: "No se pudo actualizar el producto solicitado" };
    } catch (error) {
        let msgError =
            `Ocurrio un error al intentar guardar el nuevo objeto ${element.id}  : ` +
            error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};

export const deleteProduct = async (id) => {
    try {
        const productoID = await ContenedorDaoProductos.getById(id);
        if (productoID.length) {
            //getById devuelve null en caso de que no exita el elemento con ID
            await ContenedorDaoProductos.deletedById(parseInt(id));
            logger.info(`Se borra el elemento con id : ${id}`);
            return { message: "Producto eliminado" };
        } else {
            return { error: "El producto no existe" };
        }
    } catch (error) {
        let msgError =
            `Ocurrio un error al intentar borrar el objeto con id : ${id}  : ` +
            error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};

export const deleteAll = async () => {
    try {
        await ContenedorDaoProductos.deleteAll();
        return { message: "Productos eliminados" };
        } 
    catch (error) {
        let msgError =
            `Ocurrio un error al intentar borrar el objeto con id : ${id}  : ` +
            error;
        logger.error(msgError);
        throw new Error(msgError);
    }
};