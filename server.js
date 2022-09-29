/*=================== MODULOS ===================*/
import express from 'express';
import morgan from 'morgan';
import path from 'path'
import {fileURLToPath} from 'url';
import * as dotenv from 'dotenv'
dotenv.config();

import {
    productosDao as productosApi,
    carritosDao as carritosApi,
} from './src/daos/index.js'



/*=== Instancia de Server, contenedor y rutas ===*/
const app = express();
export const cajaProducto = productosApi;
export const cajaCarritos = carritosApi;
import routerProductos from './src/routes/productos.routes.js';
import routerCarritos from './src/routes/carritos.routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*================= Middlewears =================*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('./public'))

/*==================== Rutas ====================*/
app.use('/api/productos', routerProductos);
app.use('/api/carritos', routerCarritos);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/views/index.html'));
})
app.use('*', (req, res) => {
    res.send({error: 'Pagina no existente'})
})

/*================== Servidor ==================*/
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor: ${error}`))