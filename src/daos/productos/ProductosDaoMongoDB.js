import ContenedorMongoDB from '../../container/ContenedorMongoDB.js'

export class ProductosDaoMongoDB extends ContenedorMongoDB {

    constructor() {
        super('productos', {
            producto: { type: String, required: true},
            descripcion: { type: String, required: true},
            codigo: { type: String, required: true},
            precio: { type: Number, required: true},
            stock: { type: Number, required: true},
            img: { type: String, required: true}
        })
    }
}