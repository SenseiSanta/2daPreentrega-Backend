/*=================== MODULOS ===================*/
import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import morgan from 'morgan';
import * as dotenv from 'dotenv'
dotenv.config()

import {
    productosDao as productosApi,
    carritosDao as carritosApi,
} from './daos/index.js'

/*=== Instancia de Server, contenedor y rutas ===*/
const app = express();
const cajaProducto = new productosApi('productos');
const cajaCarritos = new carritosApi('carritos');
import routerProductos from './src/routes/productos.routes.js';
import routerInitial from './src/routes/initial.routes.js'


/*================= Middlewears =================*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('./public'))


/*==================== Rutas ====================*/
app.use('/', routerInitial)
app.use('/api/productos', routerProductos);
app.use('*', (req, res) => {
    res.send({error: 'Producto no encontrado'})
})

/*================== Servidor ==================*/
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor: ${error}`))