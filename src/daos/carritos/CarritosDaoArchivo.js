import ContenedorArchivo from '../../container/ContenedorArchivo.js'
import fs from 'fs/promises';

export class CarritosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('./DB/carritos.json')
    }

    async updateCart(obj, id) {
        try {
            const objs = JSON.parse(await fs.readFile(this.archivo, 'utf-8'), null, 2);
            const indexObj = objs.findIndex((o)=> o.id == id);
            objs[indexObj] = obj

            await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            return {
                status: 'Aniadido con exito',
                carrito: objs.id
            };

        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductById (carrito, producto) {
        try{
            const objs = JSON.parse(await fs.readFile(this.archivo, 'utf-8'), null, 2);
            const indexObj = objs.findIndex((o)=> o.id == carrito.id);
    
            if (indexObj == -1) {
                throw new Error('Objeto no encontrado, intente con otro numero de identificacion')
            } else if (objs[indexObj].productos) {
                const indexProd = carrito.productos.findIndex((o)=> o.id == producto.id);
                objs[indexObj].productos.splice(indexProd, 1)
            } else {
                throw new Error('El carrito no tiene este producto')
            }
    
            await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            return true
        }
        catch(error) {
            console.log(error)
            return false
        }
    }
}