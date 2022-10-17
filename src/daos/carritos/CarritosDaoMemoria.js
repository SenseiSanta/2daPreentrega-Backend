import ContenedorMemoria from '../../container/ContenedorMemoria.js'
import fs from 'fs/promises';

export class CarritosDaoMemoria extends ContenedorMemoria {

    constructor() {
        super()
    }

    async updateCart(obj, id) {
        try {
            const indexObj = this.memoria.findIndex((o)=> o.id == id);
            this.memoria[indexObj] = obj
            return {
                status: 'Aniadido con exito',
                carrito: this.memoria[indexObj].id
            };

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductById (carrito, producto) {
        try{
            const indexObj = this.memoria.findIndex((o)=> o.id == carrito.id);
    
            if (indexObj == -1) {
                throw new Error('Objeto no encontrado, intente con otro numero de identificacion')
            } else if (this.memoria[indexObj].productos) {
                const indexProd = carrito.productos.findIndex((o)=> o.id == producto.id);
                this.memoria[indexObj].productos.splice(indexProd, 1)
            } else {
                throw new Error('El carrito no tiene este producto')
            }
            return true
        }
        catch(error) {
            console.log(error)
            return false
        }
    }

}