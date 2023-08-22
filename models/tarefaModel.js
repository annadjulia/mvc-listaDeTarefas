const db = require('./db');

class Tarefa { 
    constructor(id, title, description) { 
    this.id = id; 
    this.title = title; 
    this.description = description; 
    } 

    static listarTarefas() {
        let tarefas = db.query('SELECT * FROM tarefas ORDER BY id ASC');
        return tarefas;
    }

    async salvar() {
        let res = await db.query(`INSERT INTO tarefas (title) VALUES ('${this.title}')`);
        console.log(res)
    }

    static async deleteTarefa(id) {
        let res = await db.query(`DELETE FROM tarefas WHERE id = ${id}`);
        return true;
    }
} 
    
module.exports = Tarefa;