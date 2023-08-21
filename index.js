const express = require('express'); 
const tarefaController = require('./controllers/tarefaController'); 
const app = express(); 
const port = 3000; 
const db = require('./models/db');
const expressLayouts = require('express-ejs-layouts');
const cloudinary = require('cloudinary').v2;
const usuarioController = require('./controllers/usuarioController');
const session = require('express-session');

cloudinary.config({ 
    cloud_name: 'dj1sdgtdr', 
    api_key: '174723524863143', 
    api_secret: '56QaNgRoQzpaHefInLcyQ-56TAc' 
});

app.use(session({secret: '1i2n3f4o'}));
app.use(expressLayouts);
app.set('layout', './layouts/default/index');
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use((req, res, next) => {
    if (!req.session.usuario) {
        if(req.originalURL == '/login' || req.originalURL == '/autenticar'){
            next();
        }else{
            res.redirect('/login');
        }
    }else{
        next();
    }
});


// Rotas
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (res, req) => {
    app.set('layout', './layouts/default/login');
    usuarioController.login(res, req);
});

app.post('/login', (req, res) => {
    console.log(req.body);
    usuarioController.autenticar(req, res);
});

app.get('/tarefas', tarefaController.getTarefas); 
app.post('/tarefa', tarefaController.addTarefa); 
app.delete('/tarefa', tarefaController.deleteTarefa);
app.put('/tarefa', tarefaController.updateTarefa);

app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});