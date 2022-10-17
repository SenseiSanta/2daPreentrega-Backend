let productosDao
let carritosDao

switch (process.env.PERS) {
    case 'json':
        const { ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { CarritosDaoArchivo } = await import('./carritos/CarritosDaoArchivo.js')

    productosDao = new ProductosDaoArchivo()
    carritosDao = new CarritosDaoArchivo()
    break

    case 'memoria':
        const { ProductosDaoMemoria } = await import('./productos/ProductosDaoMemoria.js')
        const { CarritosDaoMemoria } = await import('./carritos/CarritosDaoMemoria.js')

    productosDao = new ProductosDaoMemoria()
    carritosDao = new CarritosDaoMemoria()
    break

    case 'firebase':
        const { ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js')
        const { CarritosDaoFirebase } = await import('./carritos/CarritosDaoFirebase.js')

    productosDao = new ProductosDaoFirebase()
    carritosDao = new CarritosDaoFirebase()
    break

    case 'mongodb':
        const { ProductosDaoMongoDB } = await import('./productos/ProductosDaoMongoDB.js')
        const { CarritosDaoMongoDB } = await import('./carritos/CarritosDaoMongoDB.js')

    productosDao = new ProductosDaoMongoDB()
    carritosDao = new CarritosDaoMongoDB()
    break
}

console.log(process.env.PERS)
console.log(process.env.SECRET_KEY)

export { productosDao, carritosDao }