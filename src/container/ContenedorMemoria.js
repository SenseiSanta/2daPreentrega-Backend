export default class ContenedorMemoria {
    constructor() {
        this.memoria = [];
    }

    async getAll () {
        if (this.memoria == []) {
            return { error: 'No hay datos en memoria'}
        } else {
            return this.memoria;
        }
    }

    async save(obj) {
        let newId;
        console.log(this.memoria)
        if (this.memoria == []) {
            newId = 1
        } else {
            newId = this.memoria.length +1
        }
        let newObj = {...obj, id: newId}
        this.memoria.push(newObj)
        console.log(newObj)
        return {status: 'Aniadido con exito'};
    }

    async getById(id) {
        const indexObj = this.memoria.findIndex((o)=> o.id == id)
        if (indexObj == -1) {
            return {error: 'Objeto no encontrado, intente con otro numero de identificacion'}
        } else {
            return this.memoria[indexObj]
        }
    }

    async deleteById(id) {
        const indexObj = this.memoria.findIndex((o)=> o.id == id);
        if (indexObj == -1) {
            throw new Error('Objeto no encontrado, intente con otro numero de identificacion')
        } else {
            this.memoria.splice(indexObj, 1)
            return `Item de memoria con id ${id} ha sido eliminado`
        }
    }

    async updateById(id, obj) {
        const indexObj = this.memoria.findIndex((o)=> o.id == id);
        if (indexObj == -1) {
            return {error:'Objeto no encontrado, intente con otro numero de identificacion'}
        } else {
            this.memoria[indexObj] = {...obj, id: id};
            return `Item de memoria con id ${id} actualizado`
        }
    }

    async deleteAll() {
        this.memoria = []
        return "La memoria ha sido reiniciada"
    }
}