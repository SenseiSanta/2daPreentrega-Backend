import mongoose from "mongoose";
import { configMongoDB } from "../utils/config.js";

let connection = await mongoose.connect(configMongoDB.cnxString)

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
            const doc = await this.coleccion.find({id: id})
            if (!doc.exists) {
                throw new Error('El id solicitado no existe')
            } else {
                return doc
            }
        } catch (error) {
            console.log(error)
            return {error: 'Objeto no encontrado'}
        }
    }

    async save(obj) {
        try {
            let doc = await this.coleccion.insert(obj);
            return {status: 'Objeto agregado', doc: doc}
        } catch (error) {
            console.log(error)
            return {error: 'El objeto no se ha guardado'}
        }
    }

    async deleteById(id) {
        try {
            const doc = await this.coleccion.deleteOne({id: id})
            return `Usuario ${doc.id} eliminado`   
            }
        catch(error) {
            return `El usuario con id ${id} no existe. Nada se ha eliminado`
        }
    }

    async updateById(id, obj) {
        try {
            const toUpdate = await this.coleccion.doc(id).get()
            const doc = this.coleccion.doc(id);
            if (toUpdate.exists) {
                await doc.update(obj)
                return `Usuario con id ${id} actualizado`
            } else {
                return `El usuario con id ${id} no existe. Nada se ha actualizado`
            }
        }
        catch (error) {
            console.log(error)
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