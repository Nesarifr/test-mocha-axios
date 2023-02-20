import logger from "../../logs/logger.js";

class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    async getById(id) {
        try {
            let result = await this.model.find({ id: id })
            const data = JSON.parse(JSON.stringify(result))
            if (data.length) {
                return data
            } else {
                return { message: `No se encontro el objeto con el id : ${id} : ` + error }
            }
        }
        catch (error) {
            logger.error(`Ocurrio un error en la busqueda del objeto con id : ${id} :  ${error}`)
            throw new Error(`Ocurrio un error en la busqueda del objeto con id : ${id} :  ${error}`)
        }
    }

    async getAll() {
        try {
            const objects = await this.model.find()
            const data = JSON.parse(JSON.stringify(objects))
            return data;
        } catch (error) {
            logger.error(`Ocurrio un error en la busqueda de todos los  objetos  : ` + error)
            throw new Error(`Ocurrio un error en la busqueda de todos los  objetos  : ` + error)
        }
    }

    async save(element) {
        try {
            let ultimoID = await this.lastID()
            let result = await this.model.create({ id: ultimoID, ...element })
            return result.id
        } catch (error) {
            logger.error(`Ocurrio un error al intentar guardar el nuevo objeto ${element.id}  : ` + error)
            throw new Error(`Ocurrio un error al intentar guardar el nuevo objeto ${element.id}  : ` + error)
        }
    }
    async updateById(body, id) {
        try {
            let elementUpdated = await this.model.updateOne({ id: id }, body)
            return elementUpdated
        } catch (error) {
            logger.error(`Ocurrio un error en la actualizacion de objeto con id ${id}  : ` + error)
            throw new Error(`Ocurrio un error en la actualizacion de objeto con id ${id}  : ` + error)
        }

    }
    async deletedById(id) {
        try {
            let result = await this.model.deleteOne({ id: id });
            return result
        } catch (error) {
            logger.error(`Ocurrio un error al intentar borrar el objeto con id : ${id}  : ` + error)
            throw new Error(`Ocurrio un error al intentar borrar el objeto con id : ${id}  : ` + error)
        }
    }

    async deleteAll() {
        try {
            await this.model.deleteMany({});
            return { message: "delete successfully" }
        } catch (error) {
            logger.error(`Error al borrar todo: ${error}`)
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }

    async lastID() {
        try {
            const data = await this.model.find()
            if (data.length === 0) {
                return 1
            }
            else {
                const length = data.length
                const lastItem = data[length - 1]
                const lastItemId = lastItem.id
                const id = lastItemId + 1
                return id
            }
        } catch (error) {
            logger.error(`Error al querer obtener el ultimo ID: ${error}`)
            throw new Error(`Error al querer obtener el ultimo ID: ${error}`)

        }
    }
}

export { MongoContainer };