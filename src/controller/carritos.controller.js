import * as CarritoService from "../services/carritos.services.js";
import {twilioPhone, twilioCliente, twilioWapp,adminWapp} from "../messages/twilio.js";
import logger from "../logs/logger.js";


export const getCarritosController = async (req, res)=>{
    try{
        logger.info("Se pide lista completa de carritos")

            const listCarritos = await CarritoService.getAllCarritos()
            res.json({listCarritos})
        }
    catch(error){
        logger.error("CarritoControler -> Error en carritos get id "+ error)
        res.status(500).send('Error en el servidor')
    }
}

export const getCarritosControllerID = async (req, res)=>{
    try{
        const {id} = req.params
        res.json( CarritoService.getCarritoId(id))
    }
    catch(error){
        logger.error("CarritoControler -> Error en carritos get id "+ error)
        res.status(500).send('Error en el servidor')
    }
}

export const postCarritosController = async (req, res)=> {
    try{
        if(!req.user.email){
            return {message: "Debe loguearse previamente, gracias!"}
        } else { 
        const loadCarrito = {userID: req.user.email , productos: req.body }
        const response = await CarritoService.addProductos(loadCarrito)
        logger.info(response)
        res.json(response) 
        }
    }catch(error){
        logger.error(`CarritoControler -> ` + error)
        res.status(500).send('Error en el servidor ' + error)
    } 
}

export const postCarritosControllerComprar = async (req, res)=> {
    try{
        if(!req.user){
            return {message: "Debe loguearse previamente, gracias!"}
        } 
        else { 
        const userID =  req.user.email
        const existeCarrito = await CarritoService.getCarritoId(userID)
        if(existeCarrito.length){
            // SMS
            await twilioCliente.messages.create({
                body: "Registro exitoso ",
                from: twilioPhone,
                to: req.user.telefono
            },
                (error) => {
                    if (error) {
                        logger.error("Hubo un erro al enviar el mensaje al usuario")
                    } else {
                        logger.info("Mensaje enviado correctamente")
                    }
                })

            // WHATSAPP
            await twilioCliente.messages.create({
                body: `Registro exitoso ${existeCarrito}` ,
                from: `whatsapp:${twilioWapp}`,
                to: `whatsapp:${req.user.telefono}`
            },
                (error) => {
                    if (error) {
                        logger.error("Hubo un erro al enviar el mensaje al usuario")
                    } else {
                        logger.info("Mensaje enviado correctamente")
                    }
                })
            await CarritoService.borrarCarrito(userID)
            return res.json({message: "Compra efectuada con exito"})
        } else {
            return res.json({message: "El carrito esta vacio"})
        }
    }
    }catch(error){
        logger.error("CarritoControler ->  " + error)
        res.status(500).send('Error en el servidor' + error)
    }    
}

export const deleteCarritosController = async (req, res)=>{
    try{
        const {id} = req.params
        res.json(CarritoService.borrarCarrito(id))
    }
    catch(error){
        logger.error("CarritoControler -> " + error)
        res.status(500).send('Error en el servidor')
    }
    
}