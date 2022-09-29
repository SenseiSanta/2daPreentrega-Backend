import ContendorMongoDB from '../../container/ContenedorMongoDB.js'

export class CarritosDaoMongoDB extends ContendorMongoDB {

    constructor() {
        super('productos', {
            title: { type: String, required: true},
            price: { type: Number, required: true},
            img: { type: String, required: true}
        })
    }
}