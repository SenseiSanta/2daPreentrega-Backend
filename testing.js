import { ContenedorFirebase } from "../2daPreentrega/src/container/ContenedorFirebase.js";
import { ContendorMongoDB } from "./src/container/ContenedorMongoDB.js";

const box = new ContenedorFirebase('usuarios')
const caja = new ContendorMongoDB('usuarios')

async function Main () {
    // Firebase
    /* await box.save(
        {
            usuario: 'Matias',
            dni: 22333444,
            ciudad: 'mar del plata'
        })
    
    console.log (await box.getAll())

    console.log ('El usuario por id es el siguiente: ', await box.getById('jw8fC0WWHHX6GeLTrTAF'))

    console.log (await box.deleteById('zywmbk8QCRDGN28tnxnd'))

    console.log (await box.updateById('yZIysN3GzjZGxa',{dni: 12345678}))

    console.log (await box.deleteAll()) */



    //MongoDB
    await caja.save({
        usuario: 'Matias',
        dni: 22333444,
        ciudad: 'mar del plata'
    })
}

Main()