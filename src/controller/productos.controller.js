import * as ProductosService from '../services/productos.services.js'
import parsedArgs from "minimist";
import { options } from '../config/config.js';
import cluster from  "cluster"
import logger from "../logs/logger.js";

const numeroCPUs = 4 // pruebo con un maximo de 4 cpu
const modoCluster = options.server.MODE == "CLUSTER" ? true : false;

export const getAllProductos =  async (req, res)=>{
    try{
        let listProducts;
        if(modoCluster){
            logger.info("Se hacen pruebas en modo cluster")
            if(cluster.isPrimary){
                // logger.info(" es primary")
                //crear los subproceso del cluster
                if(cluster.workers.length<=numeroCPUs){
                    cluster.fork()
                }
                listProducts = await ProductosService.getProductos()

                cluster.on("exit",(worker,error)=>{
                    //detectamos que algun subproceso falla
                    console.log(`El subproceso ${worker.process.pid} dejo de funcionar`);
                    cluster.fork();//creamos un nuevo subproceso que remplaza al que fallo
                });
            } else {
                listProducts = await ProductosService.getProductos()
            }
            return res.json(listProducts)
        } else {

            logger.info("Se pide lista completa de productos" )
            listProducts = await ProductosService.getProductos()
            // const listProducts = JSON.stringify(await ContenedorDaoProductos.getAll())
            // return res.render('home', {productos: JSON.parse(listProducts), user: "Visita"}) para handlebars
            console.log(listProducts);
            return res.status(200).json(listProducts)
        }
    }
    catch(error){
        logger.error("error en productos get "+ error)
        res.status(500).send('Error en el servidor')
    }
}

export const getProductoID = async (req, res)=>{
    try{
        const {id} = req.params
        const producto = await ProductosService.getProductosID(id)
        return res.status(200).json(producto)
    }
    catch(error){
        logger.error("Error en productos get id "+ error)
        res.status(500).send('Error en el servidor')
    }
}

export const addNewProduct = async (req, res)=> {
    try{
        const loadProduct = req.body
        const nuevoProducto = await ProductosService.addNewProduct(loadProduct)
        return res.status(200).json(nuevoProducto)
    }catch(error){
        logger.error("Error: " + error)
        res.status(500).send('Error en el servidor' + error)
    }    
}

export const updateProduct =  async (req, res)=>{
    try{
        const {id} = req.params
        const upDate = req.body
        const response = await ProductosService.updateNewProduct(upDate, id)
        return res.status(200).json(response)
    }
    catch(error){
        logger.error("Error: " + error)
        res.status(500).send('Error en el servidor')
    }
}

export const deleteProduct = async (req, res)=>{
    try{
        const {id} = req.params
        const response =  await ProductosService.deleteProduct(id)
        return res.status(200).json(response)
    }
    catch(error){
        logger.error("Error: " + error)
        res.status(500).send('Error en el servidor')
    }

    
    
}

export const deleteAll = async (req, res)=>{
    try{
        const response =  await ProductosService.deleteAll()
        return res.json(response)
    }
    catch(error){
        logger.error("Error: " + error)
        res.status(500).send('Error en el servidor')
    }

    
    
}