/* ============= INICIO DE ROUTEO ============= */
import express from 'express';

/* =========== Import de container =========== */
import { productosDao } from '../../src/daos/index.js'

/* ========= Creacion de contenedores ========= */
const cajaProducto = productosDao

/* ================== Router ================== */
const routerProductos = express.Router();

/* ============= Routing y metodos ============= */
//Devuelve todos los items
routerProductos.get('/', async (req, res) => {
    res.status(200).send(await cajaProducto.getAll());
})

//Devuelve un item por id
routerProductos.get('/:id', async (req, res) => {
    const id = req.params['id'];
    console.log(`El id es ${id}`)
    res.status(200).send(await cajaProducto.getById(id));
}) 

// Actualiza un item respecto al id por params
routerProductos.put('/:id', async (req, res) => {
    const id = req.params['id'];
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
    const response = await cajaProducto.save(req.body)
    if (response.error) {
        res.status(400).json({error: response.error})
    } else {
        res.status(201).json({response, data: req.body})
    }
})

// Elimina un item por id
routerProductos.delete('/:id', async (req, res) => {
    const id = req.params['id'];
    const eliminado = await cajaProducto.deleteById(id)
    if (eliminado) {
        res.status(200).json({msg: 'Eliminado con exito'});
    } else {
        res.status(400).json({error: `No se elimino nada: Producto con id ${id} no encontrado`})
    }
})

/* =========== Exportacion de modulo =========== */
export default routerProductos;