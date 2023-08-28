const express = require('express'); 
const tarefaController = require('./controllers/tarefaController'); 
const dotenv = require('dotenv');
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    if (!req.session.usuario) {
        console.log('Não logado');
        if(req.originalUrl == '/login' || req.originalUrl == '/autenticar'){
            console.log('Não logado, mas na página de login');
            app.set('layout', './layouts/default/login');
            res.locals.layoutVariables = {
                url: process.env.URL,
                img: "/img/",
                style: "/css/",
                title: "Login",
                usuario: req.session.usuario
            };
            next();
        }else{
            console.log('Não logado, redirecionando para login');
            res.redirect('/login');
        }
    }else{
        console.log('Logado');
        app.set('layout', './layouts/default/index');
        res.locals.layoutVariables ={
            url: process.env.URL,
            img: "/img/",
            style: "/css/",
            title: "Tarefas",
            usuario: req.session.usuario
        };
        next();
    }
});


// Rotas
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    app.set('layout', './layouts/default/login');
    usuarioController.login(req, res);
});

app.post('/login', (req, res) => {
    console.log(req.body);
    usuarioController.autenticar(req, res);
});

app.get('/logout', (req, res) => {
    usuarioController.logout(req, res);
});

app.get('/tarefa/delete/:id', (req, res) => {
    tarefaController.deleteTarefa(req, res);
});
    
app.get('/tarefas', tarefaController.getTarefas); 
app.post('/tarefa', tarefaController.addTarefa); 
app.delete('/tarefa', tarefaController.deleteTarefa);
app.put('/tarefa', tarefaController.updateTarefa);

app.listen(port, () => { 
    console.log(`Servidor rodando em http://localhost:${port}`);
});