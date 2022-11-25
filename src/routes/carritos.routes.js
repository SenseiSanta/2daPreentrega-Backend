/* ============= INICIO DE ROUTEO ============= */
import e from 'express';
import express from 'express';

/* =========== Import de container ============ */
import {
    productosDao as ContainerProductos,
    carritosDao as ContainerCarritos,
} from '../../src/daos/index.js'

/* ========= Creacion de contenedores ========= */
const cajaCarritos = ContainerCarritos;
const cajaProducto = ContainerProductos;

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
    const id = req.params['id'];
    const eliminado = await cajaCarritos.deleteById(id)
    if (eliminado) {
        res.status(200).json({msg: 'Eliminado con exito'});
    } else {
        res.status(400).json({error: `No se elimino nada: Carrito #${id} no encontrado`})
    }
})

// Devuelve un carrito
routerCarritos.get('/:id/productos', async (req, res) => {
    const id = req.params['id'];
    const carrito = await cajaCarritos.getById(id);
    if (carrito.productos) {
        res.status(200).json(carrito.productos);
    } else {
        res.status(400).json({error: `No se encontraron productos: Carrito #${id} no existe`})
    }
}) 

// Agrega productos a un carrito
routerCarritos.post('/:id/productos', async (req, res) => {
    const id = req.params['id'];
    const carrito = await cajaCarritos.getById(id);
    if (carrito.error) {
        res.status(400).json(
            {
                error: carrito.error,
                mensaje: 'Error en el carrito'
            })
    } else {
        const producto = await cajaProducto.getById(req.body.id);
        if (producto.error){
            res.status(400).json(
                {
                    error: producto.error,
                    mensaje: 'Error en el producto'
                })
        } else {
            carrito.productos.push(producto)
            await cajaCarritos.updateCart(carrito, id)
            res.status(200).json({msg: "Agregado exitosamente. A continuacion el carrito:",
                                  obj: carrito});
        }
    }
})

//Elimina un producto de un carrito
routerCarritos.delete('/:id/productos/:id_prod', async (req, res) => {
    const idCart = req.params['id'];
    const idProd = req.params['id_prod'];
    const carrito = await cajaCarritos.getById(idCart);
    if (carrito.error) {
        res.status(400).json(
            {
                error: carrito.error,
                mensaje: 'Error en el carrito'
            })
    } else {
        const producto = await cajaProducto.getById(idProd);
        if (producto.error){
            res.status(400).json(
                {
                    error: producto.error,
                    mensaje: 'Error en el producto'
                })
        } else {
            const eliminado = await cajaCarritos.deleteProductById(carrito, producto)
            if (eliminado) {
                res.status(200).json({msg: 'Eliminado con exito'});
            } else {
                res.status(400).json({error: 'No se elimino nada: Producto no encontrado'})
            }
        }
    }
})

/* =========== Exportacion de modulo =========== */
export default routerCarritos;