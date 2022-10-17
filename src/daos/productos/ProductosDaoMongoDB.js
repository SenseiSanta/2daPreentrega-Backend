import ContenedorMongoDB from '../../container/ContenedorMongoDB.js'

export class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('productos', {
            title: { type: String, required: true},
            price: { type: Number, required: true},
            img: { type: String, required: true}
        })
    }
}