import * as UserService from '../services/users.services.js'
import { options } from '../config/config.js';
import logger from "../logs/logger.js";


export const getAllUsers = async (req, res)=>{
    try{
        const usuarios = await UserService.getAll()
        return res.json(usuarios)
    }
    catch(error){
        logger.error("Error en usuario get id "+ error)
        res.status(500).send('Error en el servidor')
    }
}

export const getById = async (req, res)=>{
    try{
        const email = req.query.email
        const usuario = await UserService.getById(email)
        return res.json(usuario)
    }
    catch(error){
        logger.error("Error en usuario get id "+ error)
        res.status(500).send('Error en el servidor')
    }
}