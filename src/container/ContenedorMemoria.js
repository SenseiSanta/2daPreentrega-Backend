export const memoria = []

export class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async getAll () {
        if (memoria =! []) {
            return memoria;
        } else {
            return { error: 'No hay datos en memoria'}
        }
    }

    async save(obj) {
        let newId;
        if (memoria.length == 0) {
            newId = 1
        } else {
            newId = memoria[memoria.length -1].id + 1
        }
        memoria.push({...obj, id: newId})
        return {status: 'Aniadido con exito'};
    }

    async getById(id) {
        const indexObj = memoria.findIndex((o)=> o.id == id)
        if (indexObj == -1) {
            throw new Error('Objeto no encontrado, intente con otro numero de identificacion')
        } else {
            return memoria[indexObj]
        }
    }

    async deleteById(id) {
        const indexObj = memoria.findIndex((o)=> o.id == id);
        if (indexObj == -1) {
            throw new Error('Objeto no encontrado, intente con otro numero de identificacion')
        } else {
            memoria.splice(indexObj, 1)
            return `Item de memoria con id ${id} ha sido eliminado`
        }
    }

    async updateById(id, obj) {
        const indexObj = memoria.findIndex((o)=> o.id == id);
        if (indexObj == -1) {
            throw new Error('Objeto no encontrado, intente con otro numero de identificacion')
        } else {
            memoria[indexObj] = obj;
            return `Item de memoria con id ${id} actualizado`
        }
    }

    async deleteAll() {
        memoria = []
        return "La memoria ha sido reiniciada"
    }
}