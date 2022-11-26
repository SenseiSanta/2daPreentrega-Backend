import admin from 'firebase-admin'
import { createRequire } from "module";
const require = createRequire(import.meta.url); // construct the require method
const serviceAccount = require("../../DB/crt/preentrega2-backend-firebase-adminsdk-l4il5-3b3108fc47.json")

//Conecta
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default class ContenedorFirebase {
    constructor(coleccion) {
        const db = admin.firestore()
        this.coleccion = db.collection(coleccion);
    }

    async getAll () {
        try {
            let response = await this.coleccion.get();
            let users = [];
            response.forEach(doc =>{
                users.push({ ...doc.data() })
            })
            return users
        }
        catch(error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const objectToReturn = await this.coleccion.doc(id).get()
            if (objectToReturn.exists) {
                return ( {...objectToReturn.data()} )
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
            let doc = this.coleccion.doc();
            await doc.create({id: doc.id, ...obj});
            return {msg: 'Objeto guardado correctamente'}
        } catch (error) {
            console.log(error)
            return {error: 'El objeto no se ha guardado'}
        }
    }

    async deleteById(id) {
        try {
            const toDelete = await this.coleccion.doc(id).get()
            const doc = this.coleccion.doc(id);
            if (toDelete.exists) {
                await doc.delete()
                console.log(`Item con id ${id} eliminado`)
                return true 
            } else {
                throw new Error('Objeto no encontrado, intente con otro numero de identificacion')
            }
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    async updateById(id, obj) {
        try {
            const toUpdate = await this.coleccion.doc(id).get()
            const doc = this.coleccion.doc(id);
            if (toUpdate.exists) {
                await doc.update(obj)
                console.log(`Usuario con id ${id} actualizado`) 
                return true
            } else {
                throw new Error (`El usuario con id ${id} no existe. Nada se ha actualizado`)
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