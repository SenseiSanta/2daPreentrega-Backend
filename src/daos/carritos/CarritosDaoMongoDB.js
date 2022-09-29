import ContendorMongoDB from '../../container/ContenedorMongoDB.js'

export class CarritosDaoMongoDB extends ContendorMongoDB {

    constructor() {
        super('carritos', {
            productos: {type: [], required: true}
        })
    }

    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)
    }
}