import ContendorMemoria from '../../container/ContenedorMemoria.js'

export class CarritosDaoMemoria extends ContendorMemoria {

    constructor() {
        super('carritos', {
            productos: {type: [], required: true}
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}