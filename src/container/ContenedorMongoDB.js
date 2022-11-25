import mongoose from "mongoose";
import { configMongoDB } from "../utils/config.js";

let connection = await mongoose.connect(configMongoDB.db.cnxString)

export default class ContendorMongoDB {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async getAll () {
        try {
            const docs = await this.coleccion.find()
            return docs
        }
        catch(error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const doc = await this.coleccion.findById({"_id": id})
            if (doc !== null) {
                return doc
            } else {
                throw new Error('El id solicitado no existe')
            }
        } catch (error) {
            console.log(error)
            return {error: 'Objeto no encontrado'}
        }
    }

    async save(obj) {
        try {
            let doc = await this.coleccion.create(obj);
            return {status: 'Objeto agregado', doc: doc}
        } catch (error) {
            console.log(error)
            return {error: 'Ha ocurrido un error, revisa la consola'}
        }
    }

    async deleteById(id) {
        try {
            const doc = await this.coleccion.findById({"_id": id})
            if (doc.id !== undefined) {
                const deleted = await this.coleccion.deleteOne({"_id": id})
                console.log(`${doc.id} eliminado`)
                return true 
            } else {
                throw new Error (`El id ingresado no existe, por favor intente nuevamente`)
            }
        }
        catch(error) {
            console.log(error)
            return false
        }
    }

    async updateById(id, obj) {
        try {
            const doc = await this.coleccion.updateOne({"_id": id}, {$set: {id: id, ...obj}})
            console.log(`Usuario con id ${id} actualizado`)
            return true
        }
        catch (error) {
            console.log(`Se ha ingresado un id inexistente, por favor intente nuevamente`)
            return false
        }
    }

    async deleteAll() {
        try {
            const doc = this.coleccion.doc();
            await doc.delete()
            return 'Base de datos reiniciada'
        } catch (error) {
            return 'Error: No se pudo eliminar'
        }
    }
}