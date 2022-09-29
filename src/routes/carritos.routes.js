/* ============= INICIO DE ROUTEO ============= */
import express from 'express';
import { cajaCarritos } from '../../server.js';
import { cajaProducto } from '../../server.js';
const routerCarritos = express.Router();

/* ============= Routing y metodos ============= */
// Agrega un carrito
routerCarritos.post('/', async (req, res) => {
    res.status(200).send(await cajaCarritos.save( {productos: []} ));
})

// Devuelve todos los carritos
routerCarritos.get('/', async (req, res) => {
    res.status(200).send(await cajaCarritos.getAll());
})

// Elimina un carrito por id
routerCarritos.delete('/:id', async (req, res) => {
    const id = parseInt(req.params['id']);
    const eliminado = await cajaCarritos.deleteById(id)
    if (eliminado) {
        res.status(200).json({msg: 'Eliminado con exito'});
    } else {
        res.status(400).json({error: `No se elimino nada: Carrito #${id} no encontrado`})
    }
})

// Devuelve un carrito
routerCarritos.get('/:id/productos', async (req, res) => {
    const id = parseInt(req.params['id']);
    const carrito = await cajaCarritos.getById(id);
    if (carrito.productos) {
        res.status(200).json(carrito.productos);
    } else {
        res.status(400).json({error: `No se encontraron productos: Carrito #${id} no existe`})
    }
}) 

// Agrega productos a un carrito
routerCarritos.post('/:id/productos', async (req, res) => {
    const id = parseInt(req.params['id']);
    const carrito = await cajaCarritos.getById(id);
    const producto = await cajaProducto.getById(req.body.id);
    if (producto.error){
        res.status(400).json(producto.error)
    } else {
        carrito.productos.push(producto)
        await cajaCarritos.updateCart(carrito, id)
        res.status(200).json({msg: "Agregado exitosamente",
                            obj: carrito});
    }
})

//Elimina un producto de un carrito
routerCarritos.delete('/:id/productos/:id_prod', async (req, res) => {
    const idCart = parseInt(req.params['id']);
    const idProd = parseInt(req.params['id_prod']);
    const carrito = await cajaCarritos.getById(idCart);
    const producto = await cajaProducto.getById(idProd);
    const eliminado = await cajaCarritos.deleteProductById(carrito, producto)
    if (eliminado) {
        res.status(200).json({msg: 'Eliminado con exito'});
    } else {
        res.status(400).json({error: 'No se elimino nada: Producto no encontrado'})
    }
})

/* ============= Error de Routing ============= */
routerCarritos.get('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})
routerCarritos.post('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})
routerCarritos.delete('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})
routerCarritos.put('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})

/* =========== Exportacion de modulo =========== */
export default routerCarritos;