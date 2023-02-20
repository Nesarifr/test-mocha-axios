import axios from 'axios';
import { options } from '../config/config.js';
import logger from '../logs/logger.js';

const PORT = options.server.PORT;
const ENV = options.server.NODE_ENV;
console.log(PORT, ENV);

const baseURL = `http://localhost:${PORT}/api`

const getProductos = async()=>{
    try {
        const response = await axios.get(`${baseURL}/productos`)
        return response.data;
    } catch (error) {
        logger.error(error)
    }
}

const postProducto =  async body=>{
    try {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        };
        const {data} = await axios.post(`${baseURL}/productos`,body, axiosConfig)
        return data;
    } catch (error) {
        logger.error(error)
    }
}

const putProducto =  async (body, id) =>{
    try {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        };
        const {data} = await axios.put(`${baseURL}/productos/${id}`,body, axiosConfig)
        return data;
    } catch (error) {
        logger.error(error)
    }
}

const deleteProducto =  async (id) =>{
    try {
        const {data} = await axios.delete(`${baseURL}/productos/${id}`)
        return data;
    } catch (error) {
        logger.error(error)
    }
}

const deleteAll =  async () =>{
    try {
        const {data} = await axios.delete(`${baseURL}/productos/`)
        return data;
    } catch (error) {
        logger.error(error)
    }
}


async function test(){

    const productoPrueba = JSON.stringify({
        title: "Snitch Dorada",
        price: 500,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-color-2/64/golden-snitch-512.png"
    })

    const updateNewProduct= JSON.stringify({
        title: "Snitch Plateada",
        price: 50000,
        thumbnail: "https://cdn4.iconfinder.com/data/icons/sports-color-2/64/golden-snitch-512.png"
    })

    await postProducto(productoPrueba)
    let nuevosProductos =  await getProductos()
    console.log("--------------------------------- POST: Primer producto cargado ---------------------------------------");
    console.log(nuevosProductos);

    await putProducto(updateNewProduct, 1)
    nuevosProductos =  await getProductos()
    console.log("--------------------------------- PUT: Se actualiza el producto id 1 ---------------------------------------");
    console.log(nuevosProductos);


    await postProducto(productoPrueba)
    nuevosProductos =  await getProductos()
    console.log("--------------------------------- POST: Segundo producto cargado ---------------------------------------");
    console.log(nuevosProductos);


    await deleteProducto(1)
    nuevosProductos =  await getProductos()
    console.log("--------------------------------- DELETE: se borra el producto id:1 ---------------------------------------");
    console.log(nuevosProductos);

    await postProducto(productoPrueba)
    nuevosProductos =  await getProductos()
    console.log("--------------------------------- POST: Tercer producto cargado ---------------------------------------");
    console.log(nuevosProductos);


    await deleteAll()
    nuevosProductos =  await getProductos()
    console.log("--------------------------------- DELETE: se borran todos los productos ---------------------------------------");
    console.log(nuevosProductos);



    console.log("--------------------------------- TEST TERMINADO ---------------------------------------");
    console.log(PORT, ENV);
    return "ok"
}


test().then(data => console.log(data))
