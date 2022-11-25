import ContenedorFirebase from '../../container/ContenedorFirebase.js'

export class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }

    async updateCart(obj, id) {
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
        }
    }

    async deleteProductById (carrito, producto) {
        try {
            const doc = this.coleccion.doc(carrito.id)
            const toDelete = carrito.productos.findIndex((o)=> producto.id == o.id);
            if (toDelete == -1) {
                console.log(`Puede que el usuario con id ${carrito} no exista, por favor, intente nuevamente`)
                return false
            } else {
                carrito.productos.splice(toDelete, 1)
                doc.update(carrito)
                console.log(`El producto ${producto} del usuario con id ${carrito} ha sido eliminado`)
                return true
            } 
        } catch (error) {
            console.log(error)
        }
    }
}