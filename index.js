const express = require('express'); 
const tarefaController = require('./controllers/tarefaController'); 
const app = express(); 
const port = 3000; 
const db = require('./models/db');
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layouts', './layouts');
app.set('view engine', 'ejs'); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));


// Rotas
app.get('/', (req, res) => {
    res.send("<h1>Tarefas</h1>");
});

app.get('/tarefas', tarefaController.getTarefas); 
app.post('/tarefa', tarefaController.addTarefa); 
app.delete('/tarefa', tarefaController.deleteTarefa);
app.put('/tarefa', tarefaController.updateTarefa);


app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});

