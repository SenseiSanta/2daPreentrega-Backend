import mongoose from "mongoose";
import { userModel } from "./models/usuarios.model.js";
import { config } from "./utils/config.js"

async function Main () {
    try {
        const URL = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`
        const connection = await mongoose.connect(URL)
        console.log("Base de datos conectada")

        let response;
        // Insert doc
        const user1 = {name: 'Juan',surname: 'Perez',email: 'jupe@gmail.com',user: 'juanchiGod',password: 'juanp10'};
        response = await userModel.create(user1);
        console.log(`Documento de usuario ${user1.user} insertado`);

        // Find doc
        response = await userModel.find()
        console.log('Documento seleccionado', response)

        // Update doc
        response = await userModel.updateOne({name: 'Juan'}, {password:'654321'})
        console.log('Doc. actualizado')

        // Delete doc




        mongoose.disconnect()
        console.log("Base de datos desconectada!!!!")
    } catch (error) {
        console.log(error)
    }
}

Main()