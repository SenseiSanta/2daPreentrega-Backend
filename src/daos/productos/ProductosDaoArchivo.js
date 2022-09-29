import ContenedorArchivo from '../../container/ContenedorArchivo.js'

export class ProductosDaoArchivo extends ContenedorArchivo {

    constructor() {
        super('./DB/productos.json')
    }

    async desconectar() {
    }
}