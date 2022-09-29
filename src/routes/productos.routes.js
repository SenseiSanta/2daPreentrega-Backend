/* ============= INICIO DE ROUTEO ============= */
import express from 'express';
import { cajaProducto } from '../../server.js';
const routerProductos = express.Router();

/* ============= Routing y metodos ============= */
//Devuelve todos los items
routerProductos.get('/', async (req, res) => {
    res.status(200).send(await cajaProducto.getAll());
})

//Devuelve un item por id
routerProductos.get('/:id', async (req, res) => {
    const id = parseInt(req.params['id']);
    res.status(200).send(await cajaProducto.getById(id));
}) 

// Actualiza un item respecto al id por params
routerProductos.put('/:id', async (req, res) => {
    const id = parseInt(req.params['id']);
    let obj = req.body;
    const actualizado = await cajaProducto.updateById(id, obj)
    if (actualizado) {
        res.status(201).json({msg: 'Actualizado con exito', data: req.body});
    } else {
        res.status(400).json({error: 'No se actualizo nada: Producto no encontrado'})
    }
})

// Agrega un item
routerProductos.post('/', async (req, res) => {
    console.log(await cajaProducto.save(req.body)) 
    res.status(201).json({msg: 'Agregado', data: req.body})
})

// Elimina un item por id
routerProductos.delete('/:id', async (req, res) => {
    const id = parseInt(req.params['id']);
    const eliminado = await cajaProducto.deleteById(id)
    if (eliminado) {
        res.status(200).json({msg: 'Eliminado con exito'});
    } else {
        res.status(400).json({error: 'No se elimino nada: Producto no encontrado'})
    }
})

/* ============= Error de Routing ============= */
routerProductos.get('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})
routerProductos.post('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})
routerProductos.delete('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})
routerProductos.put('*', (req, res) => {
    res.status(404).json({ error : -2, descripcion: `ruta ${req.path} método ${req.method} no implementado`})
})

/* =========== Exportacion de modulo =========== */
export default routerProductos;