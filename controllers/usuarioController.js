const usuarioModel = require('../models/usuarioModel');

function login(req, res) {
    res.render('login');
};

async function autenticar(req, res) {
    console.log(req.body);
    if(req.body.email == "" || req.body.senha == "") {
        console.log("erro");
    } else {
        console.log("entrou");
        let resp = await usuarioModel.autenticar(req.body.email, req.body.senha);
        if(resp.length > 0){
            console.log(resp);
            req.session.usuario = {
                id: resp[0].id,
                nome: resp[0].nome,
                email: resp[0].email
            };
            res.redirect('/tarefas');
        }else{
            console.log("erro");
            res.redirect('/login');
        }
    }
};

module.exports = { login, autenticar };